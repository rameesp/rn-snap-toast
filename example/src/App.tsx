import { View, StyleSheet, SafeAreaView } from 'react-native';
import { ToastProvider } from 'rn-snap-toast';
import Home from './Home';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ToastProvider
        config={{
          duration: 3000,
          maxQueueSize: 3,
          animationDuration: 1200,
          blurIntensity: 100,
          blurType: 'light',
        }}
      >
        <View style={styles.container}>
          <Home />
        </View>
      </ToastProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'orange',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
