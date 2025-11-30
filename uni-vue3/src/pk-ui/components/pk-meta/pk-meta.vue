<template>
    <slot></slot>
</template>
<script lang="ts" setup>
import { onBackPress } from '@dcloudio/uni-app'
import { useBem } from '../../libs/use'
import { metaProps } from './pk-meta'
import { provide } from 'vue'
import { metaProvideSymbol, type IMetaProvide, type IMetaPressbackCallback } from '../../libs/utils'

defineOptions({
    name: 'PkMeta',
    options: {
        virtualHost: true,
        styleIsolation: 'shared'
    }
})

const props = defineProps(metaProps)

const bem = useBem('meta')

const backCheckHooks: IMetaPressbackCallback[] = []

provide<IMetaProvide>(metaProvideSymbol, {
    registerPressback: (cb: IMetaPressbackCallback) => !backCheckHooks.includes(cb) && backCheckHooks.push(cb),
    unRegisterPressback: (cb: IMetaPressbackCallback) => backCheckHooks.includes(cb) && backCheckHooks.splice(backCheckHooks.indexOf(cb), 1)
})

const updateBackCheck = () => {
    try {
        //从后往前，如果有一个返回false，则不允许back
        const length = backCheckHooks.length
        for (let i = length - 1; i >= 0; i--) {
            const canBack = backCheckHooks[i]()
            if (!canBack) return true
        }
    } catch (err) { }

    return false
}

onBackPress(() => {
    const cantBack = updateBackCheck()
    console.log('cantBack', cantBack)
    return cantBack
})

</script>