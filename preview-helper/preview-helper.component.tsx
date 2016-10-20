import * as React from 'react'
import * as typings from './preview-helper.type'
import * as _ from 'lodash'

export default class PreviewHelper extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    // 对应 store 中的数据
    private componentInfo: FitGaea.ViewportComponentInfo

    // 自身真实组件的 class
    private SelfComponent: React.ComponentClass<FitGaea.ComponentProps>

    private handleRunEventBind = this.handleRunEvent.bind(this)

    componentWillMount() {
        // 从 store 找到自己信息
        this.componentInfo = this.props.preview.components.get(this.props.mapUniqueKey)

        // 获取当前要渲染的组件 class
        this.SelfComponent = this.props.preview.getComponentByUniqueKey(this.componentInfo.props.gaeaUniqueKey)

        // 执行初始化事件
        this.componentInfo.props.gaeaEventData && this.componentInfo.props.gaeaEventData.forEach(data=> {
            if (data.typeIndex === -1 && data.type === 'init') {
                this.runEvent(data)
            }
        })

        // 监听事件
        this.componentInfo.props.gaeaEventData && this.componentInfo.props.gaeaEventData.forEach(data=> {
            if (data.typeIndex === -1 && data.type === 'listen') {
                const listenData = data.typeData as FitGaea.EventTriggerEvent
                this.props.preview.customEvent.on(listenData.listen, this.handleRunEventBind, data)
            }
        })
    }

    componentWillUnmount() {
        // 取消事件监听
        this.componentInfo.props.gaeaEventData && this.componentInfo.props.gaeaEventData.forEach(data=> {
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
        const event = this.componentInfo.props.gaeaEvent.events[eventData.eventIndex]
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
        }
    }

    render() {
        // 子元素
        let childs: Array<React.ReactElement<any>> = null

        // gaea-layout 可以有子元素
        if (this.componentInfo.props.gaeaUniqueKey === 'gaea-layout' && this.componentInfo.layoutChilds) {
            childs = this.componentInfo.layoutChilds.map(layoutChildUniqueMapKey=> {
                return (
                    <PreviewHelper key={layoutChildUniqueMapKey}
                                   preview={this.props.preview}
                                   mapUniqueKey={layoutChildUniqueMapKey}/>
                )
            })
        }

        let props: any = JSON.parse(JSON.stringify(this.componentInfo.props))

        // 循环一些事件添加到 props 中
        this.componentInfo.props.gaeaEventData && this.componentInfo.props.gaeaEventData.forEach(data=> {
            if (data.typeIndex > -1 && this.componentInfo.props.gaeaEvent.types[data.typeIndex].selfCallback) {
                // 这个方法是调用自己的
                props[data.type] = this.runEvent.bind(this, data)
            }
        })

        return React.createElement(this.SelfComponent, props, childs)
    }
}