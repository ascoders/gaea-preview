import 'gaea-model'
import * as LZString from 'lz-string'

import GaeaPreview from './gaea-preview/gaea-preview.component'
import {PropsDefine as GaeaPreviewPropsDefine} from './gaea-preview/gaea-preview.type'

export {GaeaPreview, GaeaPreviewPropsDefine}
export default GaeaPreview

const LZDecode = LZString.decompressFromBase64
const LZEncode = LZString.compressToBase64
export {LZDecode as decode}
export {LZEncode as encode}