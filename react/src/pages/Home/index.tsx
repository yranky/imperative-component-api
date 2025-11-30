import { PageContainer } from '@ant-design/pro-components';
import styles from './index.less';
import { Button, message } from 'antd';
import LoginModal from '@/components/LoginModal';
import { getIntl, getLocale } from '@umijs/max';

const HomePage: React.FC = () => {
  const intl = getIntl(getLocale());

  const showLoginModal = async () => {
    //模拟响应拦截中识别到未登录状态码，拉起登录弹窗
    try {
      await LoginModal.show({
        open: true,
        onFail() {
          console.log('登录失败');
          message.error('登录失败');
        },
      })

      //登录完成了，重发请求
      message.success('登录完成，进行下一步操作');
    } catch (e) {
      message.error('用户取消了登录');
    }
  }

  const showLoginModal168 = async () => {
    //模拟响应拦截中识别到未登录状态码，拉起登录弹窗
    try {
      await LoginModal.showByRenderApp({
        open: true,
        onFail() {
          console.log('登录失败');
          message.error('登录失败');
        },
      })

      //登录完成了，重发请求
      message.success('登录完成，进行下一步操作');
    } catch (e) {
      message.error('用户取消了登录');
    }
  }

  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Button onClick={showLoginModal}>{intl.formatMessage({ id: 'test.action' })}</Button>
        <Button onClick={showLoginModal168}>{intl.formatMessage({ id: 'test.action' })}16.8</Button>
      </div>
    </PageContainer>
  );
};

export default HomePage;
