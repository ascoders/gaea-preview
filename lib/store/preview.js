"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var event_1 = require("./event");
var event_system_1 = require("../event-system/event-system");

var Preview = function () {
    function Preview() {
        (0, _classCallCheck3.default)(this, Preview);

        this.event = new event_1.default();
        this.customEvent = new event_system_1.default();
        this.baseComponents = [];
        this.customComponents = [];
        this.components = new Map();
        this.isReactNative = false;
        this.params = {};
    }

    (0, _createClass3.default)(Preview, [{
        key: "setBaseComponents",
        value: function setBaseComponents(baseComponents) {
            this.baseComponents = baseComponents;
        }
    }, {
        key: "setCustomComponents",
        value: function setCustomComponents(customComponents) {
            this.customComponents = customComponents;
        }
    }, {
        key: "getComponentByUniqueKey",
        value: function getComponentByUniqueKey(uniqueKey) {
            var component = null;
            this.baseComponents.forEach(function (baseComponent) {
                if (baseComponent.defaultProps.gaeaUniqueKey === uniqueKey) {
                    component = baseComponent;
                }
            });
            if (this.customComponents) {
                this.customComponents.forEach(function (customComponent) {
                    if (customComponent.defaultProps.gaeaUniqueKey === uniqueKey) {
                        component = customComponent;
                    }
                });
            }
            return component;
        }
    }, {
        key: "setRootUniqueId",
        value: function setRootUniqueId(uniqueId) {
            this.rootMapUniqueKey = uniqueId;
        }
    }, {
        key: "setIsReactNative",
        value: function setIsReactNative(isNative) {
            this.isReactNative = isNative;
        }
    }, {
        key: "setParams",
        value: function setParams(params) {
            this.params = params;
        }
    }]);
    return Preview;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Preview;