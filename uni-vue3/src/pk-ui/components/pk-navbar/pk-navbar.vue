<template>
    <div :class="[
        bem.b(),
        bem.eqm('placeholder', props.placeholder),
        bem.eqm('fixed', props.fixed)
    ]" :style="{
        zIndex: isEmptyValue(props.zIndex) ? '' : props.zIndex,
        paddingTop: props.fixed ? (statusBarheight + 'px') : ''
    }">
        <div :class="[
            bem.e('wrapper'),
            bem.eqm('fixed', props.fixed)
        ]" :style="{
            paddingTop: statusBarheight + 'px'
        }">
            <div :class="[
                bem.e('left')
            ]" :style="{
                paddingTop: statusBarheight + 'px'
            }">
                <template v-if="showBackArrow">
                    <pk-icon v-if="isFirstPage" name="home-outlined" @click="onLeftClick" />
                    <pk-icon v-else name="left-outlined" @click="onLeftClick" />
                </template>
                <slot name="left"></slot>
            </div>
            <div :class="[
                bem.e('center')
            ]">
                <slot>
                    {{ props.title }}
                </slot>
            </div>
            <div :class="[
                bem.e('right')
            ]" :style="{
                paddingTop: statusBarheight + 'px',
                paddingRight: paddingRight + 'px'
            }">
                <slot name="right"></slot>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useBem } from '../../libs/use'
import './pk-navbar.scss'
import { type navbarEmits, navbarProps } from './pk-navbar'
import PkIcon from '../pk-icon/pk-icon.vue'
import { ref } from 'vue'
import { isEmptyValue } from '../../libs/utils'

defineOptions({
    name: 'PkNavbar'
})
const isFirstPage = ref(getCurrentPages().length === 1)
const statusBarheight = ref(uni.getSystemInfoSync().statusBarHeight)

const props = defineProps(navbarProps)

const emits = defineEmits<navbarEmits>()

const bem = useBem('navbar')

const paddingRight = ref(0)

// #ifdef MP
//获取胶囊
paddingRight.value = uni.getSystemInfoSync().windowWidth - uni.getMenuButtonBoundingClientRect().left
// #endif

const onLeftClick = (e: MouseEvent) => {
    if (props.autoBack) {
        if (isFirstPage.value) {
            uni.switchTab({
                url: '/',
            })
        } else {
            uni.navigateBack()
        }
    } else {
        emits('leftClick', e)
    }
}

</script>