export const RESULT_TYPE = {
    SUCCESS: 'success',
    FAILURE: 'failure',
    PEDING: 'peding'
}

export const useMockResult = () => {
    let count = Math.random() * 5 + 5;
    let percent = 0;
    let cancelCallback: () => void;
    let isSuccess = window.isSuccess;

    const request = (signal: AbortSignal): Promise<{
        type: typeof RESULT_TYPE[keyof typeof RESULT_TYPE],
        percent: number
    }> => {
        return new Promise((resolve, reject) => {
            signal.removeEventListener('abort', cancelCallback);
            cancelCallback = () => {
                console.log('cancelled');
                reject({ type: RESULT_TYPE.FAILURE, percent });
                signal.removeEventListener('abort', cancelCallback);
            }
            signal.addEventListener('abort', cancelCallback);

            percent = parseInt(Math.min(100, percent + Math.random() * 20) + ''); // 模拟进度

            setTimeout(() => {
                if (--count <= 0) {
                    if (isSuccess) {
                        percent = 100;
                        resolve({ type: RESULT_TYPE.SUCCESS, percent });
                    }
                    else resolve({ type: RESULT_TYPE.FAILURE, percent });
                }
                else resolve({ type: RESULT_TYPE.PEDING, percent });
            }, 100)
        })
    }

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    return {
        request,
        sleep
    }
}