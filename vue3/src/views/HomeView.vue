<template>
  <div>
    <el-button @click="loadProcessModal(true)">成功</el-button>
    <el-button @click="loadProcessModal(false)">失败</el-button>
  </div>
</template>
<script setup lang="ts">
import { showProcessModal } from '@/components/process-modal';
import { ElButton, ElMessage } from 'element-plus';


const loadProcessModal = (isSuccess: boolean) => {
  window.isSuccess = isSuccess;
  showProcessModal('进度测试').then(() => {
    console.log('点击了确定');
    ElMessage.success('点击了确定');
  }).catch(() => {
    console.log('取消');
    ElMessage.error('取消');
  });
}

</script>
