import * as React from 'react';
export interface PropsDefine {
    customComponents?: Array<React.ComponentClass<FitGaea.ComponentProps>>;
    baseComponents?: Array<React.ComponentClass<FitGaea.ComponentProps>>;
    value?: {
        [mapUniqueKey: string]: FitGaea.ViewportComponentInfo;
    };
}
export declare class Props implements PropsDefine {
}
export interface StateDefine {
}
export declare class State implements StateDefine {
}
