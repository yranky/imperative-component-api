<template>
    <pk-popup v-model="_show" fade :close-on-press-overlay="false"
        :overlay-background-color="props.overlayBackgroundColor" background-color="transparent"
        :position="props.position" overflow-y="visible" :overlay="props.overlay" @onClose="emits('onClose')"
        @onOpen="emits('onOpen')" @onOpened="emits('onOpened')" @onClosed="emits('onClosed')">
        <view :class="[
            bem.b(),
            bem.m(props.position),
            bem.m(props.type)
        ]">
            <view :class="[
                bem.e('icon')
            ]" v-if="props.type === 'icon' || props.type === 'loading'">
                <slot name="icon">
                    <pk-loading v-if="props.type === 'loading'" color="currentColor" />
                </slot>
            </view>
            <view :class="[
                bem.e('text')
            ]">
                <slot name="text">
                    {{ _text }}
                </slot>
            </view>
        </view>
    </pk-popup>
</template>
<script setup lang="ts">
import { useBem, useVModel } from '@/pk-ui/libs/use'
import { toastProps, toastEmits } from './my-toast'
import { computed, ref, watch } from 'vue'
import "./my-toast.scss"
import PkLoading from '@/pk-ui/components/pk-loading/pk-loading.vue'
import PkPopup from '@/pk-ui/components/pk-popup/pk-popup.vue'

defineOptions({
    name: 'MyToast',
})

const props = defineProps(toastProps)

const emits = defineEmits(toastEmits)

const bem = useBem('toast')

const _show = useVModel(props, 'modelValue', emits)
const _text = useVModel(props, 'text', emits)
const _duration = useVModel(props, 'duration', emits)

let timer: ReturnType<typeof setTimeout>

const clearTimer = () => clearTimeout(timer)

const startTimer = () => {
    clearTimer();
    if (_show.value && _duration.value > 0 && props.type !== 'loading') {
        timer = setTimeout(() => {
            updateShow(false)
        }, _duration.value);
    }
}
const updateShow = (val: boolean = true) => {
    _show.value = val;
    startTimer();
}
const updateText = (val: string) => {
    _text.value = val;
    startTimer();
}
const updateDuration = (val: number) => {
    _duration.value = val;
    startTimer();
}

watch(
    () => [_show.value, props.position, _text.value, _duration.value],
    startTimer,
    {
        immediate: true
    }
)

defineExpose({
    updateShow,
    updateText,
    updateDuration
})
</script>