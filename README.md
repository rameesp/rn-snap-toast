# rn-snap-toast

A modern, customizable toast component for **Expo** with beautiful blur effects, smooth animations, and a powerful queue system.

## ✨ Features

- 🎨 **Beautiful UI** - Modern design with blur effects and smooth animations
- 📱 **Expo Compatible** - Built specifically for Expo projects
- 🔄 **Queue System** - Handles multiple toasts with configurable queue size
- 🎯 **Flexible Positioning** - Show toasts at top or bottom of screen
- ⚡ **Performance Optimized** - Built with React Native Reanimated for smooth animations
- 🎛️ **Highly Configurable** - Customize duration, blur effects, and more
- 🔘 **Actionable Toasts** - Add buttons to toasts for user interaction
- ✅ **Success Indicators** - Built-in success state with tick icon
- 🛡️ **TypeScript Support** - Full TypeScript definitions included

## 📦 Installation

This package is designed specifically for **Expo** projects. Make sure you have an Expo project set up.

```sh
npm install rn-snap-toast
```

### Required Expo Dependencies

This library requires the following Expo dependencies:

```sh
npx expo install expo-blur react-native-reanimated react-native-screens react-native-svg
```

**Note:** This package is **Expo-only** and requires Expo's managed workflow or development builds. It is not compatible with bare React Native projects.

## 🚀 Quick Start

### 1. Wrap your app with ToastProvider

```tsx
import { ToastProvider } from 'rn-snap-toast';

export default function App() {
  return (
    <ToastProvider
      config={{
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
      }}
    >
      {/* Your app content */}
    </ToastProvider>
  );
}
```

### 2. Use the toast in your components

```tsx
import { useToast } from 'rn-snap-toast';

function MyComponent() {
  const { showToast } = useToast();

  const handleShowToast = () => {
    showToast({
      message: 'Hello, this is a toast message!',
      duration: 3000,
      position: 'bottom',
    });
  };

  return (
    <Button title="Show Toast" onPress={handleShowToast} />
  );
}
```

## 📖 API Reference

### ToastProvider

The main provider component that wraps your app and provides toast functionality.

#### Props

```tsx
interface ToastConfig {
  duration?: number;           // Default: 3000ms
  maxQueueSize?: number;       // Default: 10
  animationDuration?: number;  // Default: 300ms
  blurIntensity?: number;      // Default: 70
  blurType?: 'light' | 'dark'; // Default: 'dark'
  position?: 'top' | 'bottom'; // Default: 'bottom'
  insets?: {
    top: number;               // Default: 0
    bottom: number;            // Default: 0
  };
}
```

### useToast Hook

Returns the toast context with methods to show and hide toasts.

```tsx
const { showToast, hideToast, config, toastParams } = useToast();
```

### showToast

Displays a toast message with the specified configuration.

```tsx
interface ToastParams {
  message: string;                    // Required: The message to display
  duration?: number;                  // Optional: Duration in milliseconds
  isSuccess?: boolean;               // Optional: Show success tick icon
  isActionable?: boolean;            // Optional: Enable action button
  buttonText?: string;               // Optional: Text for action button
  position?: 'top' | 'bottom';      // Optional: Toast position
  onButtonPress?: () => void;       // Optional: Action button callback
  onFinish?: () => void;            // Optional: Called when toast finishes
}
```

## 🎯 Usage Examples

### Basic Toast

```tsx
const { showToast } = useToast();

showToast({
  message: 'This is a simple toast message',
});
```

### Success Toast

```tsx
showToast({
  message: 'Operation completed successfully!',
  isSuccess: true,
  duration: 4000,
});
```

### Actionable Toast

```tsx
showToast({
  message: 'Do you want to undo this action?',
  isActionable: true,
  buttonText: 'Undo',
  onButtonPress: () => {
    // Handle undo action
    console.log('Undo pressed');
  },
});
```

### Top Position Toast

```tsx
showToast({
  message: 'This toast appears at the top',
  position: 'top',
});
```

### Custom Duration

```tsx
showToast({
  message: 'This toast will show for 5 seconds',
  duration: 5000,
});
```

### Toast with Callback

```tsx
showToast({
  message: 'Processing your request...',
  onFinish: () => {
    console.log('Toast finished');
  },
});
```

## ⚙️ Configuration Options

### Global Configuration

```tsx
<ToastProvider
  config={{
    // Toast duration in milliseconds
    duration: 3000,
    
    // Maximum number of toasts in queue
    maxQueueSize: 5,
    
    // Animation duration in milliseconds
    animationDuration: 300,
    
    // Blur effect intensity (0-100)
    blurIntensity: 70,
    
    // Blur effect type
    blurType: 'dark', // 'light' | 'dark'
    
    // Default position for toasts
    position: 'bottom', // 'top' | 'bottom'
    
    // Safe area insets
    insets: {
      top: 24,
      bottom: 32,
    },
  }}
>
  {/* Your app */}
</ToastProvider>
```

## 🎨 Customization

### Styling

The toast component uses a modern design with:
- Blur background effect
- Rounded corners
- Subtle shadows
- Smooth fade in/out animations
- Success tick icon for success states
- Action buttons with iOS-style design

### Positioning

Toasts can be positioned at the top or bottom of the screen with configurable safe area insets.

### Queue System

The library includes a powerful queue system that:
- Handles multiple toasts sequentially
- Prevents queue overflow with configurable max size
- Processes toasts automatically
- Maintains smooth animations between toasts

## 🔧 Advanced Usage

### Programmatic Toast Control

```tsx
import { showToast, hideToast } from 'rn-snap-toast';

// Show toast from anywhere in your app
showToast({
  message: 'Toast from service',
  isSuccess: true,
});

// Hide current toast
hideToast();
```

### Multiple Toasts

The queue system automatically handles multiple toasts:

```tsx
const { showToast } = useToast();

// These will be queued and shown sequentially
showToast({ message: 'First toast' });
showToast({ message: 'Second toast' });
showToast({ message: 'Third toast' });
```

## 🛠️ Development

### Running the Example

```sh
# Install dependencies
yarn install

# Run the example app
yarn example
```

### Building

```sh
# Build the library
yarn prepare

# Type checking
yarn typecheck

# Linting
yarn lint
```

## 📄 License

MIT

---

Made with ❤️ by [Ramees P](https://github.com/rameesp)
