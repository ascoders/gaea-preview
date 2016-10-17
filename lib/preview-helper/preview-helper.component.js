"use strict";
const React = require("react");
const typings = require("./preview-helper.type");
class PreviewHelper extends React.Component {
    constructor() {
        super(...arguments);
        this.state = new typings.State();
    }
    componentWillMount() {
        this.componentInfo = this.props.preview.components.get(this.props.mapUniqueKey);
        this.SelfComponent = this.props.preview.getComponentByUniqueKey(this.componentInfo.props.gaeaUniqueKey);
    }
    render() {
        let childs = null;
        if (this.componentInfo.props.gaeaUniqueKey === 'gaea-layout' && this.componentInfo.layoutChilds) {
            childs = this.componentInfo.layoutChilds.map(layoutChildUniqueMapKey => {
                return (React.createElement(PreviewHelper, { key: layoutChildUniqueMapKey, preview: this.props.preview, mapUniqueKey: layoutChildUniqueMapKey }));
            });
        }
        return React.createElement(this.SelfComponent, JSON.parse(JSON.stringify(this.componentInfo.props)), childs);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PreviewHelper;
PreviewHelper.defaultProps = new typings.Props();
