import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors, typography, spacing} from '../theme';
import Header from '../components/common/Header';
import Card from '../components/common/Card';
import Switch from '../components/common/Switch';
import Button from '../components/common/Button';

type DashboardProps = {
  navigation?: any; // Navigation tipini ekleyecek olursak daha sonra yapacağız
};

const Dashboard: React.FC<DashboardProps> = ({navigation}) => {
  const [isActive, setIsActive] = useState(true);

  // Örnek veriler
  const blockedToday = 5;
  const blockedWeekly = 23;
  const blockedTotal = 142;

  const handleSettingsPress = () => {
    navigation?.navigate('Settings');
  };

  const handleBlockedCallsPress = () => {
    navigation?.navigate('BlockedCalls');
  };

  const handleReportPress = () => {
    navigation?.navigate('Report');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="SpamKilit"
        showSettingsButton
        onSettingsPress={handleSettingsPress}
      />

      <View style={styles.container}>
        {/* İstatistik Paneli */}
        <Card variant="elevated" style={styles.statsCard}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="block" size={60} color={colors.primary} />
          </View>

          <Text style={styles.statsPrimaryText}>
            Bugün Engellenen Aramalar:{' '}
            <Text style={styles.highlighted}>{blockedToday}</Text>
          </Text>

          <Text style={styles.statsSecondaryText}>
            Bu Hafta: <Text style={styles.highlighted}>{blockedWeekly}</Text> |
            Toplam: <Text style={styles.highlighted}>{blockedTotal}</Text>
          </Text>
        </Card>

        {/* Hızlı Kontroller */}
        <View style={styles.controlsContainer}>
          <Switch
            value={isActive}
            onValueChange={setIsActive}
            label="Spam Engelleme"
            description={isActive ? 'Koruma aktif' : 'Koruma devre dışı'}
          />

          <View style={styles.buttonsContainer}>
            <Button
              title="Son Engellenenler"
              onPress={handleBlockedCallsPress}
              variant="outline"
              leftIcon={
                <MaterialIcons
                  name="history"
                  size={18}
                  color={colors.primary}
                  style={styles.buttonIcon}
                />
              }
              style={styles.button}
            />

            <Button
              title="Raporla"
              onPress={handleReportPress}
              variant="primary"
              leftIcon={
                <MaterialIcons
                  name="report"
                  size={18}
                  color="white"
                  style={styles.buttonIcon}
                />
              }
              style={styles.button}
            />
          </View>
        </View>

        {/* Bilgilendirme Kartı */}
        <Card variant="outlined" style={styles.infoCard}>
          <View style={styles.infoRow}>
            <MaterialIcons name="info" size={24} color={colors.secondary} />
            <Text style={styles.infoText}>
              Uygulama arkaplanda çalışarak spam aramalarını engeller.
            </Text>
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  container: {
    flex: 1,
    padding: spacing.md,
  },
  statsCard: {
    marginTop: spacing.md,
    alignItems: 'center',
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  statsPrimaryText: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  statsSecondaryText: {
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
  },
  highlighted: {
    fontWeight: '700',
    color: colors.primary,
  },
  controlsContainer: {
    marginTop: spacing.lg,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  button: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  buttonIcon: {
    marginRight: spacing.xs,
  },
  infoCard: {
    marginTop: spacing.lg,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
});

export default Dashboard;
