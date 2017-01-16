import * as React from 'react';
import * as typings from './preview-helper.type';
export default class PreviewHelper extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    private componentInfo;
    private SelfComponent;
    private handleRunEventBind;
    private eventData;
    wrappedInstance: React.ReactInstance;
    componentWillMount(): void;
    componentWillUnmount(): void;
    handleRunEvent(context: any): void;
    runEvent(eventData: FitGaea.EventData): void;
    getSelfFunctionMap(): Map<any, any>;
    render(): React.ComponentElement<FitGaea.ComponentProps & {
        children?: React.ReactNode;
    }, any>;
}
