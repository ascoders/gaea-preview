import * as React from 'react'
import * as typings from './preview-helper.type'
import * as _ from 'lodash'

// 根据类型生成处理函数
const parser = (type: string): (value?: string) => number | string | boolean => {
    switch (type) {
        case 'number':
            return Number
        case 'string':
            return (value: string) => {
                return value && value.toString()
            }
        case 'boolean':
            return Boolean
    }
}

export default class PreviewHelper extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    // 对应 store 中的数据
    private componentInfo: FitGaea.ViewportComponentInfo

    // 自身真实组件的 class
    private SelfComponent: React.ComponentClass<FitGaea.ComponentProps>

    private handleRunEventBind = this.handleRunEvent.bind(this)

    // 事件数据
    private eventData: Array<FitGaea.EventData>

    // 内部组件实例
    public wrappedInstance: React.ReactInstance

    componentWillMount() {
        // 从 store 找到自己信息
        this.componentInfo = this.props.preview.components.get(this.props.mapUniqueKey)

        // 获取当前要渲染的组件 class
        this.SelfComponent = this.props.preview.getComponentByUniqueKey(this.componentInfo.props.gaeaUniqueKey)

        // 执行初始化事件
        this.eventData = this.props.preview.isReactNative ? this.componentInfo.props.gaeaNativeEventData : this.componentInfo.props.gaeaEventData
        this.eventData && this.eventData.forEach(data => {
            if (data.typeIndex === -1 && data.type === 'init') {
                this.runEvent(data)
            }
        })

        // 监听事件
        this.eventData && this.eventData.forEach(data => {
            if (data.typeIndex === -1 && data.type === 'listen') {
                const listenData = data.typeData as FitGaea.EventTriggerEvent
                this.props.preview.customEvent.on(listenData.listen, this.handleRunEventBind, data)
            }
        })
    }

    componentWillUnmount() {
        // 取消事件监听
        this.eventData && this.eventData.forEach(data => {
            if (data.typeIndex === -1 && data.type === 'listen') {
                const listenData = data.typeData as FitGaea.EventTriggerEvent
                this.props.preview.customEvent.off(listenData.listen, this.handleRunEventBind)
            }
        })
    }

    /**
     * 监听事件执行了
     */
    handleRunEvent(context: any) {
        this.runEvent(context)
    }

    /**
     * 执行事件
     */
    runEvent(eventData: FitGaea.EventData) {
        const event = this.componentInfo.props.gaeaEvent && this.componentInfo.props.gaeaEvent.events[eventData.eventIndex]
        switch (eventData.event) {
            case 'call':
                this.props.preview.event.emit(this.props.preview.event.onCall, {
                    functionName: event.call.functionName,
                    param: eventData.eventData
                })
                break
            case 'jumpUrl':
                const jumpUrlData = eventData.eventData as FitGaea.EventActionJumpUrl
                location.href = jumpUrlData.url
                break
            case 'emit':
                const emitData = eventData.eventData as FitGaea.EventActionEvent
                this.props.preview.customEvent.emit(emitData.emit)
                break
            case 'updateProps':
                const updatePropsData = eventData.eventData as FitGaea.EventUpdatePropsEvent
                // 只修改属性
                this.componentInfo.props = _.merge(_.cloneDeep(this.SelfComponent.defaultProps), _.cloneDeep(updatePropsData.props))
                this.forceUpdate()
                break
        }
    }

    /**
     * 返回调用自己的方法的 key -> Array<value>
     */
    getSelfFunctionMap() {
        // <string,Array<FitGaea.EventData>
        const functionMap = new Map()
        this.eventData && this.eventData.forEach(data => {
            if (data.typeIndex > -1 && this.componentInfo.props.gaeaEvent.types[data.typeIndex].selfCallback) {
                if (functionMap.has(data.type)) {
                    const functionList = functionMap.get(data.type)
                    functionList.push(data)
                    functionMap.set(data.type, functionList)
                } else {
                    functionMap.set(data.type, [data])
                }
            }
        })
        return functionMap
    }

    render() {
        // 子元素
        let childs: Array<React.ReactElement<any>> = null

        // 是否可以有子元素
        if (this.componentInfo.props.canDragIn && this.componentInfo.layoutChilds) {
            childs = this.componentInfo.layoutChilds.map(layoutChildUniqueMapKey => {
                return (
                    <PreviewHelper key={layoutChildUniqueMapKey}
                        preview={this.props.preview}
                        mapUniqueKey={layoutChildUniqueMapKey} />
                )
            })
        }

        let props: FitGaea.ComponentProps = JSON.parse(JSON.stringify(this.componentInfo.props))

        // 将回调事件添加到 props 中
        const functionMap = this.getSelfFunctionMap()
        functionMap.forEach((value: Array<FitGaea.EventData>, key: string) => {
            props[key] = (...args: any[]) => {
                value.forEach(eachValue => {
                    this.runEvent.apply(this, [eachValue, ...args])
                })
            }
        })

        props.gaeaPreview = true

        // 将变量字段替换成变量
        props.gaeaVariables && Object.keys(props.gaeaVariables).forEach(variableField => {
            const variable = props.gaeaVariables[variableField]
            if (!variable) {
                // 可能还没赋值，是 null
                return
            }
            const myParser = parser(variable.valueType)
            switch (variable.variableType) {
                case 'externalParameter':
                    props[variableField] = this.props.preview.params[variable.variableField] ? myParser(this.props.preview.params[variable.variableField]) : null
                    break
            }
        })

        props.ref = (ref: React.ReactInstance) => {
            this.wrappedInstance = ref
        }

        return React.createElement(this.SelfComponent, props, childs)
    }
}