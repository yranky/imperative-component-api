export const extend = Object.assign

export const isEmptyValue = (value: any, trim: boolean = false) => {
    if (value === undefined || value === null || (trim && typeof value === 'string' && value.trim() === '') || (!trim && value === '')) return true
    return false
}