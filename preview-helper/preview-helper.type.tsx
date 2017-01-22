import * as React from 'react'
import Preview from '../store/preview'

export interface PropsDefine {
    preview?: Preview

    /**
     * 可能是任何组件希望传递的数据
     */
    gaeaData?: any

    /**
     * 当前元素的查找的 id
     */
    mapUniqueKey?: string
}

export class Props implements PropsDefine {

}

export interface StateDefine {

}

export class State implements StateDefine {

}