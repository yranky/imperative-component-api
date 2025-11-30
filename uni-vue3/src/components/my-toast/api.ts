import { nextTick } from 'vue';
import MyToast from './my-toast.vue';

export function showToast(title: string, duration = 3000) {
    // 使用nextTick确保在DOM更新后执行
    nextTick(() => {
        // 获取当前所有页面栈
        const pages = getCurrentPages();
        // 获取当前页面（最后一个页面）
        const page = pages[pages.length - 1];
        // 获取Toast组件的实例
        const context = page?.$vm.$refs?.myToastRef as InstanceType<typeof MyToast> | undefined;
        // 如果组件未找到，输出错误信息并返回
        if (!context) {
            console.error('Toast组件未找到');
            return;
        };
        // 更新Toast组件的文本内容
        context.updateText(title);
        // 更新Toast组件的显示持续时间
        context.updateDuration(duration);
        // 显示Toast组件
        context.updateShow(true);
    });
}