import * as React from 'react';
import * as typings from './gaea-preview.type';
export default class GaeaPreview extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    private preview;
    componentWillMount(): void;
    componentWillUnmount(): void;
    handleOnCall(context: any, eventData: any): void;
    render(): JSX.Element;
}
