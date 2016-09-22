import * as React from 'react';
export default class Preview {
    baseComponents: Array<React.ComponentClass<FitGaea.ComponentProps>>;
    setBaseComponents(baseComponents: Array<React.ComponentClass<FitGaea.ComponentProps>>): void;
    customComponents: Array<React.ComponentClass<FitGaea.ComponentProps>>;
    setCustomComponents(customComponents: Array<React.ComponentClass<FitGaea.ComponentProps>>): void;
    getComponentByUniqueKey(uniqueKey: string): React.ComponentClass<FitGaea.ComponentProps>;
    components: Map<string, FitGaea.ViewportComponentInfo>;
    rootMapUniqueKey: string;
    setRootUniqueId(uniqueId: string): void;
}
