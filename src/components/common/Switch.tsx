import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch as RNSwitch,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {colors, typography, spacing} from '../../theme';

type SwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
};

const Switch: React.FC<SwitchProps> = ({
  value,
  onValueChange,
  label,
  description,
  disabled = false,
  containerStyle,
  labelStyle,
  descriptionStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.textContainer}>
        {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
        {description && (
          <Text style={[styles.description, descriptionStyle]}>
            {description}
          </Text>
        )}
      </View>
      <View
        style={[
          styles.switchBorder,
          {borderColor: value ? colors.primary : colors.gray.medium},
        ]}>
        <RNSwitch
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
          trackColor={{false: colors.gray.dark, true: colors.primaryLight}}
          thumbColor={value ? colors.primary : colors.gray.light}
          ios_backgroundColor={colors.gray.dark}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  textContainer: {
    flex: 1,
    marginRight: spacing.md,
  },
  label: {
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  switchBorder: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 1,
    backgroundColor: 'transparent',
  },
});

export default Switch;
