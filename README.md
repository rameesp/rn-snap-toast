# rn-snap-toast

A modern, customizable toast component for **Expo** with beautiful blur effects, smooth animations, and a powerful queue system.

## ✨ Features

- 🎨 **Beautiful UI** - Modern design with blur effects and smooth animations
- 📱 **Expo Compatible** - Built specifically for Expo projects
- 🔄 **Queue System** - Handles multiple toasts with configurable queue size
- 🎯 **Flexible Positioning** - Show toasts at top or bottom of screen
- ⚡ **Performance Optimized** - Built with React Native Reanimated for smooth animations
- 🎛️ **Highly Configurable** - Customize duration, blur effects, text styles, and more
- 🔘 **Actionable Toasts** - Add buttons to toasts for user interaction
- ✅ **Success Indicators** - Built-in success state with tick icon
- 🛡️ **TypeScript Support** - Full TypeScript definitions included
- 🎨 **Custom Text Styling** - Customize text appearance with custom styles

## 📦 Installation

This package is designed specifically for **Expo** projects. Make sure you have an Expo project set up.

```sh
npm install rn-snap-toast
# or
yarn add rn-snap-toast
```

### Required Expo Dependencies

This library requires the following Expo dependencies:

```sh
npx expo install expo-blur react-native-reanimated react-native-screens react-native-svg
```

**Note:** This package is **Expo-only** and requires Expo's managed workflow or development builds. It is not compatible with bare React Native projects.

### Requirements

- Expo SDK >= 53.0.0
- React >= 18.0.0
- React Native >= 0.73.0
- Node >= 18.0.0

## 🚀 Quick Start

### 1. Wrap your app with ToastProvider

```tsx
import { ToastProvider } from 'rn-snap-toast';

export default function App() {
  return (
    <ToastProvider
      config={{
        duration: 2000,
        maxQueueSize: 5,
        animationDuration: 2000,
        blurIntensity: 70,
        blurType: 'dark',
        position: 'bottom',
        insets: {
          top: 24,
          bottom: 32,
        },
        textStyle: {
          color: 'white',
          fontSize: 14,
          fontWeight: '500',
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
  duration?: number;           // Default: 2000ms
  maxQueueSize?: number;       // Default: 10
  animationDuration?: number;  // Default: 2000ms
  blurIntensity?: number;      // Default: 70
  blurType?: 'light' | 'dark' | 'default'; // Default: 'dark'
  disableBlur?: boolean;       // Default: false
  blurFallbackColor?: string;  // Fallback color when blur is disabled
  backdropColor?: string;      // Background color for the toast
  borderRadius?: number;       // Border radius for the toast container
  position?: 'top' | 'bottom'; // Default: 'bottom'
  insets?: {
    top: number;               // Default: 0
    bottom: number;            // Default: 0
  };
  textStyle?: TextStyle;       // Default: undefined (uses default styles)
  toastView?: React.ReactNode; // Custom toast view component
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
  toastView?: React.ReactNode;       // Optional: Custom toast view component
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

### Custom Toast View per Toast

```tsx
showToast({
  message: 'Custom styled toast',
  toastView: (
    <View style={{ padding: 20, backgroundColor: 'purple' }}>
      <Text style={{ color: 'white' }}>Custom Content</Text>
    </View>
  ),
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

### Custom Text Styling

```tsx
// In ToastProvider config
<ToastProvider
  config={{
    textStyle: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
  }}
>
  {/* Your app */}
</ToastProvider>
```

### Custom Toast View

You can provide a completely custom toast view component:

```tsx
// In ToastProvider config
<ToastProvider
  config={{
    toastView: <CustomToastComponent />,
  }}
>
  {/* Your app */}
</ToastProvider>

// Or per-toast
showToast({
  message: 'Custom toast',
  toastView: <MyCustomView />,
});
```

### Disable Blur Effect

If you want to disable the blur effect and use a solid background:

```tsx
<ToastProvider
  config={{
    disableBlur: true,
    blurFallbackColor: 'rgba(0, 0, 0, 0.8)',
    backdropColor: 'rgba(0, 0, 0, 0.9)',
  }}
>
  {/* Your app */}
</ToastProvider>
```

### Custom Border Radius

```tsx
<ToastProvider
  config={{
    borderRadius: 20, // Custom border radius
  }}
>
  {/* Your app */}
</ToastProvider>
```

## ⚙️ Configuration Options

### Global Configuration

```tsx
<ToastProvider
  config={{
    // Toast duration in milliseconds
    duration: 2000,
    
    // Maximum number of toasts in queue
    maxQueueSize: 5,
    
    // Animation duration in milliseconds
    animationDuration: 2000,
    
    // Blur effect intensity (0-100)
    blurIntensity: 70,
    
    // Blur effect type
    blurType: 'dark', // 'light' | 'dark' | 'default'
    
    // Disable blur effect
    disableBlur: false,
    
    // Fallback color when blur is disabled
    blurFallbackColor: 'rgba(0, 0, 0, 0.8)',
    
    // Background color for the toast
    backdropColor: 'rgba(0, 0, 0, 0.9)',
    
    // Border radius for the toast container
    borderRadius: 12,
    
    // Default position for toasts
    position: 'bottom', // 'top' | 'bottom'
    
    // Safe area insets
    insets: {
      top: 24,
      bottom: 32,
    },
    
    // Custom text styling
    textStyle: {
      color: 'white',
      fontSize: 14,
      fontWeight: '500',
    },
    
    // Custom toast view component
    toastView: undefined,
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
- Customizable text styles

### Positioning

Toasts can be positioned at the top or bottom of the screen with configurable safe area insets.

### Queue System

The library includes a powerful queue system that:
- Handles multiple toasts sequentially
- Prevents queue overflow with configurable max size
- Processes toasts automatically
- Maintains smooth animations between toasts

### Text Styling

You can customize the text appearance using the `textStyle` property in the ToastProvider config:

```tsx
textStyle: {
  color: 'white',
  fontSize: 16,
  fontWeight: '600',
  fontFamily: 'System',
  textAlign: 'center',
}
```

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

### Service-Level Toast Calls

You can call toasts from services or utilities outside of React components:

```tsx
// In a service file
import { showToast } from 'rn-snap-toast';

export const apiService = {
  async fetchData() {
    try {
      const data = await fetch('/api/data');
      showToast({
        message: 'Data fetched successfully!',
        isSuccess: true,
      });
      return data;
    } catch (error) {
      showToast({
        message: 'Failed to fetch data',
        isActionable: true,
        buttonText: 'Retry',
        onButtonPress: () => this.fetchData(),
      });
    }
  },
};
```

## 🛠️ Development

### Running the Example

```sh
# Install dependencies
yarn install
# or
npm install

# Run the example app
yarn example
# or
npm run example
```

### Building

```sh
# Build the library
yarn build
# or
npm run build

# Type checking
yarn typecheck
# or
npm run typecheck

# Linting
yarn lint
# or
npm run lint

# Fix linting issues
yarn lint:fix
# or
npm run lint:fix
```

### Testing

```sh
# Run tests
yarn test
# or
npm test

# Run tests in watch mode
yarn test:watch
# or
npm run test:watch
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate and follow the existing code style.

## 📄 License

MIT

---

Made with ❤️ by [Ramees P](https://github.com/rameesp)
