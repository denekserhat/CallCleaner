import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors, typography, spacing} from '../theme';
import Header from '../components/common/Header';
import Card from '../components/common/Card';
import Switch from '../components/common/Switch';
import Button from '../components/common/Button';
import {getBlockedCallsStats} from '../services/blockedCallsService';

type DashboardProps = {
  navigation?: any; // Navigation tipini ekleyecek olursak daha sonra yapacağız
};

const Dashboard: React.FC<DashboardProps> = ({navigation}) => {
  const [isActive, setIsActive] = useState(true);
  const [stats, setStats] = useState({today: 0, thisWeek: 0, total: 0});
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoadingStats(true);
        const fetchedStats = await getBlockedCallsStats();
        setStats(fetchedStats);
      } catch (error) {
        console.error('İstatistikler çekilirken hata:', error);
        // Hata yönetimi (örn: kullanıcıya mesaj gösterme)
      } finally {
        setLoadingStats(false);
      }
    };

    if (isActive) {
      // Sadece aktifken istatistik çek
      fetchStats();
    } else {
      // Switch kapalıysa istatistikleri sıfırla veya cache'den göster
      setStats({today: 0, thisWeek: 0, total: 0});
      setLoadingStats(false);
    }
  }, [isActive]); // isActive değiştiğinde tekrar çek

  const handleSettingsPress = () => {
    navigation?.navigate('Settings');
  };

  const handleBlockedCallsPress = () => {
    navigation?.navigate('BlockedCalls');
  };

  const handleReportPress = () => {
    navigation?.navigate('Report');
  };

  const handleGoToLogin = () => {
    navigation?.navigate('Login'); // Login ekranına git
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="SpamKilit"
        showSettingsButton
        onSettingsPress={handleSettingsPress}
      />

      <View style={styles.container}>
        <View style={styles.contentContainer}>
          {/* Spam Engelleme Switch'i - Daha vurgulu hale getirildi */}
          <View
            style={[
              styles.spamControlContainer,
              !isActive && styles.spamControlContainerInactive,
            ]}>
            <View style={styles.spamSwitchRow}>
              <MaterialIcons
                name={isActive ? 'shield' : 'gpp-maybe'}
                size={24}
                color={isActive ? colors.primary : colors.danger}
              />
              <View style={styles.spamTextContainer}>
                <Switch
                  value={isActive}
                  onValueChange={setIsActive}
                  label="Spam Engelleme"
                  description={isActive ? 'Koruma aktif' : 'Koruma kapalı!'}
                  containerStyle={styles.switchContainer}
                />
              </View>
            </View>
          </View>

          {/* İstatistik Paneli - Yeniden düzenlendi */}
          <Card
            variant="elevated"
            style={[styles.statsCard, !isActive && styles.disabledCard]}>
            <View
              style={[
                styles.iconContainer,
                !isActive && styles.disabledIconContainer,
              ]}>
              <MaterialIcons
                name="verified-user"
                size={60}
                color={isActive ? colors.primary : colors.text.disabled}
              />
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text
                  style={[styles.statValue, !isActive && styles.disabledText]}>
                  {loadingStats ? '...' : stats.today}
                </Text>
                <Text
                  style={[styles.statLabel, !isActive && styles.disabledLabel]}>
                  Bugün
                </Text>
              </View>

              <View
                style={[
                  styles.statDivider,
                  !isActive && styles.disabledDivider,
                ]}
              />

              <View style={styles.statItem}>
                <Text
                  style={[styles.statValue, !isActive && styles.disabledText]}>
                  {loadingStats ? '...' : stats.thisWeek}
                </Text>
                <Text
                  style={[styles.statLabel, !isActive && styles.disabledLabel]}>
                  Bu Hafta
                </Text>
              </View>

              <View
                style={[
                  styles.statDivider,
                  !isActive && styles.disabledDivider,
                ]}
              />

              <View style={styles.statItem}>
                <Text
                  style={[styles.statValue, !isActive && styles.disabledText]}>
                  {loadingStats ? '...' : stats.total}
                </Text>
                <Text
                  style={[styles.statLabel, !isActive && styles.disabledLabel]}>
                  Toplam
                </Text>
              </View>
            </View>
          </Card>

          {/* Hızlı Erişim Butonları */}
          <View style={styles.buttonsContainer}>
            <Button
              title="Son Engellenenler"
              onPress={handleBlockedCallsPress}
              variant="outline"
              disabled={!isActive}
              leftIcon={
                <MaterialIcons
                  name="history"
                  size={18}
                  color={isActive ? colors.primary : colors.text.disabled}
                  style={styles.buttonIcon}
                />
              }
              style={styles.button}
            />

            <Button
              title="Raporla"
              onPress={handleReportPress}
              variant="primary"
              disabled={!isActive}
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

          {/* !!! GEÇİCİ TEST BUTONU !!! */}
          <Button
            title="Login Ekranına Git (Test)"
            onPress={handleGoToLogin}
            variant="outline"
            style={styles.testButton} // Yeni stil ekleyelim
          />
          {/* !!! GEÇİCİ TEST BUTONU BİTİŞ !!! */}
        </View>

        {/* Bilgilendirme Kartı - En alta sabitlendi */}
        <Card
          variant="outlined"
          style={[styles.infoCard, !isActive && styles.disabledCard]}>
          <View style={styles.infoRow}>
            <MaterialIcons
              name="info"
              size={24}
              color={isActive ? colors.secondary : colors.text.disabled}
            />
            <Text style={[styles.infoText, !isActive && styles.disabledText]}>
              Arkaplanda çalışarak yapay zeka desteğiyle tespit edilen spam
              aramalarını engeller.
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
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
  },
  infoCard: {
    marginTop: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
    marginLeft: spacing.sm,
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
  },
  spamControlContainer: {
    marginBottom: spacing.md,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: spacing.sm,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  spamControlContainerInactive: {
    backgroundColor: '#FFF1F0',
    borderLeftColor: colors.danger,
  },
  spamSwitchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spamTextContainer: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  switchContainer: {
    paddingVertical: 0,
  },
  statsCard: {
    marginBottom: spacing.lg,
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
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: spacing.sm,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  statValue: {
    fontSize: typography.fontSize.xxxl,
    fontWeight: '700',
    color: colors.primary,
  },
  statLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: colors.gray.light,
    alignSelf: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  button: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  buttonIcon: {
    marginRight: spacing.xs,
  },
  testButton: {
    marginTop: spacing.lg,
    borderColor: colors.warning,
  },
  disabledCard: {
    backgroundColor: '#F5F5F5',
    opacity: 0.7,
  },
  disabledIconContainer: {
    backgroundColor: '#E0E0E0',
  },
  disabledText: {
    color: colors.text.disabled,
  },
  disabledLabel: {
    color: colors.text.disabled,
  },
  disabledDivider: {
    backgroundColor: '#E0E0E0',
  },
});

export default Dashboard;
