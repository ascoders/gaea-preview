"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var typings = require('./gaea-preview.type');
var classNames = require('classnames');

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
        return _this;
    }

    _createClass(GaeaPreview, [{
        key: 'render',
        value: function render() {
            var classes = classNames(_defineProperty({
                'nt-editor-gaea-preview-gaea_preview': true
            }, this.props.className, !!this.props.className));
            return React.createElement("div", { className: classes }, "盖亚-查看器");
        }
    }]);

    return GaeaPreview;
}(React.Component);

GaeaPreview.defaultProps = new typings.Props();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GaeaPreview;