import { extend } from "../../libs/utils"
import { loadingTypes } from "../pk-loading/types"

export const switchSizeTypes = ['l', 'm', 's'] as const
export const switchEmits = ['update:modelValue', 'click', 'onChange']
export const switchProps = extend({}, {
    size: {
        type: String,
        values: switchSizeTypes,
        default: 'm'
    },
    modelValue: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    loading: {
        type: Boolean,
        default: false
    },
    loadingSize: {
        type: Number,
        default: 40
    },
    loadingType: {
        type: String,
        values: loadingTypes,
        default: 'circular'
    },
    loadingColor: {
        type: String
    },
    background: {
        type: String
    },
    inactiveBackground: {
        type: String
    },
    beforeChange: {
        type: Function
    }
})