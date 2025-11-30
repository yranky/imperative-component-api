<template>
    <div :class="[
        bem.b()
    ]">
        <div :class="[
            bem.e('left')
        ]" @click="emits('onCancel')" @touchstart="">
            {{ props.cancelText }}
        </div>
        <div :class="[
            bem.e('title')
        ]">
            {{ props.title }}
        </div>
        <div :class="[
            bem.e('right')
        ]" @click="emits('onConfirm')" @touchstart="">
            {{ props.confirmText }}
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useBem } from '../../libs/use'
import './pk-picker-toolbar.scss'
import { pickerToolbarEmits, pickerToolbarProps } from './pk-picker-toolbar'

const props = defineProps(pickerToolbarProps)

const emits = defineEmits(pickerToolbarEmits)

const bem = useBem('picker-toolbar')

</script>