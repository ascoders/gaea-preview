import * as React from 'react';
import * as typings from './gaea-preview.type';
export default class GaeaPreview extends React.Component<typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine;
    state: typings.StateDefine;
    render(): JSX.Element;
}
