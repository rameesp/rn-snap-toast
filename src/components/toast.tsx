import BaseView from './base-view';
import ToastView from './toast-view';
interface ToastProps {
  isVisible: boolean;
  message: string;
  isSuccess?: boolean;
  isActionable?: boolean;
  buttonText?: string;
  onButtonPress?: () => void;
}
const Toast = ({
  isVisible,
  message,
  isSuccess = false,
  isActionable = false,
  buttonText = '',
  onButtonPress = () => {},
}: ToastProps) => {
  const renderToast = () => {
    return (
      <ToastView
        message={message}
        isSuccess={isSuccess}
        isActionable={isActionable}
        buttonText={buttonText}
        onButtonPress={onButtonPress}
      />
    );
  };
  return <BaseView>{isVisible && renderToast()}</BaseView>;
};

export default Toast;
