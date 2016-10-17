"use strict";
class Preview {
    constructor() {
        this.baseComponents = [];
        this.customComponents = [];
        this.components = new Map();
    }
    setBaseComponents(baseComponents) {
        this.baseComponents = baseComponents;
    }
    setCustomComponents(customComponents) {
        this.customComponents = customComponents;
    }
    getComponentByUniqueKey(uniqueKey) {
        for (let component of this.baseComponents) {
            if (component.defaultProps.gaeaUniqueKey === uniqueKey) {
                return component;
            }
        }
        if (this.customComponents) {
            for (let component of this.customComponents) {
                if (component.defaultProps.gaeaUniqueKey === uniqueKey) {
                    return component;
                }
            }
        }
        return null;
    }
    setRootUniqueId(uniqueId) {
        this.rootMapUniqueKey = uniqueId;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Preview;
