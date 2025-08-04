import React, { useMemo } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, { Easing, FadeIn, FadeOut } from 'react-native-reanimated';
import TickIcon from '../assets/tick-icon';
import { useToast } from '../context/toast-provider';

interface ToastViewProps {}

const AnimatedView = Animated.createAnimatedComponent(View);

const ToastView = React.memo(({}: ToastViewProps) => {
  const {
    config: {
      position: defaultPosition = 'bottom',
      insets = { top: 0, bottom: 0 },
      blurIntensity = 70,
      blurType = 'dark',
    },
    toastParams: {
      message,
      isSuccess,
      isActionable,
      buttonText,
      onButtonPress,
      position: toastPosition,
    },
  } = useToast();

  // Use toast-specific position if provided, otherwise fall back to config position
  const position = toastPosition || defaultPosition;

  // Memoize styles to avoid unnecessary recalculations
  const styles = useMemo(
    () => makeStyles(position, insets),
    [position, insets]
  );

  return (
    <AnimatedView
      entering={FadeIn.duration(300).easing(Easing.linear)}
      exiting={FadeOut.duration(300).easing(Easing.linear)}
      style={styles.container}
    >
      <BlurView
        intensity={blurIntensity}
        tint={blurType}
        style={StyleSheet.absoluteFill}
      />
      {isSuccess && <TickIcon />}
      <Text numberOfLines={2} style={styles.message}>
        {message}
      </Text>
      {isActionable && !!buttonText && (
        <Pressable style={styles.button} onPress={onButtonPress}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </Pressable>
      )}
    </AnimatedView>
  );
});

export default ToastView;

const makeStyles = (
  position: 'top' | 'bottom',
  insets: { top: number; bottom: number }
) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: position === 'bottom' ? insets.bottom : undefined,
      top: position === 'top' ? insets.top : undefined,
      alignSelf: 'center',
      shadowColor: '#1c1c1e',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 32,
      elevation: 5,
      borderRadius: 30,
      paddingVertical: 16,
      paddingHorizontal: 24,
      width: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      gap: 12,
      minWidth: '40%',
      overflow: 'hidden',
      backgroundColor: 'transparent',
    },
    message: {
      fontSize: 14,
      fontWeight: '500',
      color: '#222',
      flexShrink: 1,
    },
    button: {
      marginLeft: 8,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 2,
      elevation: 2,
    },
    buttonText: {
      fontSize: 14,
      fontWeight: '600',
      color: '#007AFF',
    },
  });
