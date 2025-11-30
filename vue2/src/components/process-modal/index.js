import Vue from 'vue';
import ProcessModalComp from "./ProcessModal.vue";
export const ProcessModal = ProcessModalComp;

const ProcessModalConstructorContainer = Vue.extend();
export const showProcessModal = () => {
    return new Promise((resolve, reject) => {
        // 创建ProcessModalConstructorContainer实例
        const instance = new ProcessModalConstructorContainer({
            data() {
                return {
                    visible: false  // 控制模态框显示状态
                }
            },
            render(h) {
                // 使用render函数渲染模态框组件
                return h(ProcessModalComp, {
                    ref: 'processModal',  // ref
                    attrs: {
                        title: '进度',  // 模态框标题，对应$attrs.title
                    },
                    props: {
                        visible: this.visible  // 传递显示状态
                    },
                    on: {
                        // 监听模态框关闭事件
                        closed: () => {
                            instance.$destroy();  // 销毁实例
                            document.body.removeChild(instance.$el);  // 从DOM中移除

                            reject();
                        },
                        // 监听确定按钮点击事件
                        ok: resolve,
                        // 监听取消按钮点击事件
                        cancel: reject
                    },
                })
            },
            created() {
                // 在组件创建后执行
                this.$nextTick(() => {
                    this.visible = true;  // 显示模态框
                    this.$refs.processModal.startRequest();  // 启动请求
                })
            },
        }).$mount();

        // 将容器添加到body中
        document.body.appendChild(instance.$el);
    })
}