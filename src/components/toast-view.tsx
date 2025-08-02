import { BlurView } from 'expo-blur';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { Easing, FadeIn, FadeOut } from 'react-native-reanimated';
import TickIcon from '../assets/tick-icon';

interface ToastViewProps {
  message: string;
  isSuccess: boolean;
  isActionable: boolean;
  buttonText: string;
  onButtonPress: () => void;
}

const AnimatedView = Animated.createAnimatedComponent(View);

const ToastView = ({ message, isSuccess }: ToastViewProps) => {
  const styles = makeStyles();

  return (
    <AnimatedView
      entering={FadeIn.duration(300).easing(Easing.linear)}
      exiting={FadeOut.duration(300).easing(Easing.linear)}
      style={styles?.container}
    >
      <BlurView intensity={30} tint={'dark'} style={StyleSheet.absoluteFill} />
      {isSuccess && <TickIcon />}
      <Text numberOfLines={2} style={styles.message}>
        {message}
      </Text>
    </AnimatedView>
  );
};

export default ToastView;

const makeStyles = () =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 0,
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
      marginBottom: 52,
      flexDirection: 'row',
      gap: 12,
      minWidth: '40%',
      overflow: 'hidden',
    },
    message: {
      fontSize: 14,
      fontWeight: '500',
    },
  });
