import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors, typography, spacing} from '../../theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type HeaderProps = {
  title: string;
  showBackButton?: boolean;
  showSettingsButton?: boolean;
  onBackPress?: () => void;
  onSettingsPress?: () => void;
};

const Header: React.FC<HeaderProps> = ({
  title,
  showBackButton = false,
  showSettingsButton = false,
  onBackPress,
  onSettingsPress,
}) => {
  return (
    <View style={styles.container}>
      {showBackButton && (
        <TouchableOpacity style={styles.iconButton} onPress={onBackPress}>
          <MaterialIcons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
      )}

      <Text style={styles.title}>{title}</Text>

      {showSettingsButton && (
        <TouchableOpacity style={styles.iconButton} onPress={onSettingsPress}>
          <MaterialIcons name="settings" size={24} color={colors.text.primary} />
        </TouchableOpacity>
      )}

      {!showSettingsButton && <View style={styles.placeholder} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray.medium,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
    color: colors.text.primary,
  },
  placeholder: {
    width: 40,
  },
});

export default Header;
