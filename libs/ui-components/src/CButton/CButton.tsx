import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacityProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

export interface CButtonProps extends TouchableOpacityProps {
  /** The text content of the button */
  title: string;
  /** Optional variant of the button */
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  /** Optional size of the button */
  size?: 'small' | 'medium' | 'large';
  /** Optional custom style for the button container */
  containerStyle?: StyleProp<ViewStyle>;
  /** Optional custom style for the button text */
  textStyle?: StyleProp<TextStyle>;
  /** Whether the button is in a loading state */
  loading?: boolean;
  /** Color of the loading spinner */
  loadingColor?: string;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Optional icon to show before the text */
  leftIcon?: React.ReactNode;
  /** Optional icon to show after the text */
  rightIcon?: React.ReactNode;
  /** Whether the button should take full width */
  fullWidth?: boolean;
  /** Optional border radius override */
  borderRadius?: number;
}

export function CButton({
  title,
  variant = 'primary',
  size = 'medium',
  containerStyle,
  textStyle,
  loading = false,
  loadingColor = '#ffffff',
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  borderRadius,
  onPress,
  ...restProps
}: CButtonProps) {
  const buttonStyles = [
    styles.base,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    borderRadius !== undefined && { borderRadius },
    disabled && styles.disabled,
    containerStyle,
  ];

  const textStyles = [
    styles.baseText,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...restProps}
    >
      {loading ? (
        <ActivityIndicator color={loadingColor} size="small" />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          <Text style={textStyles}>{title}</Text>
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  // Variants
  primary: {
    backgroundColor: '#007',
  },
  secondary: {
    backgroundColor: '#585',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007',
  },
  text: {
    backgroundColor: 'transparent',
  },
  // Sizes
  small: {
    height: 32,
    paddingHorizontal: 12,
  },
  medium: {
    height: 40,
    paddingHorizontal: 16,
  },
  large: {
    height: 48,
    paddingHorizontal: 20,
  },
  // Text base style
  baseText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  // Text variants
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#FFFFFF',
  },
  outlineText: {
    color: '#007AFF',
  },
  textText: {
    color: '#007AFF',
  },
  // Text sizes
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  // States
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    color: '#999999',
  },
  fullWidth: {
    width: '100%',
  },
});

export default CButton;
