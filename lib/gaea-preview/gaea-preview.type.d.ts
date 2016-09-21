import { TransparentlyPropsPropsDefine } from  'nt-transparently-props';
export interface PropsDefine extends TransparentlyPropsPropsDefine {
    customComponents?: any;
    baseComponents?: any;
    value?: {
        [mapUniqueKey: string]: any;
    };
}
export declare class PropsGaea {
    gaeaName: string;
    gaeaIcon: string;
    gaeaUniqueKey: string;
}
export declare class Props extends PropsGaea implements PropsDefine {
}
export interface StateDefine {
}
export declare class State implements StateDefine {
}
