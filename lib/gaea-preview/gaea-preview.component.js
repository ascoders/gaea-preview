"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var typings = require('./gaea-preview.type');
var _ = require('lodash');
var preview_1 = require('../store/preview');
var preview_helper_component_1 = require('../preview-helper/preview-helper.component');

var GaeaPreview = function (_React$Component) {
    _inherits(GaeaPreview, _React$Component);

    function GaeaPreview() {
        var _ref;

        _classCallCheck(this, GaeaPreview);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = GaeaPreview.__proto__ || Object.getPrototypeOf(GaeaPreview)).call.apply(_ref, [this].concat(args)));

        _this.state = new typings.State();
        _this.preview = new preview_1.default();
        return _this;
    }

    _createClass(GaeaPreview, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            this.preview.setBaseComponents(this.props.baseComponents);
            this.preview.setCustomComponents(this.props.customComponents);
            this.props.value && Object.keys(this.props.value).forEach(function (mapUniqueKey) {
                var componentInfo = _this2.props.value[mapUniqueKey];
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
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(preview_helper_component_1.default, { preview: this.preview, mapUniqueKey: this.preview.rootMapUniqueKey });
        }
    }]);

    return GaeaPreview;
}(React.Component);

GaeaPreview.defaultProps = new typings.Props();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GaeaPreview;