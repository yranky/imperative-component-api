import { extend } from '../../libs/utils'
import { skeletonCommonProps } from "./types"
import { type PropType } from "vue"


export const skeletonShape = ['circle', 'square'] as const
export const skeletonAvatarProps = extend({}, skeletonCommonProps, {
    active: {
        type: Boolean,
        default: void 0
    },
    size: {
        type: Number
    },
    shape: {
        type: String as PropType<typeof skeletonShape[number]>,
        default: 'circle'
    }
})