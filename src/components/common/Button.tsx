import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import {colors, typography, spacing} from '../../theme';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
}) => {
  const getContainerStyle = () => {
    const variantStyle = {
      primary: styles.primaryContainer,
      secondary: styles.secondaryContainer,
      outline: styles.outlineContainer,
      danger: styles.dangerContainer,
    }[variant];

    const sizeStyle = {
      small: styles.smallContainer,
      medium: styles.mediumContainer,
      large: styles.largeContainer,
    }[size];

    return [
      styles.container,
      variantStyle,
      sizeStyle,
      disabled && styles.disabledContainer,
      style,
    ];
  };

  const getTextStyle = () => {
    const variantStyle = {
      primary: styles.primaryText,
      secondary: styles.secondaryText,
      outline: styles.outlineText,
      danger: styles.dangerText,
    }[variant];

    const sizeStyle = {
      small: styles.smallText,
      medium: styles.mediumText,
      large: styles.largeText,
    }[size];

    return [
      styles.text,
      variantStyle,
      sizeStyle,
      disabled && styles.disabledText,
      textStyle,
    ];
  };

  return (
    <TouchableOpacity
      style={getContainerStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}>
      {leftIcon && !loading && leftIcon}

      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' ? colors.primary : colors.text.white}
        />
      ) : (
        <Text style={getTextStyle()}>{title}</Text>
      )}

      {rightIcon && !loading && rightIcon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  primaryContainer: {
    backgroundColor: colors.primary,
  },
  secondaryContainer: {
    backgroundColor: colors.secondary,
  },
  outlineContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  dangerContainer: {
    backgroundColor: colors.danger,
  },
  smallContainer: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  mediumContainer: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  largeContainer: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  disabledContainer: {
    opacity: 0.5,
  },
  text: {
    textAlign: 'center',
    fontWeight: '600',
  },
  primaryText: {
    color: colors.text.white,
  },
  secondaryText: {
    color: colors.text.white,
  },
  outlineText: {
    color: colors.primary,
  },
  dangerText: {
    color: colors.text.white,
  },
  smallText: {
    fontSize: typography.fontSize.sm,
  },
  mediumText: {
    fontSize: typography.fontSize.md,
  },
  largeText: {
    fontSize: typography.fontSize.lg,
  },
  disabledText: {
    color: colors.text.disabled,
  },
});

export default Button;
