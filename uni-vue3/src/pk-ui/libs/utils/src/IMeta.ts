export const metaProvideSymbol = Symbol('metaProvide')


export type IMetaPressbackCallback = () => boolean
export interface IMetaProvide {
    registerPressback: (fn: IMetaPressbackCallback) => void,
    unRegisterPressback: (fn: IMetaPressbackCallback) => void,
}