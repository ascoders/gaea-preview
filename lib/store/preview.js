"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Preview = function () {
    function Preview() {
        _classCallCheck(this, Preview);

        this.baseComponents = [];
        this.customComponents = [];
        this.components = new Map();
    }

    _createClass(Preview, [{
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
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.baseComponents[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _component = _step.value;

                    if (_component.defaultProps.gaeaUniqueKey === uniqueKey) {
                        return _component;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            if (this.customComponents) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = this.customComponents[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var component = _step2.value;

                        if (component.defaultProps.gaeaUniqueKey === uniqueKey) {
                            return component;
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }
            return null;
        }
    }, {
        key: "setRootUniqueId",
        value: function setRootUniqueId(uniqueId) {
            this.rootMapUniqueKey = uniqueId;
        }
    }]);

    return Preview;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Preview;
//# sourceMappingURL=preview.js.map