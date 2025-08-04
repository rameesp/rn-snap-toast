import React, { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import { useToast, showToast, hideToast } from 'rn-snap-toast';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'info'
  | 'danger';

interface ToastButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
}

const ToastButton: React.FC<ToastButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
}) => (
  <Pressable style={[styles.button, styles[variant]]} onPress={onPress}>
    <Text
      style={[
        styles.buttonText,
        styles[`${variant}Text` as keyof typeof styles],
      ]}
    >
      {title}
    </Text>
  </Pressable>
);

const Home = () => {
  const { showToast: showContextToast } = useToast();
  const [toastCount, setToastCount] = useState(0);

  const handleBasicToast = () => {
    showContextToast({
      message: 'This is a basic toast message',
      position: 'bottom',
    });
  };

  const handleSuccessToast = () => {
    showContextToast({
      message: 'Operation completed successfully!',
      isSuccess: true,
      duration: 1000,
    });
  };

  const handleActionableToast = () => {
    showContextToast({
      message: 'Do you want to undo this action?',
      isActionable: true,
      buttonText: 'Undo',
      onButtonPress: () => {
        Alert.alert('Undo', 'Action undone successfully!');
      },
    });
  };

  const handleTopToast = () => {
    showContextToast({
      message: 'This toast appears at the top of the screen',
      position: 'top',
    });
  };

  const handleLongDurationToast = () => {
    showContextToast({
      message: 'This toast will show for 5 seconds',
      duration: 5000,
    });
  };

  const handleServiceToast = () => {
    showToast({
      message: 'Toast called from service (outside component)',
      isSuccess: true,
    });
  };

  const handleMultipleToasts = () => {
    setToastCount((prev) => prev + 1);
    showContextToast({
      message: `Toast ${toastCount + 1} - This demonstrates the queue system`,
    });
    showContextToast({
      message: `Toast ${toastCount + 2} - Multiple toasts are queued`,
    });
    showContextToast({
      message: `Toast ${toastCount + 3} - They appear sequentially`,
    });
  };

  const handleToastWithCallback = () => {
    showContextToast({
      message: 'Processing your request...',
      onFinish: () => {
        Alert.alert('Toast Finished', 'The toast has completed!');
      },
    });
  };

  const handleHideToast = () => {
    hideToast();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>rn-snap-toast</Text>
        <Text style={styles.subtitle}>
          A modern toast component for React Native
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Examples</Text>
        <View style={styles.buttonGrid}>
          <ToastButton
            title="Basic Toast"
            onPress={handleBasicToast}
            variant="primary"
          />
          <ToastButton
            title="Success Toast"
            onPress={handleSuccessToast}
            variant="success"
          />
          <ToastButton
            title="Top Position"
            onPress={handleTopToast}
            variant="secondary"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Advanced Features</Text>
        <View style={styles.buttonGrid}>
          <ToastButton
            title="Actionable Toast"
            onPress={handleActionableToast}
            variant="warning"
          />
          <ToastButton
            title="Long Duration"
            onPress={handleLongDurationToast}
            variant="info"
          />
          <ToastButton
            title="With Callback"
            onPress={handleToastWithCallback}
            variant="secondary"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Queue System</Text>
        <View style={styles.buttonGrid}>
          <ToastButton
            title="Multiple Toasts"
            onPress={handleMultipleToasts}
            variant="primary"
          />
          <ToastButton
            title="Service Toast"
            onPress={handleServiceToast}
            variant="success"
          />
          <ToastButton
            title="Hide Current Toast"
            onPress={handleHideToast}
            variant="danger"
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Tap any button to see the toast in action!
        </Text>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  buttonGrid: {
    gap: 12,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primary: {
    backgroundColor: '#007AFF',
  },
  primaryText: {
    color: '#fff',
  },
  secondary: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  secondaryText: {
    color: '#007AFF',
  },
  success: {
    backgroundColor: '#34C759',
  },
  successText: {
    color: '#fff',
  },
  warning: {
    backgroundColor: '#FF9500',
  },
  warningText: {
    color: '#fff',
  },
  info: {
    backgroundColor: '#5AC8FA',
  },
  infoText: {
    color: '#fff',
  },
  danger: {
    backgroundColor: '#FF3B30',
  },
  dangerText: {
    color: '#fff',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
