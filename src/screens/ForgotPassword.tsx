import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors, typography, spacing} from '../theme';
import Button from '../components/common/Button';
import {forgotPassword} from '../services/authService'; // authService import edildi
import {ForgotPasswordDTO} from '../types/DTO'; // Gerekli DTO import edildi

type ForgotPasswordProps = {
  navigation?: any;
};

const ForgotPassword: React.FC<ForgotPasswordProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendResetLink = async () => {
    if (!email.trim()) {
      Alert.alert('Hata', 'Lütfen e-posta adresinizi girin.');
      return;
    }

    setIsLoading(true);
    try {
      const data: ForgotPasswordDTO = {email};
      await forgotPassword(data);

      // Başarılı istek sonrası kullanıcıya bilgi ver ve ResetPassword ekranına yönlendir
      Alert.alert(
        'E-posta Gönderildi',
        'Şifre sıfırlama talimatları e-posta adresinize gönderildi. Lütfen gelen kutunuzu kontrol edin.',
        [
          {
            text: 'Tamam',
            onPress: () => navigation?.navigate('ResetPassword', {email}), // E-postayı ResetPassword ekranına parametre olarak gönder
          },
        ],
      );
    } catch (error: any) {
      // console.error('Forgot Password error:', error);
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        'Şifre sıfırlama bağlantısı gönderilirken bir hata oluştu.';
      Alert.alert('İstek Başarısız', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBackToLogin = () => {
    navigation?.goBack(); // Önceki ekrana (muhtemelen Login) dön
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}>
        <View style={styles.container}>
          {/* Başlık */}
          <View style={styles.headerContainer}>
            <MaterialIcons name="lock-reset" size={60} color={colors.primary} />
            <Text style={styles.title}>Şifremi Unuttum</Text>
            <Text style={styles.subtitle}>
              Hesabınıza ait e-posta adresini girin, size şifre sıfırlama
              talimatlarını gönderelim.
            </Text>
          </View>

          {/* E-posta Formu */}
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <MaterialIcons
                name="email"
                size={20}
                color={colors.gray.medium}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="E-posta Adresi"
                placeholderTextColor={colors.gray.medium}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="done"
                onSubmitEditing={handleSendResetLink} // Enter ile gönder
              />
            </View>
          </View>

          {/* Sıfırlama Linki Gönder Butonu */}
          <Button
            title="Sıfırlama Linki Gönder"
            variant="primary"
            size="large"
            onPress={handleSendResetLink}
            style={styles.sendButton}
            disabled={isLoading}
            loading={isLoading}
          />

          {/* Giriş Yap Ekranına Dön Linki */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleGoBackToLogin}>
            <MaterialIcons name="arrow-back" size={18} color={colors.primary} />
            <Text style={styles.backButtonText}> Giriş Yap Ekranına Dön</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  formContainer: {
    width: '100%',
    marginBottom: spacing.lg, // Butonla arasında boşluk
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.gray.light,
  },
  inputIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: typography.fontSize.md,
    color: colors.text.primary,
  },
  sendButton: {
    marginTop: spacing.sm, // Adjusted margin
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  backButtonText: {
    color: colors.primary,
    fontSize: typography.fontSize.md,
    fontWeight: '500',
  },
});

export default ForgotPassword;
