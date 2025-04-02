import React, {ReactNode} from 'react';
import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {colors, spacing} from '../../theme';

type CardProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: 'default' | 'elevated' | 'outlined';
};

const Card: React.FC<CardProps> = ({children, style, variant = 'default'}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'elevated':
        return styles.elevated;
      case 'outlined':
        return styles.outlined;
      default:
        return styles.default;
    }
  };

  return (
    <View style={[styles.container, getVariantStyle(), style]}>{children}</View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: spacing.md,
    backgroundColor: colors.background.card,
    marginVertical: spacing.sm,
  },
  default: {
    backgroundColor: colors.background.card,
  },
  elevated: {
    backgroundColor: colors.background.card,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  outlined: {
    backgroundColor: colors.background.card,
    borderWidth: 1,
    borderColor: colors.gray.medium,
  },
});

export default Card;
