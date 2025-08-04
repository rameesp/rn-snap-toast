import BaseView from './base-view';
import ToastView from './toast-view';
interface ToastProps {
  isVisible: boolean;
}
const Toast = ({ isVisible }: ToastProps) => {
  return <BaseView>{isVisible && <ToastView />}</BaseView>;
};

export default Toast;
