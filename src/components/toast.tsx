import type { BlurTint } from 'expo-blur/build/BlurView.types';
import BaseView from './base-view';
import ToastView from './toast-view';
interface ToastProps {
  isVisible: boolean;
  message: string;
  isSuccess?: boolean;
  isActionable?: boolean;
  buttonText?: string;
  onButtonPress?: () => void;
  blurIntensity?: number;
  blurType?: BlurTint;
  position?: 'top' | 'bottom';
}
const Toast = ({
  isVisible,
  message,
  isSuccess = false,
  isActionable = false,
  buttonText = '',
  onButtonPress = () => {},
  blurIntensity = 70,
  blurType = 'dark',
  position = 'bottom',
}: ToastProps) => {
  const renderToast = () => {
    return (
      <ToastView
        message={message}
        isSuccess={isSuccess}
        isActionable={isActionable}
        buttonText={buttonText}
        onButtonPress={onButtonPress}
        blurIntensity={blurIntensity}
        blurType={blurType}
        position={position}
      />
    );
  };
  return <BaseView>{isVisible && renderToast()}</BaseView>;
};

export default Toast;
