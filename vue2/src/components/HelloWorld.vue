<template>
  <div>
    <el-button @click="loadProcessModal(true)">成功</el-button>
    <el-button @click="loadProcessModal(false)">失败</el-button>
  </div>
</template>

<script>
import { showProcessModal } from '@/components/process-modal';
import { Button as ElButton, MessageBox } from 'element-ui';

export default {
  components: {
    ElButton
  },
  name: 'HelloWorld',
  methods: {
    loadProcessModal(isSuccess) {
      window.isSuccess = isSuccess;
      showProcessModal('进度测试').then(() => {
        console.log('点击了确定');
        MessageBox.alert('点击了确定');
      }).catch(() => {
        console.log('取消');
        MessageBox.alert('取消');
      });
    }
  }
}

</script>
<style scoped></style>
