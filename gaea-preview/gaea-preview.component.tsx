import * as React from 'react'
import * as typings from './gaea-preview.type'
import * as _ from 'lodash'
import PreviewStore from '../store/preview'

import PreviewHelper from '../preview-helper/preview-helper.component'

export default class GaeaPreview extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    private preview = new PreviewStore()

    componentWillMount() {
        // 设置基础组件
        this.preview.setBaseComponents(this.props.baseComponents)

        // 设置自定义组件
        this.preview.setCustomComponents(this.props.customComponents)

        this.props.value && Object.keys(this.props.value).forEach(mapUniqueKey=> {
            const componentInfo = this.props.value[mapUniqueKey]
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
    }

    render() {
        return (
            <PreviewHelper preview={this.preview}
                           mapUniqueKey={this.preview.rootMapUniqueKey}/>
        )
    }
}