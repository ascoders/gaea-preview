import * as React from 'react'
import {TransparentlyPropsPropsDefine} from '../../../common/transparently-props/index'

export interface PropsDefine extends TransparentlyPropsPropsDefine {
    /**
     * 自定义组件
     */
    customComponents?: any

    /**
     * 基础组件
     * web 引用 fit-gaea/lib/web-components
     * react-native 同时兼容 web 引用 fit-gaea/lib/native-components
     */
    baseComponents?: any

    /**
     * 页面信息
     */
    value?: {
        [mapUniqueKey: string]: any
    }
}

export class PropsGaea {
    gaeaName = '盖亚-查看器'
    gaeaIcon = 'square-o'
    gaeaUniqueKey = 'nt-editor-gaea-preview'
}

export class Props extends PropsGaea implements PropsDefine {

}

export interface StateDefine {

}

export class State implements StateDefine {

}
                