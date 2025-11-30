<template>
    <el-dialog v-model="show" v-bind="$attrs" @closed="onClosed">
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
<script setup lang="ts">
import { ref } from 'vue';
import { ElDialog, ElProgress, ElButton } from 'element-plus';
import { RESULT_TYPE, useMockResult } from './useMockResult';
import { useVModel } from '@/utils/useVModel';

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    },
});

let abortController = new AbortController();
const { request, sleep } = useMockResult();
const emits = defineEmits(['closed', 'ok', 'cancel', 'update:modelValue']);
const show = useVModel(props, 'modelValue', emits);

const progress = ref(0);
const status = ref<typeof RESULT_TYPE[keyof typeof RESULT_TYPE]>(RESULT_TYPE.PEDING);

const onClosed = () => {
    abortController.abort();
    emits('closed');
}

const onOk = () => {
    emits('ok');
    show.value = false;
}

const onCancel = () => {
    abortController.abort();
    emits('cancel');
    show.value = false;
}

const startRequest = async () => {
    status.value = RESULT_TYPE.PEDING;
    abortController = new AbortController();
    doRequest();
}

const doRequest = async () => {
    const { type, percent } = await request(abortController.signal);
    await sleep(Math.random() * 500 + 300);

    progress.value = percent;
    status.value = type;

    if (type === RESULT_TYPE.PEDING) doRequest();
}

defineExpose({
    startRequest,
});

</script>