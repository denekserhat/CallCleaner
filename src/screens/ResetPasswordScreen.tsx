import React, {useState, useRef} from 'react';
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
import {resetPassword} from '../services/authService';
import {ResetPasswordDTO} from '../types/DTO';

type ResetPasswordProps = {
  navigation?: any;
  route?: any; // route parametresini almak için
};

const ResetPasswordScreen: React.FC<ResetPasswordProps> = ({
  navigation,
  route,
}) => {
  const email = route?.params?.email; // ForgotPassword ekranından gelen email
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Ref'ler
  const newPasswordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const handleResetPassword = async () => {
    if (!code.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    if (code.length !== 6) {
        Alert.alert('Hata', 'Doğrulama kodu 6 haneli olmalıdır.');
        return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Hata', 'Yeni şifreler eşleşmiyor.');
      return;
    }

     // Opsiyonel: Daha güçlü şifre kontrolü eklenebilir
    if (newPassword.length < 6) {
        Alert.alert('Hata', 'Yeni şifre en az 6 karakter olmalıdır.');
        return;
    }

    if (!email) {
      Alert.alert('Hata', 'E-posta adresi bulunamadı. Lütfen önceki adıma geri dönün.');
      return;
    }

    setIsLoading(true);
    try {
      const data: ResetPasswordDTO = {
        email,
        code,
        newPassword,
      };
      await resetPassword(data);

      Alert.alert(
        'Şifre Sıfırlandı',
        'Şifreniz başarıyla güncellendi. Şimdi yeni şifrenizle giriş yapabilirsiniz.',
        [{text: 'Giriş Yap', onPress: () => navigation?.navigate('Login')}],
      );
    } catch (error: any) {
      console.error('Reset Password error:', error);
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        'Şifre sıfırlanırken bir hata oluştu. Kodun doğruluğunu ve süresinin geçmediğini kontrol edin.';
      Alert.alert('Şifre Sıfırlama Başarısız', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

    const handleGoBack = () => {
        navigation?.goBack();
    };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
             <MaterialIcons name="password" size={60} color={colors.primary} />
            <Text style={styles.title}>Yeni Şifre Belirle</Text>
            <Text style={styles.subtitle}>
              E-postanıza gönderilen 6 haneli kodu ve yeni şifrenizi girin.
            </Text>
             {email && <Text style={styles.emailInfo}>E-posta: {email}</Text>}
          </View>

          <View style={styles.formContainer}>
            {/* Doğrulama Kodu */}
            <View style={styles.inputContainer}>
              <MaterialIcons name="pin" size={20} color={colors.gray.medium} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="6 Haneli Doğrulama Kodu"
                placeholderTextColor={colors.gray.medium}
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
                maxLength={6}
                returnKeyType="next"
                onSubmitEditing={() => newPasswordInputRef.current?.focus()}
              />
            </View>

            {/* Yeni Şifre */}
            <View style={styles.inputContainer}>
              <MaterialIcons name="lock" size={20} color={colors.gray.medium} style={styles.inputIcon} />
              <TextInput
                ref={newPasswordInputRef}
                style={styles.input}
                placeholder="Yeni Şifre"
                placeholderTextColor={colors.gray.medium}
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!passwordVisible}
                returnKeyType="next"
                onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
                style={styles.eyeIconContainer}>
                <MaterialIcons
                  name={passwordVisible ? 'visibility-off' : 'visibility'}
                  size={24}
                  color={colors.gray.dark}
                />
              </TouchableOpacity>
            </View>

            {/* Yeni Şifre Tekrar */}
            <View style={styles.inputContainer}>
              <MaterialIcons name="lock-outline" size={20} color={colors.gray.medium} style={styles.inputIcon} />
              <TextInput
                ref={confirmPasswordInputRef}
                style={styles.input}
                placeholder="Yeni Şifre Tekrar"
                placeholderTextColor={colors.gray.medium}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!confirmPasswordVisible}
                returnKeyType="done"
                onSubmitEditing={handleResetPassword}
              />
              <TouchableOpacity
                onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                style={styles.eyeIconContainer}>
                <MaterialIcons
                  name={confirmPasswordVisible ? 'visibility-off' : 'visibility'}
                  size={24}
                  color={colors.gray.dark}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Button
            title="Şifreyi Güncelle"
            variant="primary"
            size="large"
            onPress={handleResetPassword}
            style={styles.resetButton}
            disabled={isLoading}
            loading={isLoading}
          />

          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
             <MaterialIcons name="arrow-back" size={18} color={colors.text.secondary} />
            <Text style={styles.backButtonText}> Geri Dön</Text>
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
    marginBottom: spacing.xl, // Daha kompakt görünüm için azaltıldı
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
    marginBottom: spacing.sm, // E-posta bilgisi için boşluk
  },
  emailInfo: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.lg, // Form ile arasında boşluk
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    marginBottom: spacing.md,
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
  eyeIconContainer: {
    padding: spacing.sm,
  },
  resetButton: {
    marginTop: spacing.lg,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
    paddingBottom: spacing.md,
  },
   backButtonText: {
    color: colors.text.secondary, // Geri dön butonu daha az belirgin
    fontSize: typography.fontSize.md,
    fontWeight: '500',
  },
});

export default ResetPasswordScreen; 