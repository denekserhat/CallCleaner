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

// Engelleme modları için seçenekler
const BLOCK_MODES = [
  {
    id: 'all',
    title: 'Tüm Aramaları Engelle',
    description: 'Rehberde olmayan tüm numaralardan gelen aramaları engeller',
    icon: 'block',
  },
  {
    id: 'known',
    title: 'Sadece Bilinen Spam',
    description: 'Sadece spam olarak işaretlenmiş numaraları engeller',
    icon: 'report',
  },
  {
    id: 'custom',
    title: 'Kişiselleştirilmiş',
    description: 'Özel kurallarınıza göre aramaları engeller',
    icon: 'tune',
  },
];

// Çalışma saatleri için seçenekler
const WORKING_HOURS_MODES = [
  {
    id: '24/7',
    title: '7/24 Çalış',
    description: 'Spam engelleyici her zaman aktif olur',
    icon: 'schedule',
  },
  {
    id: 'custom',
    title: 'Özel Saatler',
    description: 'Belirlediğiniz saatler arasında çalışır',
    icon: 'timer',
  },
];

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
        {/* KATEGORİ: ENGELLEME AYARLARI */}
        <View style={styles.categoryContainer}>
          <View style={styles.categoryHeader}>
            <MaterialIcons name="security" size={22} color={colors.primary} />
            <Text style={styles.categoryTitle}>ENGELLEME AYARLARI</Text>
          </View>

          {/* Engelleme Modu */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Engelleme Modu</Text>
            <View style={styles.optionsList}>
              {BLOCK_MODES.map((mode) => (
                <TouchableOpacity
                  key={mode.id}
                  style={[
                    styles.radioOption,
                    blockMode === mode.id && styles.selectedOption,
                  ]}
                  onPress={() => handleBlockModeChange(mode.id as any)}>
                  <View style={styles.radioOptionContent}>
                    <View style={styles.radioOptionHeader}>
                      <View style={styles.radioButtonContainer}>
                        <View style={styles.radioOuter}>
                          {blockMode === mode.id && <View style={styles.radioInner} />}
                        </View>
                      </View>
                      <View style={styles.radioOptionTitleContainer}>
                        <MaterialIcons
                          name={mode.icon as any}
                          size={20}
                          color={blockMode === mode.id ? colors.primary : colors.text.secondary}
                          style={styles.optionIcon}
                        />
                        <Text style={[
                          styles.radioOptionTitle,
                          blockMode === mode.id && styles.selectedText,
                        ]}>
                          {mode.title}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.radioOptionDescription}>
                      {mode.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Çalışma Saatleri */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Çalışma Saatleri</Text>
            <View style={styles.optionsList}>
              {WORKING_HOURS_MODES.map((mode) => (
                <TouchableOpacity
                  key={mode.id}
                  style={[
                    styles.radioOption,
                    workingHours === mode.id && styles.selectedOption,
                  ]}
                  onPress={() => handleWorkingHoursChange(mode.id as any)}>
                  <View style={styles.radioOptionContent}>
                    <View style={styles.radioOptionHeader}>
                      <View style={styles.radioButtonContainer}>
                        <View style={styles.radioOuter}>
                          {workingHours === mode.id && <View style={styles.radioInner} />}
                        </View>
                      </View>
                      <View style={styles.radioOptionTitleContainer}>
                        <MaterialIcons
                          name={mode.icon as any}
                          size={20}
                          color={workingHours === mode.id ? colors.primary : colors.text.secondary}
                          style={styles.optionIcon}
                        />
                        <Text style={[
                          styles.radioOptionTitle,
                          workingHours === mode.id && styles.selectedText,
                        ]}>
                          {mode.title}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.radioOptionDescription}>
                      {mode.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}

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
        </View>

        {/* KATEGORİ: GENEL AYARLAR */}
        <View style={styles.categoryContainer}>
          <View style={styles.categoryHeader}>
            <MaterialIcons name="settings" size={22} color={colors.primary} />
            <Text style={styles.categoryTitle}>GENEL AYARLAR</Text>
          </View>

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
        </View>

        {/* KATEGORİ: GİZLİLİK */}
        <View style={styles.categoryContainer}>
          <View style={styles.categoryHeader}>
            <MaterialIcons name="privacy-tip" size={22} color={colors.primary} />
            <Text style={styles.categoryTitle}>GİZLİLİK</Text>
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
        </View>
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
  categoryContainer: {
    marginBottom: spacing.lg,
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    overflow: 'hidden',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    backgroundColor: colors.background.secondary,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray.light,
  },
  categoryTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: '700',
    color: colors.primary,
    marginLeft: spacing.xs,
    letterSpacing: 0.5,
  },
  section: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray.light,
    backgroundColor: colors.background.primary,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  optionsList: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  radioOption: {
    marginBottom: spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray.light,
    backgroundColor: colors.background.primary,
  },
  selectedOption: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  radioOptionContent: {
    padding: spacing.md,
  },
  radioOptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  radioButtonContainer: {
    marginRight: spacing.sm,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  radioOptionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    marginRight: spacing.xs,
  },
  radioOptionTitle: {
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
    fontWeight: '500',
  },
  selectedText: {
    color: colors.primary,
    fontWeight: '600',
  },
  radioOptionDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginLeft: 32,
  },
  timeContainer: {
    marginTop: spacing.sm,
    padding: spacing.md,
    backgroundColor: colors.background.primary,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  timeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
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
    backgroundColor: colors.background.secondary,
    borderRadius: 4,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    minWidth: 40,
    alignItems: 'center',
  },
  timeValue: {
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
  },
  timeColon: {
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
    marginHorizontal: spacing.xs,
  },
});

export default Settings;
