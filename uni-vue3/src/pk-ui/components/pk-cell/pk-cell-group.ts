import { extend } from '../../libs/utils'

export const cellGroupProps = extend({}, {
    title: {
        type: String,
        default: ''
    },
    lastHideBorder: {
        type: Boolean,
        default: true
    }
})