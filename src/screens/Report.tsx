import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors, typography, spacing} from '../theme';
import Header from '../components/common/Header';
import Button from '../components/common/Button';

type ReportProps = {
  navigation?: any;
};

// Spam türleri
const spamTypes = [
  {id: 'telemarketing', label: 'Telepazarlama'},
  {id: 'scam', label: 'Dolandırıcılık'},
  {id: 'annoying', label: 'Rahatsız Edici'},
  {id: 'other', label: 'Diğer'},
];

const Report: React.FC<ReportProps> = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedSpamType, setSelectedSpamType] = useState('');
  const [description, setDescription] = useState('');

  const handleBackPress = () => {
    navigation?.goBack();
  };

  const handleRecentCalls = () => {
    Alert.alert(
      'Son Aramalar',
      'Burada son aramalar listelenecek ve seçim yapılabilecek.',
      [{text: 'Tamam'}],
    );
  };

  const handleSubmit = () => {
    // Basit doğrulama
    if (!phoneNumber.trim()) {
      Alert.alert('Hata', 'Lütfen bir telefon numarası girin.');
      return;
    }

    if (!selectedSpamType) {
      Alert.alert('Hata', 'Lütfen spam türünü seçin.');
      return;
    }

    // Başarılı mesajı
    Alert.alert(
      'Teşekkürler!',
      'Raporunuz alındı.',
      [
        {
          text: 'Tamam',
          onPress: () => {
            // Form temizleme
            setPhoneNumber('');
            setSelectedSpamType('');
            setDescription('');
            // Ana sayfaya dönüş
            navigation?.navigate('Dashboard');
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Spam Bildir" showBackButton onBackPress={handleBackPress} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled">
          {/* Numara Giriş */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Numara Gir</Text>
            <View style={styles.phoneInputContainer}>
              <TextInput
                style={styles.phoneInput}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Örn: 0212 555 1234"
                keyboardType="phone-pad"
                maxLength={15}
                returnKeyType="done"
              />
              <TouchableOpacity
                style={styles.recentButton}
                onPress={handleRecentCalls}>
                <MaterialIcons
                  name="history"
                  size={24}
                  color={colors.primary}
                />
                <Text style={styles.recentButtonText}>Son Aramalar</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Spam Türü */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Spam Türü</Text>
            <View style={styles.spamTypeContainer}>
              {spamTypes.map(type => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.spamTypeButton,
                    selectedSpamType === type.id && styles.selectedSpamType,
                  ]}
                  onPress={() => setSelectedSpamType(type.id)}>
                  <Text
                    style={[
                      styles.spamTypeText,
                      selectedSpamType === type.id &&
                        styles.selectedSpamTypeText,
                    ]}>
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Açıklama (Opsiyonel) */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Açıklama (Opsiyonel)</Text>
            <TextInput
              style={styles.descriptionInput}
              value={description}
              onChangeText={text => {
                if (text.length <= 100) {
                  setDescription(text);
                }
              }}
              placeholder="Kısa bir açıklama ekleyin (max 100 karakter)"
              multiline
              maxLength={100}
              textAlignVertical="top"
            />
            <Text style={styles.charCounter}>{description.length}/100</Text>
          </View>

          {/* Gönder Butonu */}
          <View style={styles.buttonContainer}>
            <Button
              title="Gönder"
              variant="primary"
              onPress={handleSubmit}
              size="large"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  keyboardAvoid: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.md,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.gray.medium,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
  },
  recentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: spacing.sm,
    padding: spacing.xs,
  },
  recentButtonText: {
    color: colors.primary,
    marginLeft: spacing.xs,
    fontSize: typography.fontSize.sm,
  },
  spamTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  spamTypeButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.gray.medium,
    margin: spacing.xs,
    backgroundColor: colors.background.primary,
  },
  selectedSpamType: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  spamTypeText: {
    color: colors.text.primary,
  },
  selectedSpamTypeText: {
    color: colors.text.white,
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: colors.gray.medium,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.fontSize.md,
    minHeight: 100,
    color: colors.text.primary,
  },
  charCounter: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    textAlign: 'right',
    marginTop: spacing.xs,
  },
  buttonContainer: {
    marginVertical: spacing.lg,
  },
});

export default Report;
