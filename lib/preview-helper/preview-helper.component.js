"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var React = require("react");
var typings = require("./preview-helper.type");
var _ = require("lodash");
var parser = function parser(type) {
    switch (type) {
        case 'number':
            return Number;
        case 'string':
            return function (value) {
                return value && value.toString();
            };
        case 'boolean':
            return Boolean;
    }
};

var PreviewHelper = function (_React$Component) {
    (0, _inherits3.default)(PreviewHelper, _React$Component);

    function PreviewHelper() {
        (0, _classCallCheck3.default)(this, PreviewHelper);

        var _this = (0, _possibleConstructorReturn3.default)(this, (PreviewHelper.__proto__ || Object.getPrototypeOf(PreviewHelper)).apply(this, arguments));

        _this.state = new typings.State();
        _this.handleRunEventBind = _this.handleRunEvent.bind(_this);
        return _this;
    }

    (0, _createClass3.default)(PreviewHelper, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            var _this2 = this;

            this.componentInfo = this.props.preview.components.get(this.props.mapUniqueKey);
            this.SelfComponent = this.props.preview.getComponentByUniqueKey(this.componentInfo.props.gaeaUniqueKey);
            this.eventData = this.props.preview.isReactNative ? this.componentInfo.props.gaeaNativeEventData : this.componentInfo.props.gaeaEventData;
            this.eventData && this.eventData.forEach(function (data) {
                if (data.typeIndex === -1 && data.type === 'init') {
                    _this2.runEvent(data);
                }
            });
            this.eventData && this.eventData.forEach(function (data) {
                if (data.typeIndex === -1 && data.type === 'listen') {
                    var listenData = data.typeData;
                    _this2.props.preview.customEvent.on(listenData.listen, _this2.handleRunEventBind, data);
                }
            });
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            var _this3 = this;

            this.eventData && this.eventData.forEach(function (data) {
                if (data.typeIndex === -1 && data.type === 'listen') {
                    var listenData = data.typeData;
                    _this3.props.preview.customEvent.off(listenData.listen, _this3.handleRunEventBind);
                }
            });
        }
    }, {
        key: "handleRunEvent",
        value: function handleRunEvent(context) {
            this.runEvent(context);
        }
    }, {
        key: "runEvent",
        value: function runEvent(eventData) {
            var event = this.componentInfo.props.gaeaEvent && this.componentInfo.props.gaeaEvent.events[eventData.eventIndex];
            switch (eventData.event) {
                case 'call':
                    this.props.preview.event.emit(this.props.preview.event.onCall, {
                        functionName: event.call.functionName,
                        param: eventData.eventData
                    });
                    break;
                case 'jumpUrl':
                    var jumpUrlData = eventData.eventData;
                    location.href = jumpUrlData.url;
                    break;
                case 'emit':
                    var emitData = eventData.eventData;
                    this.props.preview.customEvent.emit(emitData.emit);
                    break;
                case 'updateProps':
                    var updatePropsData = eventData.eventData;
                    this.componentInfo.props = _.merge(_.cloneDeep(this.SelfComponent.defaultProps), _.cloneDeep(updatePropsData.props));
                    this.forceUpdate();
                    break;
            }
        }
    }, {
        key: "getSelfFunctionMap",
        value: function getSelfFunctionMap() {
            var _this4 = this;

            var functionMap = new Map();
            this.eventData && this.eventData.forEach(function (data) {
                if (data.typeIndex > -1 && _this4.componentInfo.props.gaeaEvent.types[data.typeIndex].selfCallback) {
                    if (functionMap.has(data.type)) {
                        var functionList = functionMap.get(data.type);
                        functionList.push(data);
                        functionMap.set(data.type, functionList);
                    } else {
                        functionMap.set(data.type, [data]);
                    }
                }
            });
            return functionMap;
        }
    }, {
        key: "render",
        value: function render() {
            var _this5 = this;

            var childs = null;
            if (this.componentInfo.props.canDragIn && this.componentInfo.layoutChilds) {
                childs = this.componentInfo.layoutChilds.map(function (layoutChildUniqueMapKey) {
                    return React.createElement(PreviewHelper, { key: layoutChildUniqueMapKey, preview: _this5.props.preview, mapUniqueKey: layoutChildUniqueMapKey });
                });
            }
            var props = JSON.parse(JSON.stringify(this.componentInfo.props));
            var functionMap = this.getSelfFunctionMap();
            functionMap.forEach(function (value, key) {
                props[key] = function () {
                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }

                    value.forEach(function (eachValue) {
                        _this5.runEvent.apply(_this5, [eachValue].concat(args));
                    });
                };
            });
            props.gaeaPreview = true;
            props.gaeaVariables && Object.keys(props.gaeaVariables).forEach(function (variableField) {
                var variable = props.gaeaVariables[variableField];
                if (!variable) {
                    return;
                }
                var myParser = parser(variable.valueType);
                switch (variable.variableType) {
                    case 'externalParameter':
                        props[variableField] = _this5.props.preview.params[variable.variableField] ? myParser(_this5.props.preview.params[variable.variableField]) : null;
                        break;
                }
            });
            props.ref = function (ref) {
                _this5.wrappedInstance = ref;
            };
            return React.createElement(this.SelfComponent, props, childs);
        }
    }]);
    return PreviewHelper;
}(React.Component);

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PreviewHelper;
PreviewHelper.defaultProps = new typings.Props();