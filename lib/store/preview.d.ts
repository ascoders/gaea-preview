import * as React from 'react';
import Event from './event';
import EventSystem from '../event-system/event-system';
export default class Preview {
    event: Event;
    customEvent: EventSystem;
    baseComponents: Array<React.ComponentClass<FitGaea.ComponentProps>>;
    setBaseComponents(baseComponents: Array<React.ComponentClass<FitGaea.ComponentProps>>): void;
    customComponents: Array<React.ComponentClass<FitGaea.ComponentProps>>;
    setCustomComponents(customComponents: Array<React.ComponentClass<FitGaea.ComponentProps>>): void;
    getComponentByUniqueKey(uniqueKey: string): React.ComponentClass<FitGaea.ComponentProps>;
    components: Map<string, FitGaea.ViewportComponentInfo>;
    rootMapUniqueKey: string;
    setRootUniqueId(uniqueId: string): void;
    isReactNative: boolean;
    setIsReactNative(isNative: boolean): void;
    params?: any;
    setParams(params: any): void;
    settings?: any;
    setSettings(settings: any): void;
}
