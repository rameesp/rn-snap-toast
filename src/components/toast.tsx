import BaseView from './base-view';
import ToastView from './toast-view';
interface ToastProps {
  isVisible: boolean;
  toastView?: React.ReactNode;
}
const Toast = ({ isVisible, toastView = <ToastView /> }: ToastProps) => {
  return <BaseView>{isVisible && toastView}</BaseView>;
};

export default Toast;
