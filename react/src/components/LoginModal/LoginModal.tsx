import { getIntl, getLocale, request } from "@umijs/max";
import { Form, FormProps, Input, Modal, ModalProps } from "antd";
import React, { createElement, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

type LoginModalProps = Exclude<ModalProps, 'footer' | 'open'> & {
    open: boolean;
    formProps?: Exclude<FormProps, 'form'>;
    onSuccess?: () => void;
    onFail?: () => void
}

export default function LoginModal(props: LoginModalProps) {
    const intl = getIntl(getLocale());
    const [open, setOpen] = useState(props.open);
    const [formRef] = Form.useForm();
    const [loading, setLoading] = useState(false);
    useEffect(() => setOpen(props.open), [props.open]);

    const onSubmit = async () => {
        const values = await formRef.validateFields();

        const { success } = await request(`/api/v1/login`, {
            method: 'POST',
            data: { ...values },
        });
        if (!success) return Promise.reject();

        return Promise.resolve();
    }

    return (
        <Modal
            title={intl.formatMessage({ id: 'login.title' })}
            okText={intl.formatMessage({ id: 'login.login' })}
            cancelText={intl.formatMessage({ id: 'login.cancel' })}
            {...props}
            open={open}
            onCancel={(e) => {
                setOpen(false);
                props.onCancel?.(e);
            }}
            okButtonProps={{
                ...props?.okButtonProps,
                loading: loading,
            }}
            onOk={async (e) => {
                setLoading(true);
                try {
                    await onSubmit();
                    setOpen(false);
                    props.onOk?.(e);
                    props.onSuccess?.();
                } catch (e) {
                    props.onFail?.();
                } finally {
                    setLoading(false);
                }
            }}
        >
            <Form
                autoComplete="off"
                {...props?.formProps}
                form={formRef}
            >
                <Form.Item
                    label={intl.formatMessage({ id: 'login.username' })}
                    name="username"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={intl.formatMessage({ id: 'login.password' })}
                    name="password"
                    rules={[{ required: true }]}
                >
                    <Input.Password />
                </Form.Item>
            </Form>
        </Modal>
    )
}


type LoginModalParams = LoginModalProps

//react18+
LoginModal.show = (params: LoginModalParams): Promise<void> => {
    return new Promise((resolve, reject) => {
        // 创建root 实例
        const root = createRoot(document.createElement('div'));
        // 渲染组件
        root.render(createElement(LoginModal, {
            ...params,
            onSuccess() {
                resolve();
                params.onSuccess?.();
            },
            onCancel(e) {
                reject();
                params.onCancel?.(e);
            },
            afterClose() {
                params.afterClose?.();
                root.unmount();
            },
        } as LoginModalParams));
    })
}

//React 16.8+
const renderComponent = (comp: React.ReactElement) => {
    // 创建容器
    const container = document.createElement('div');
    // 将容器body中
    document.body.appendChild(container);
    // 将React组件渲染到容器中
    ReactDOM.render(comp, container);

    return {
        container,
        unmount: () => { // 卸载函数，用于清理组件
            ReactDOM.unmountComponentAtNode(container); // 从DOM中卸载组件
            container.remove(); // 移除容器元素
        }
    };
}

LoginModal.showByRenderApp = (params: LoginModalParams): Promise<void> => {
    return new Promise((resolve, reject) => {
        // 创建并挂载
        const { unmount } = renderComponent(<LoginModal
            {...params}
            onSuccess={() => {
                resolve();
                params.onSuccess?.();
            }}
            onCancel={(e) => {
                reject();
                params.onCancel?.(e);
            }}
            afterClose={() => {
                params.afterClose?.();
                unmount();
            }} />);
    })
}
