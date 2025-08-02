import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FullWindowOverlay } from 'react-native-screens';

interface ToastProps {
  children: React.ReactNode;
}

const BaseView = ({ children }: ToastProps) => {
  return (
    <FullWindowOverlay>
      <View style={styles.container}>{children}</View>
    </FullWindowOverlay>
  );
};

export default BaseView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 16,
  },
});
