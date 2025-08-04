import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Toast from '../components/toast';
import { registerHideToast, registerShowToast } from '../service/toast-service';
import type { BlurTint } from 'expo-blur/build/BlurView.types';

export interface ToastConfig {
  duration?: number;
  maxQueueSize?: number;
  animationDuration?: number;
  blurIntensity?: number;
  blurType?: BlurTint;
  position?: 'top' | 'bottom';
  insets?: {
    top: number;
    bottom: number;
  };
}

export interface ToastParams {
  message: string;
  duration?: number;
  isSuccess?: boolean;
  isActionable?: boolean;
  buttonText?: string;
  position?: 'top' | 'bottom';
  onButtonPress?: () => void;
  onFinish?: () => void;
}

interface ToastContextType {
  showToast: (params: ToastParams) => void;
  hideToast: () => void;
  config: ToastConfig;
  toastParams: ToastParams;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
  hideToast: () => {},
  config: {},
  toastParams: {
    message: '',
  },
});

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('Toast provider not found');
  }
  return context;
};

const DEFAULT_DURATION = 3000;
const MAX_QUEUE_SIZE = 10;
const ANIMATION_DURATION = 1000;

export const ToastProvider = ({
  children,
  config,
}: {
  children: React.ReactNode;
  config: ToastConfig;
}) => {
  const {
    duration = DEFAULT_DURATION,
    maxQueueSize = MAX_QUEUE_SIZE,
    animationDuration = ANIMATION_DURATION,
  } = config;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [toastState, setToastState] = useState<{
    isVisible: boolean;
  }>({
    isVisible: false,
  });
  const [toastParams, setToastParams] = useState<ToastParams>({
    message: '',
    isSuccess: false,
    isActionable: false,
    buttonText: '',
    position: 'bottom',
  });
  const [toastConfig, setToastConfig] = useState<ToastConfig>(config);
  const queue = useRef<ToastParams[]>([]);
  const isProcessing = useRef(false);

  const processQueue = useCallback(() => {
    if (isProcessing.current || queue.current.length === 0) return;

    isProcessing.current = true;
    const nextToast = queue.current.shift()!;
    const toastDuration = nextToast.duration || duration;

    setToastParams({
      ...nextToast,
      duration: toastDuration,
    });
    setToastState({ isVisible: true });

    timeoutRef.current = setTimeout(() => {
      setToastParams((prev) => {
        if (prev.onFinish) {
          prev.onFinish();
        }
        return prev;
      });
      setToastState({ isVisible: false });
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      isProcessing.current = false;
      // Process next toast in queue after animation completes
      setTimeout(() => {
        processQueue();
      }, animationDuration);
    }, toastDuration);
  }, [duration, animationDuration]);

  const hideToast = useCallback(() => {
    setToastParams((prev) => {
      if (prev.onFinish) {
        prev.onFinish();
      }
      return prev;
    });
    setToastState({ isVisible: false });
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    isProcessing.current = false;
    // Process next toast in queue after animation completes
    setTimeout(() => {
      processQueue();
    }, animationDuration);
  }, [animationDuration, processQueue]);

  const showToast = useCallback(
    (params: ToastParams) => {
      const { message } = params;
      if (!message?.trim()) return;

      // Prevent queue from growing too large
      if (queue.current.length >= maxQueueSize) {
        queue.current = queue.current.slice(-maxQueueSize + 1);
      }

      queue.current.push(params);

      if (!isProcessing.current) {
        processQueue();
      }
    },
    [processQueue, maxQueueSize]
  );

  useEffect(() => {
    registerShowToast(showToast);
    registerHideToast(hideToast);
    setToastConfig(config);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      queue.current = [];
      isProcessing.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ToastContext.Provider
      value={{ showToast, hideToast, config: toastConfig, toastParams }}
    >
      {children}
      <Toast isVisible={toastState.isVisible} />
    </ToastContext.Provider>
  );
};
