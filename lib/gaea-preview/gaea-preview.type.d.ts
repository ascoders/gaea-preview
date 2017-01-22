import * as React from 'react';
export interface PropsDefine {
    customComponents?: Array<React.ComponentClass<FitGaea.ComponentProps>>;
    baseComponents?: Array<React.ComponentClass<FitGaea.ComponentProps>>;
    onCall?: (functionName?: string, param?: any) => void;
    isReactNative?: boolean;
    value?: string;
    settings?: string;
    params?: {
        [x: string]: number | string | boolean;
    };
}
export declare class Props implements PropsDefine {
    onCall: () => void;
}
export interface StateDefine {
}
export declare class State implements StateDefine {
}
