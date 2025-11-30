import { extend } from '../../libs/utils'
import { skeletonCommonProps } from "./types"
import { type PropType } from "vue"

export const skeletonParagraphProps = extend({}, skeletonCommonProps, {
    active: {
        type: Boolean,
        default: void 0
    },
    rows: {
        type: Number,
        default: 1
    },
    widths: {
        type: Array as PropType<(string | number)[]>,
        default: () => ([])
    }
})