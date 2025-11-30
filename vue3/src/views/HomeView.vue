<template>
  <div>
    <el-button @click="loadProcessModal(true)">成功</el-button>
    <el-button @click="loadProcessModal(false)">失败</el-button>
  </div>
</template>
<script setup lang="ts">
import { showProcessModal } from '@/components/process-modal';
import { ElButton } from 'element-plus';


const loadProcessModal = (isSuccess: boolean) => {
  window.isSuccess = isSuccess;
  showProcessModal('进度测试');
}

</script>
