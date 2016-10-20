import * as React from 'react'
import * as typings from './gaea-preview.type'
import * as _ from 'lodash'
import PreviewStore from '../store/preview'
import * as LZString from 'lz-string'

import PreviewHelper from '../preview-helper/preview-helper.component'

import {autoBindMethod} from '../../../common/auto-bind/index'

export default class GaeaPreview extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    private preview = new PreviewStore()

    componentWillMount() {
        // 设置基础组件
        this.preview.setBaseComponents(this.props.baseComponents)

        // 设置自定义组件
        this.preview.setCustomComponents(this.props.customComponents)

        // 设置环境
        this.preview.setIsReactNative(this.props.isReactNative)

        // 解析 base64 的 value
        let unCompressValue: {
            [mapUniqueKey: string]: FitGaea.ViewportComponentInfo
        } = {}

        if (this.props.value) {
            unCompressValue = JSON.parse(LZString.decompressFromBase64(this.props.value)) as{
                [mapUniqueKey: string]: FitGaea.ViewportComponentInfo
            }
        }

        unCompressValue && Object.keys(unCompressValue).forEach(mapUniqueKey=> {
            const componentInfo = unCompressValue[mapUniqueKey]
            const ComponentClass = this.preview.getComponentByUniqueKey(componentInfo.props.gaeaUniqueKey)

            // 设置根 mapUniqueKey
            if (componentInfo.parentMapUniqueKey === null) {
                this.preview.setRootUniqueId(mapUniqueKey)
            }

            // 将默认 props 与传进来的 props 做 assign
            let defaultProps = _.cloneDeep(ComponentClass.defaultProps)
            const props = _.merge({}, defaultProps, componentInfo.props || {})

            this.preview.components.set(mapUniqueKey, {
                props: props,
                layoutChilds: componentInfo.layoutChilds || [],
                parentMapUniqueKey: componentInfo.parentMapUniqueKey
            })
        })

        this.preview.event.on(this.preview.event.onCall, this.handleOnCall)
    }

    componentWillUnmount() {
        this.preview.event.off(this.preview.event.onCall, this.handleOnCall)
    }

    /**
     * 触发调用事件
     */
    @autoBindMethod handleOnCall(context: any, eventData: any) {
        this.props.onCall(eventData.functionName, eventData.param)
    }

    render() {
        return (
            <PreviewHelper preview={this.preview}
                           mapUniqueKey={this.preview.rootMapUniqueKey}/>
        )
    }
}