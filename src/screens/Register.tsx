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
import {register} from '../services/authService'; // authService import edildi
import {RegisterRequestDTO} from '../types/DTO'; // Gerekli DTO import edildi

type RegisterProps = {
  navigation?: any;
};

const Register: React.FC<RegisterProps> = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Ref'ler input alanları arasında geçiş için
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const handleRegister = async () => {
    if (!fullName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Hata', 'Şifreler eşleşmiyor.');
      return;
    }

    // Opsiyonel: Daha güçlü şifre kontrolü eklenebilir
    if (password.length < 6) {
        Alert.alert('Hata', 'Şifre en az 6 karakter olmalıdır.');
        return;
    }

    setIsLoading(true);
    try {
      const userData: RegisterRequestDTO = {fullName, email, password};
      await register(userData);

      // Başarılı kayıt sonrası kullanıcıya bilgi ver ve Login'e yönlendir
      Alert.alert(
        'Kayıt Başarılı',
        'Hesabınız oluşturuldu. Lütfen e-postanızı kontrol ederek hesabınızı onaylayın ve ardından giriş yapın.',
        [{text: 'Tamam', onPress: () => navigation?.navigate('Login')}],
      );
      // Veya direkt Login'e yönlendirme: navigation?.replace('Login');
    } catch (error: any) {
      // console.error('Register error:', error);
      const errorMessage =
        error.response?.data?.error || // API'den gelen hata mesajı
        error.response?.data?.message || // Alternatif hata mesajı formatı
        'Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin.';
      Alert.alert('Kayıt Başarısız', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToLogin = () => {
    navigation?.navigate('Login'); // Giriş Yap ekranına yönlendirme
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}>
        <View style={styles.container}>
          {/* Başlık */}
          <View style={styles.headerContainer}>
             <MaterialIcons name="person-add" size={60} color={colors.primary} />
            <Text style={styles.title}>Hesap Oluştur</Text>
            <Text style={styles.subtitle}>
              SpamKilit'e katılmak için bilgilerinizi girin.
            </Text>
          </View>

          {/* Kayıt Formu */}
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <MaterialIcons name="person" size={20} color={colors.gray.medium} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Tam Adınız"
                placeholderTextColor={colors.gray.medium}
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />
            </View>

            <View style={styles.inputContainer}>
              <MaterialIcons name="email" size={20} color={colors.gray.medium} style={styles.inputIcon} />
              <TextInput
                ref={emailInputRef}
                style={styles.input}
                placeholder="E-posta Adresi"
                placeholderTextColor={colors.gray.medium}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
            </View>

            <View style={styles.inputContainer}>
              <MaterialIcons name="lock" size={20} color={colors.gray.medium} style={styles.inputIcon} />
              <TextInput
                ref={passwordInputRef}
                style={styles.input}
                placeholder="Şifre"
                placeholderTextColor={colors.gray.medium}
                value={password}
                onChangeText={setPassword}
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

             <View style={styles.inputContainer}>
              <MaterialIcons name="lock-outline" size={20} color={colors.gray.medium} style={styles.inputIcon} />
              <TextInput
                ref={confirmPasswordInputRef}
                style={styles.input}
                placeholder="Şifre Tekrar"
                placeholderTextColor={colors.gray.medium}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!confirmPasswordVisible}
                returnKeyType="done"
                onSubmitEditing={handleRegister} // Enter ile kayıt ol
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

          {/* Kayıt Ol Butonu */}
          <Button
            title="Kayıt Ol"
            variant="primary"
            size="large"
            onPress={handleRegister}
            style={styles.registerButton}
            disabled={isLoading}
            loading={isLoading}
          />

          {/* Giriş Yap Linki */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Zaten hesabınız var mı? </Text>
            <TouchableOpacity onPress={handleGoToLogin}>
              <Text style={styles.loginLink}>Giriş Yap</Text>
            </TouchableOpacity>
          </View>
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
    marginBottom: spacing.xl, // Biraz azaltıldı
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
    marginBottom: spacing.lg, // Biraz azaltıldı
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
  registerButton: {
      marginTop: spacing.lg, // Yukarıdaki boşluk ayarlandı
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  loginText: {
    color: colors.text.secondary,
    fontSize: typography.fontSize.md,
  },
  loginLink: {
    color: colors.primary,
    fontSize: typography.fontSize.md,
    fontWeight: 'bold',
  },
});

export default Register; 