import * as React from 'react'
import {observer} from 'mobx-react'
import GaeaPreview from '../index'
import GaeaWebComponents from '../../gaea-web-components/index'

const value = JSON.parse(`{"gaea-component-1474506608231-1":{"props":{"gaeaUniqueKey":"gaea-layout","display":"block","flexGrow":1,"flexDirection":"column","overflow":null,"overflowX":"hidden","overflowY":"auto"},"layoutChilds":["gaea-component-1474506620055-4","gaea-component-1474506620627-5","gaea-component-1474506621157-6"],"parentMapUniqueKey":null},"gaea-component-1474506620055-4":{"props":{"gaeaUniqueKey":"web-common-button"},"parentMapUniqueKey":"gaea-component-1474506608231-1"},"gaea-component-1474506620627-5":{"props":{"gaeaUniqueKey":"web-common-button"},"parentMapUniqueKey":"gaea-component-1474506608231-1"},"gaea-component-1474506621157-6":{"props":{"gaeaUniqueKey":"web-common-button"},"parentMapUniqueKey":"gaea-component-1474506608231-1"}}`)

@observer
export default class Demo extends React.Component <any, any> {
    static title = '基本用法'
    static description = ``

    render() {
        return (
            <GaeaPreview baseComponents={GaeaWebComponents}
                         value={value}/>
        )
    }
}
                