import * as React from 'react'

export interface PropsDefine extends CommonModel.TransmitTransparentlyProps {

}

export class PropsGaea {
    gaeaName = '盖亚-查看器'
    gaeaIcon = 'square-o'
    gaeaUniqueKey = 'nt-editor-gaea-preview'
}

export class Props extends PropsGaea implements PropsDefine {

}

export interface StateDefine {

}

export class State implements StateDefine {

}
                