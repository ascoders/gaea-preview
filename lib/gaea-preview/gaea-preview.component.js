"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof3.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var React = require("react");
var typings = require("./gaea-preview.type");
var _ = require("lodash");
var preview_1 = require("../store/preview");
var LZString = require("lz-string");
var preview_helper_component_1 = require("../preview-helper/preview-helper.component");
var index_1 = require('nt-auto-bind');

var GaeaPreview = function (_React$Component) {
    (0, _inherits3.default)(GaeaPreview, _React$Component);

    function GaeaPreview() {
        (0, _classCallCheck3.default)(this, GaeaPreview);

        var _this = (0, _possibleConstructorReturn3.default)(this, (GaeaPreview.__proto__ || Object.getPrototypeOf(GaeaPreview)).apply(this, arguments));

        _this.state = new typings.State();
        _this.preview = new preview_1.default();
        return _this;
    }

    (0, _createClass3.default)(GaeaPreview, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            var _this2 = this;

            this.preview.setBaseComponents(this.props.baseComponents);
            this.preview.setCustomComponents(this.props.customComponents);
            this.preview.setIsReactNative(this.props.isReactNative);
            this.preview.setParams(this.props.params || {});
            var unCompressValue = {};
            if (this.props.value) {
                unCompressValue = JSON.parse(LZString.decompressFromBase64(this.props.value));
            }
            unCompressValue && Object.keys(unCompressValue).forEach(function (mapUniqueKey) {
                var componentInfo = unCompressValue[mapUniqueKey];
                var ComponentClass = _this2.preview.getComponentByUniqueKey(componentInfo.props.gaeaUniqueKey);
                if (componentInfo.parentMapUniqueKey === null) {
                    _this2.preview.setRootUniqueId(mapUniqueKey);
                }
                var defaultProps = _.cloneDeep(ComponentClass.defaultProps);
                var props = _.merge({}, defaultProps, componentInfo.props || {});
                _this2.preview.components.set(mapUniqueKey, {
                    props: props,
                    layoutChilds: componentInfo.layoutChilds || [],
                    parentMapUniqueKey: componentInfo.parentMapUniqueKey
                });
            });
            this.preview.event.on(this.preview.event.onCall, this.handleOnCall);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.preview.event.off(this.preview.event.onCall, this.handleOnCall);
        }
    }, {
        key: "handleOnCall",
        value: function handleOnCall(context, eventData) {
            this.props.onCall(eventData.functionName, eventData.param);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(preview_helper_component_1.default, { preview: this.preview, mapUniqueKey: this.preview.rootMapUniqueKey });
        }
    }]);
    return GaeaPreview;
}(React.Component);

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GaeaPreview;
GaeaPreview.defaultProps = new typings.Props();
__decorate([index_1.autoBindMethod], GaeaPreview.prototype, "handleOnCall", null);