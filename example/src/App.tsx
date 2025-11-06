import React, { useMemo } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { ToastProvider } from 'rn-snap-toast';
import Home from './Home';

const TOAST_CONFIG = {
  duration: 2000,
  maxQueueSize: 5,
  animationDuration: 2000,
  blurIntensity: 30,
  blurType: 'dark',
  position: 'bottom',
  disableBlur: true,
  borderRadius: 24,
  backdropColor: 'rgba(0, 0, 0, 0.1)',
  insets: {
    top: 64,
    bottom: 32,
  },
  textStyle: {
    color: '#000',
  },
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
  },
});

const App = React.memo(() => {
  // Memoize config to avoid unnecessary re-renders
  const toastConfig = useMemo(() => TOAST_CONFIG, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ToastProvider
        config={{
          ...toastConfig,
          blurType: 'dark' as const, // Ensure correct type for blurType
          position: 'bottom' as const, // Ensure correct type for position if needed
        }}
      >
        <View style={styles.container}>
          <Home />
        </View>
      </ToastProvider>
    </SafeAreaView>
  );
});

export default App;
