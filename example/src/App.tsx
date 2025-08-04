import React, { useMemo } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { ToastProvider } from 'rn-snap-toast';
import Home from './Home';

const TOAST_CONFIG = {
  duration: 3000,
  maxQueueSize: 5,
  animationDuration: 300,
  blurIntensity: 70,
  blurType: 'dark',
  position: 'bottom',
  insets: {
    top: 24,
    bottom: 32,
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
