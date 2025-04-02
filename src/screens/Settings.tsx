import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors, typography, spacing} from '../theme';
import Header from '../components/common/Header';
import Switch from '../components/common/Switch';

type SettingsProps = {
  navigation?: any;
};

// Zaman dilimleri için seçenekler
const HOURS = Array.from({length: 24}, (_, i) => String(i).padStart(2, '0'));
const MINUTES = ['00', '15', '30', '45'];

const Settings: React.FC<SettingsProps> = ({navigation}) => {
  // Ayarlar durumları
  const [blockMode, setBlockMode] = useState<'all' | 'known' | 'custom'>('all');
  const [workingHours, setWorkingHours] = useState<'24/7' | 'custom'>('24/7');
  const [startHour, setStartHour] = useState('09');
  const [startMinute, setStartMinute] = useState('00');
  const [endHour, setEndHour] = useState('18');
  const [endMinute, setEndMinute] = useState('00');
  const [showNotifications, setShowNotifications] = useState(true);

  const handleBackPress = () => {
    navigation?.goBack();
  };

  const handleBlockModeChange = (mode: 'all' | 'known' | 'custom') => {
    setBlockMode(mode);
  };

  const handleWorkingHoursChange = (hours: '24/7' | 'custom') => {
    setWorkingHours(hours);
  };

  const handleWhiteListPress = () => {
    Alert.alert(
      'Beyaz Liste',
      'Burada rehberden numara ekleyebileceksiniz.',
      [{text: 'Tamam', onPress: () => console.log('Beyaz Liste ekranı açılacak')}],
    );
  };

  const handlePrivacyPress = () => {
    Alert.alert(
      'Veri ve Gizlilik',
      'Burada veri kullanımı ve izinler hakkında bilgi yer alacak.',
      [{text: 'Tamam', onPress: () => console.log('Gizlilik ekranı açılacak')}],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Ayarlar" showBackButton onBackPress={handleBackPress} />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Engelleme Modu */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Engelleme Modu</Text>
          <View style={styles.optionsList}>
            <TouchableOpacity
              style={[
                styles.optionItem,
                blockMode === 'all' && styles.selectedOption,
              ]}
              onPress={() => handleBlockModeChange('all')}>
              <Text style={styles.optionText}>Tümü</Text>
              {blockMode === 'all' && (
                <MaterialIcons name="check" size={24} color={colors.primary} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionItem,
                blockMode === 'known' && styles.selectedOption,
              ]}
              onPress={() => handleBlockModeChange('known')}>
              <Text style={styles.optionText}>Sadece Bilinen Spam</Text>
              {blockMode === 'known' && (
                <MaterialIcons name="check" size={24} color={colors.primary} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionItem,
                blockMode === 'custom' && styles.selectedOption,
              ]}
              onPress={() => handleBlockModeChange('custom')}>
              <Text style={styles.optionText}>Kişiselleştirilmiş</Text>
              {blockMode === 'custom' && (
                <MaterialIcons name="check" size={24} color={colors.primary} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Çalışma Saatleri */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Çalışma Saatleri</Text>
          <View style={styles.optionsList}>
            <TouchableOpacity
              style={[
                styles.optionItem,
                workingHours === '24/7' && styles.selectedOption,
              ]}
              onPress={() => handleWorkingHoursChange('24/7')}>
              <Text style={styles.optionText}>7/24</Text>
              {workingHours === '24/7' && (
                <MaterialIcons name="check" size={24} color={colors.primary} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionItem,
                workingHours === 'custom' && styles.selectedOption,
              ]}
              onPress={() => handleWorkingHoursChange('custom')}>
              <Text style={styles.optionText}>Özel Saatler</Text>
              {workingHours === 'custom' && (
                <MaterialIcons name="check" size={24} color={colors.primary} />
              )}
            </TouchableOpacity>

            {workingHours === 'custom' && (
              <View style={styles.timeContainer}>
                <View style={styles.timeSelector}>
                  <Text style={styles.timeLabel}>Başlangıç:</Text>
                  <View style={styles.timePicker}>
                    <TouchableOpacity
                      style={styles.timeValueContainer}
                      onPress={() => {
                        const currentIndex = HOURS.indexOf(startHour);
                        const nextIndex = (currentIndex + 1) % HOURS.length;
                        setStartHour(HOURS[nextIndex]);
                      }}>
                      <Text style={styles.timeValue}>{startHour}</Text>
                    </TouchableOpacity>
                    <Text style={styles.timeColon}>:</Text>
                    <TouchableOpacity
                      style={styles.timeValueContainer}
                      onPress={() => {
                        const currentIndex = MINUTES.indexOf(startMinute);
                        const nextIndex = (currentIndex + 1) % MINUTES.length;
                        setStartMinute(MINUTES[nextIndex]);
                      }}>
                      <Text style={styles.timeValue}>{startMinute}</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.timeSelector}>
                  <Text style={styles.timeLabel}>Bitiş:</Text>
                  <View style={styles.timePicker}>
                    <TouchableOpacity
                      style={styles.timeValueContainer}
                      onPress={() => {
                        const currentIndex = HOURS.indexOf(endHour);
                        const nextIndex = (currentIndex + 1) % HOURS.length;
                        setEndHour(HOURS[nextIndex]);
                      }}>
                      <Text style={styles.timeValue}>{endHour}</Text>
                    </TouchableOpacity>
                    <Text style={styles.timeColon}>:</Text>
                    <TouchableOpacity
                      style={styles.timeValueContainer}
                      onPress={() => {
                        const currentIndex = MINUTES.indexOf(endMinute);
                        const nextIndex = (currentIndex + 1) % MINUTES.length;
                        setEndMinute(MINUTES[nextIndex]);
                      }}>
                      <Text style={styles.timeValue}>{endMinute}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Beyaz Liste */}
        <TouchableOpacity
          style={styles.section}
          onPress={handleWhiteListPress}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Beyaz Liste</Text>
            <MaterialIcons name="chevron-right" size={24} color={colors.text.secondary} />
          </View>
          <Text style={styles.sectionDescription}>
            Engellenmesini istemediğiniz numaralar
          </Text>
        </TouchableOpacity>

        {/* Bildirimler */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bildirimler</Text>
          <Switch
            value={showNotifications}
            onValueChange={setShowNotifications}
            label="Engellenen aramalar için bildirim göster"
            description="Bir arama engellendiğinde size bildirim göndeririz"
          />
        </View>

        {/* Veri ve Gizlilik */}
        <TouchableOpacity
          style={styles.section}
          onPress={handlePrivacyPress}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionTitle}>Veri ve Gizlilik</Text>
            <MaterialIcons name="chevron-right" size={24} color={colors.text.secondary} />
          </View>
          <Text style={styles.sectionDescription}>
            Kullanılan veriler ve izinler hakkında bilgi
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
  section: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray.light,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  sectionDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionsList: {
    marginTop: spacing.sm,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray.light,
  },
  selectedOption: {
    backgroundColor: colors.background.secondary,
  },
  optionText: {
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
  },
  timeContainer: {
    marginTop: spacing.sm,
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    padding: spacing.sm,
  },
  timeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: spacing.xs,
  },
  timeLabel: {
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
    width: 80,
  },
  timePicker: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeValueContainer: {
    backgroundColor: colors.background.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.gray.medium,
  },
  timeValue: {
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
    width: 24,
    textAlign: 'center',
  },
  timeColon: {
    fontSize: typography.fontSize.lg,
    color: colors.text.primary,
    marginHorizontal: spacing.xs,
  },
});

export default Settings;
