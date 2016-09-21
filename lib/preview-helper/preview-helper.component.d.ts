import * as React from 'react';
import * as typings from './preview-helper.type';
export default class PreviewHelper extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    private componentInfo;
    private SelfComponent;
    componentWillMount(): void;
    render(): React.ComponentElement<FitGaea.ComponentProps & {
        children?: React.ReactElement<any> | string | number | {} | (React.ReactElement<any> | string | number | any[] | boolean)[] | boolean;
    }, any>;
}
