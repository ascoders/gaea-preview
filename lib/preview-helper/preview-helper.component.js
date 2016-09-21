"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var typings = require('./preview-helper.type');
var _ = require('lodash');

var PreviewHelper = function (_React$Component) {
    _inherits(PreviewHelper, _React$Component);

    function PreviewHelper() {
        var _ref;

        _classCallCheck(this, PreviewHelper);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = PreviewHelper.__proto__ || Object.getPrototypeOf(PreviewHelper)).call.apply(_ref, [this].concat(args)));

        _this.state = new typings.State();
        return _this;
    }

    _createClass(PreviewHelper, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.componentInfo = this.props.preview.components.get(this.props.mapUniqueKey);
            this.SelfComponent = this.props.preview.getComponentByUniqueKey(this.componentInfo.props.gaeaUniqueKey);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var childs = null;
            if (this.componentInfo.props.gaeaUniqueKey === 'gaea-layout' && this.componentInfo.layoutChilds) {
                childs = this.componentInfo.layoutChilds.map(function (layoutChildUniqueMapKey) {
                    return React.createElement(PreviewHelper, { key: layoutChildUniqueMapKey, preview: _this2.props.preview, mapUniqueKey: layoutChildUniqueMapKey });
                });
            }
            var componentProps = _.cloneDeep(this.componentInfo.props);
            return React.createElement(this.SelfComponent, componentProps, childs);
        }
    }]);

    return PreviewHelper;
}(React.Component);

PreviewHelper.defaultProps = new typings.Props();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PreviewHelper;