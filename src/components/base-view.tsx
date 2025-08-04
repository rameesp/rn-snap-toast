import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { FullWindowOverlay } from 'react-native-screens';

interface ToastProps {
  children: React.ReactNode;
}

const BaseView = ({ children }: ToastProps) => {
  return (
    <SafeAreaView>
      <FullWindowOverlay>
        <View style={styles.container}>{children}</View>
      </FullWindowOverlay>
    </SafeAreaView>
  );
};

export default BaseView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
