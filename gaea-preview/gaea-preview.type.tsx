import * as React from 'react'

export interface PropsDefine {
    /**
     * 自定义组件
     */
    customComponents?: Array<React.ComponentClass<FitGaea.ComponentProps>>

    /**
     * 基础组件
     * web 引用 fit-gaea/lib/web-components
     * react-native 同时兼容 web 引用 fit-gaea/lib/native-components
     */
    baseComponents?: Array<React.ComponentClass<FitGaea.ComponentProps>>

    /**
     * 调用指定方法，这个函数在组件->事件中定义调用自定义函数时使用
     */
    onCall?: (functionName?: string, param?: any) => void

    /**
     * 是否是 native 环境
     */
    isReactNative?: boolean

    /**
     * 页面信息
     */
    value?: string

    /**
     * 页面配置信息
     */
    settings?: string

    /**
     * 页面传参
     */
    params?: {
        [x: string]: number|string|boolean
    }
}

export class Props implements PropsDefine {
    onCall = () => {
    }
}

export interface StateDefine {

}

export class State implements StateDefine {

}