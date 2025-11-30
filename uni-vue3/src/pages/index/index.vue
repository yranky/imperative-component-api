<template>
  <view class="index-container">
    <pk-button @click="showToast('测试文字')">显示toast</pk-button>
  </view>
</template>

<script setup lang="ts">
import PkButton from '@/pk-ui/components/pk-button/pk-button.vue';
import { showToast } from '@/components/my-toast/api';


</script>

<style></style>
