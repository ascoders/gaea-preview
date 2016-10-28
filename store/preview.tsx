/**
 * 预览时的页面数据
 */

import * as React from 'react'
import Event from './event'
import EventSystem from '../event-system/event-system'

export default class Preview {
    public event = new Event()
    public customEvent = new EventSystem()

    /**
     * 基础组件
     */
    baseComponents: Array<React.ComponentClass<FitGaea.ComponentProps>> = []

    /**
     * 设置基础组件
     */
    setBaseComponents(baseComponents: Array<React.ComponentClass<FitGaea.ComponentProps>>) {
        this.baseComponents = baseComponents
    }

    /**
     * 定制组件
     */
    customComponents: Array<React.ComponentClass<FitGaea.ComponentProps>> = []

    /**
     * 设置定制组件
     */
    setCustomComponents(customComponents: Array<React.ComponentClass<FitGaea.ComponentProps>>) {
        this.customComponents = customComponents
    }

    /**
     * 根据 uniqueKey 获取组件
     */
    getComponentByUniqueKey(uniqueKey: string) {
        for (let component of this.baseComponents) {
            if (component.defaultProps.gaeaUniqueKey === uniqueKey) {
                return component
            }
        }

        if (this.customComponents) {
            for (let component of this.customComponents) {
                if (component.defaultProps.gaeaUniqueKey === uniqueKey) {
                    return component
                }
            }
        }

        return null
    }

    /**
     * 已实例化在编辑区域组件的集合
     */
    components: Map<string, FitGaea.ViewportComponentInfo> = new Map<string, FitGaea.ViewportComponentInfo>()

    /**
     * 根节点的唯一 id
     */
    rootMapUniqueKey: string

    /**
     * 设置根节点唯一 id
     */
    setRootUniqueId(uniqueId: string) {
        this.rootMapUniqueKey = uniqueId
    }

    // 是否是 native 环境
    isReactNative = false

    /**
     * 设置 native 环境
     */
    setIsReactNative(isNative: boolean) {
        this.isReactNative = isNative
    }

    // 全局参数
    params?: any = {}

    setParams(params: any) {
        this.params = params
    }
}