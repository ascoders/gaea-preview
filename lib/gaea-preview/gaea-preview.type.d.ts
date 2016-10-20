import * as React from 'react';
export interface PropsDefine {
    customComponents?: Array<React.ComponentClass<FitGaea.ComponentProps>>;
    baseComponents?: Array<React.ComponentClass<FitGaea.ComponentProps>>;
    onCall?: (functionName?: string, param?: any) => void;
    value?: string;
}
export declare class Props implements PropsDefine {
    onCall: () => void;
}
export interface StateDefine {
}
export declare class State implements StateDefine {
}
