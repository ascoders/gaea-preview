import * as React from 'react'
import {observer} from 'mobx-react'
import GaeaPreview from '../index'
import GaeaWebComponents from '../../gaea-web-components/index'

const value = `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`

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
                