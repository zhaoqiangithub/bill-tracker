/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const neon = '#9FE870';
const charcoal = '#050607';

export const Colors = {
  light: {
    text: '#F7FFF2',
    background: charcoal,
    tint: neon,
    icon: '#8A968E',
    tabIconDefault: '#3C433F',
    tabIconSelected: neon,
    primary: neon,
    accent: '#74D34A',
    surface: '#0D110F',
    card: '#151B18',
    border: '#1F2622',
    muted: '#9AA5A0',
  },
  dark: {
    text: '#F7FFF2',
    background: charcoal,
    tint: neon,
    icon: '#8A968E',
    tabIconDefault: '#3C433F',
    tabIconSelected: neon,
    primary: neon,
    accent: '#74D34A',
    surface: '#0D110F',
    card: '#151B18',
    border: '#1F2622',
    muted: '#9AA5A0',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
