<template>
    <el-dialog :visible.sync="show" v-bind="$attrs" v-on="$listeners" @closed="onClosed">
        <template v-if="status === RESULT_TYPE.PEDING">
            <el-progress :percentage="progress" />
        </template>
        <template v-else-if="status === RESULT_TYPE.SUCCESS">
            成功
        </template>
        <template v-else-if="status === RESULT_TYPE.FAILURE">
            失败
        </template>

        <template #footer>
            <el-button @click="onOk" v-if="status === RESULT_TYPE.SUCCESS">确认</el-button>
            <el-button @click="onCancel">取消</el-button>
        </template>
    </el-dialog>
</template>
<script>
import { RESULT_TYPE, useMockResult } from './useMockResult';
import { Dialog as ElDialog, Progress as ElProgress } from 'element-ui';

export default {
    components: {
        ElDialog,
        ElProgress
    },
    props: {
        visible: {
            type: Boolean
        },
    },
    data() {
        return {
            status: RESULT_TYPE.PEDING,
            progress: 0,
            abortController: new AbortController(),
            request: null,
            sleep: null,
            showValue: false,
            RESULT_TYPE
        }
    },
    created() {
        const { request, sleep } = useMockResult();
        this.request = request;
        this.sleep = sleep;
    },
    computed: {
        show: {
            get() {
                return this.showValue;
            },
            set(value) {
                this.showValue = value;
                this.$emit('update:visible', value);
            }
        }
    },
    watch: {
        visible: {
            handler(newVal) {
                this.show = newVal;
            },
            immediate: true
        }
    },
    methods: {
        onClosed() {
            this.abortController.abort();
        },
        onOk() {
            this.show = false;
            this.$emit('ok');
        },
        onCancel() {
            this.abortController.abort();
            this.$emit('cancel');
            this.show = false;
        },
        startRequest() {
            this.status = RESULT_TYPE.PEDING;
            this.abortController = new AbortController();
            this.doRequest();
        },
        async doRequest() {
            const { type, percent } = await this.request(this.abortController.signal);
            typeof this.sleep === 'function' && await this.sleep(Math.random() * 500 + 300);

            this.progress = percent;
            this.status = type;

            if (type === RESULT_TYPE.PEDING) this.doRequest();
        }
    }
}
</script>