import { createApp, h, ref } from "vue";
import ProcessModalComp from "./ProcessModal.vue";
import { type ElDialog } from "element-plus";
export const ProcessModal = ProcessModalComp;

export const showProcessModal = (title: string) => {
    return new Promise((resolve, reject) => {
        //创建一个响应式的布尔值，控制模态框的显示状态
        const show = ref(true);
        const container = document.createElement("div");
        // 创建一个ProcessModalComp的ref
        const compRef = ref<InstanceType<typeof ProcessModalComp>>();

        // 创建新的ref容器
        const app = createApp(() => h(ProcessModalComp, {
            ref: compRef,
            // 双向绑定模态框的显示状态
            modelValue: show.value,
            title,
            //弹框打开后开始轮询
            onOpened: () => {
                compRef.value?.startRequest();
            },
            //弹框关闭后卸载组件并移除容器
            onClosed: () => {
                app.unmount();
                document.body.removeChild(container);
            },
            onOk: resolve,
            onCancel: reject
        } as (InstanceType<typeof ProcessModalComp>['$props']) & InstanceType<typeof ElDialog>['$props']));
        // 将容器添加到body中
        document.body.appendChild(container);
        // 挂载组件到容器中
        app.mount(container);
    })
}