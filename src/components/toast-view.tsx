import React, { useMemo, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import TickIcon from '../assets/tick-icon';
import { useToast } from '../context/toast-provider';

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const ANIMATION_DURATION = 300;

const ToastView = React.memo(() => {
  // Destructure context efficiently and provide sane defaults.
  const {
    config: {
      position: defaultPosition = 'bottom',
      insets = { top: 0, bottom: 0 },
      blurIntensity = 70,
      blurType = 'dark',
      textStyle = {},
      disableBlur = false,
      blurFallbackColor = '#fff',
      backdropColor = 'rgba(0, 0, 0, 0.1)',
    },
    toastParams: {
      message,
      isSuccess,
      isActionable,
      buttonText,
      onButtonPress,
      position: toastPosition,
      toastView,
    },
  } = useToast();

  // Use toast-specific position if provided, otherwise fall back to config position
  const position = toastPosition ?? defaultPosition;

  // Single instance of shared value for animation of backdrop opacity
  const backdropOpacity = useSharedValue(0);

  // Animate the backdrop opacity in/out
  useEffect(() => {
    backdropOpacity.value = withTiming(1, {
      duration: ANIMATION_DURATION,
      easing: Easing.linear,
    });
    return () => {
      backdropOpacity.value = withTiming(0, {
        duration: ANIMATION_DURATION,
        easing: Easing.linear,
      });
    };
    // It's safe to ignore backdropOpacity as it's stable from the hook.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Use style memoization for container/backdrop
  const styles = useMemo(
    () => makeStyles(position, insets),
    [position, insets]
  );

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  // Memoize dynamic styles to avoid inline style warnings
  const backdropStyle = useMemo(
    () => ({ backgroundColor: backdropColor }),
    [backdropColor]
  );

  const containerBackgroundStyle = useMemo(
    () =>
      !disableBlur
        ? { backgroundColor: 'transparent' }
        : { backgroundColor: blurFallbackColor },
    [disableBlur, blurFallbackColor]
  );

  const blurViewStyle = useMemo(
    () => ({ backgroundColor: blurFallbackColor }),
    [blurFallbackColor]
  );

  // If custom toast view is provided, simply render it inside the animated container
  if (toastView != null) {
    return (
      <>
        <AnimatedView
          entering={FadeIn.duration(ANIMATION_DURATION).easing(Easing.linear)}
          exiting={FadeOut.duration(ANIMATION_DURATION).easing(Easing.linear)}
          style={[styles.backdrop, backdropStyle, backdropAnimatedStyle]}
        />
        <AnimatedView
          entering={FadeIn.duration(ANIMATION_DURATION).easing(Easing.linear)}
          exiting={FadeOut.duration(ANIMATION_DURATION).easing(Easing.linear)}
          style={[styles.container, styles.containerCustom]}
        >
          {toastView}
        </AnimatedView>
      </>
    );
  }

  return (
    <>
      {/* Animated Backdrop */}
      <AnimatedView
        entering={FadeIn.duration(ANIMATION_DURATION).easing(Easing.linear)}
        exiting={FadeOut.duration(ANIMATION_DURATION).easing(Easing.linear)}
        style={[styles.backdrop, backdropStyle, backdropAnimatedStyle]}
      />
      <AnimatedView
        entering={FadeIn.duration(ANIMATION_DURATION).easing(Easing.linear)}
        exiting={FadeOut.duration(ANIMATION_DURATION).easing(Easing.linear)}
        style={[styles.container, containerBackgroundStyle]}
      >
        {/* Only show blur effect if enabled */}
        {!disableBlur && (
          <AnimatedBlurView
            intensity={blurIntensity}
            tint={blurType}
            style={[StyleSheet.absoluteFill, blurViewStyle]}
            entering={FadeIn.duration(ANIMATION_DURATION).easing(Easing.linear)}
            exiting={FadeOut.duration(ANIMATION_DURATION).easing(Easing.linear)}
          />
        )}
        {isSuccess && <TickIcon />}
        <Text numberOfLines={2} style={[styles.message, textStyle]}>
          {message}
        </Text>
        {isActionable && !!buttonText && (
          <Pressable style={styles.button} onPress={onButtonPress}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </Pressable>
        )}
      </AnimatedView>
    </>
  );
});

export default ToastView;

// useMemo outside of the component for style function, avoids recreation of StyleSheet for each render
const makeStyles = (
  position: 'top' | 'bottom',
  insets: { top: number; bottom: number }
) =>
  StyleSheet.create({
    backdrop: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
    },
    containerCustom: {
      backgroundColor: 'transparent',
      width: '90%',
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
      borderRadius: 0,
      paddingVertical: 0,
      paddingHorizontal: 0,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      gap: 0,
    },
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
      borderRadius: 8,
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
