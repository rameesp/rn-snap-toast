type ToastType = 'success' | 'error' | 'info';
interface ToastParams {
  message: string;
  duration?: number;
  isSuccess?: boolean;
  isActionable?: boolean;
  buttonText?: string;
  onButtonPress?: () => void;
  type?: ToastType;
}

let showToast: (params: ToastParams) => void = () => {
  throw new Error('Toast service not found');
};
let hideToast: () => void = () => {
  throw new Error('Toast service not found');
};

const registerShowToast = (showToastFn: (params: ToastParams) => void) => {
  showToast = showToastFn;
};

const registerHideToast = (hideToastFn: () => void) => {
  hideToast = hideToastFn;
};

export { hideToast, registerHideToast, registerShowToast, showToast };
