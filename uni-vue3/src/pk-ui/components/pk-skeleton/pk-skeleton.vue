<template>
    <div :class="[
        bem.b()
    ]">
        <slot name="template" v-if="props.loading">
            <div :class="[
                bem.e('content')
            ]">
                <div :class="[
                    bem.e('image')
                ]" v-if="props.avatar">
                    <skeleton-avatar />
                </div>
                <div :class="[
                    bem.e('paragraph')
                ]" v-if="props.paragraph || props.title">
                    <skeleton-paragraph v-if="props.title" :rows="1" :widths="[40]" />
                    <skeleton-paragraph v-if="props.paragraph" :rows="props.rows" />
                </div>
            </div>
        </slot>
        <slot v-else></slot>
    </div>
</template>
<script lang="ts" setup>
import { useBem } from '../../libs/use'
import './pk-skeleton.scss'
import { skeletonProps } from './pk-skeleton'
import { provide, ref, toRefs } from 'vue'
import { type ISkeletonExposeToParent, type ISkeletonProvider, skeletonProviderId } from './types'
import SkeletonAvatar from './pk-skeleton-avatar.vue'
import SkeletonParagraph from './pk-skeleton-paragraph.vue'
defineOptions({
    name: 'PkSkeleton'
})

const bem = useBem('skeleton')
const props = defineProps(skeletonProps)
const { active } = toRefs(props)

const skeletons = ref<ISkeletonExposeToParent[]>([])

const addSkeleton = (skeleton: ISkeletonExposeToParent) => {
    skeletons.value.push(skeleton as ISkeletonExposeToParent)
}
const removeSkeleton = (skeletonId: symbol) => {
    skeletons.value = skeletons.value.filter(skeleton => skeleton.id !== skeletonId)
}

provide<ISkeletonProvider>(skeletonProviderId, {
    addSkeleton,
    removeSkeleton,
    active: active
})

</script>