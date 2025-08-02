import { View, StyleSheet } from 'react-native';
import { ToastProvider } from 'rn-snap-toast';
import Home from './Home';

export default function App() {
  return (
    <ToastProvider
      config={{ duration: 3000, maxQueueSize: 3, animationDuration: 3000 }}
    >
      <View style={styles.container}>
        <Home />
      </View>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
