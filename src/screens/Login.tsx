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
import {login} from '../services/authService';
import {storeAccessToken, storeRefreshToken} from '../services/tokenService';

type LoginProps = {
  navigation?: any; // Veya daha spesifik bir tip kullanılabilir
};

const Login: React.FC<LoginProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Hata', 'Lütfen e-posta ve şifrenizi girin.');
      return;
    }

    // API'den dönen yanıtın tipini varsayalım (gerçek tipe göre güncelleyin)
    type LoginResponse = {
      userId: number; // veya string, API'ye göre ayarlayın
      fullName: string;
      accessToken: string; // 'token' yerine 'accessToken' oldu
      refreshToken: string;
      // Diğer kullanıcı bilgileri...
    };

    setIsLoading(true);
    try {
      const response = await login({email, password});
      const loginData = response as LoginResponse; // Tip dönüşümü

      if (loginData && loginData.accessToken && loginData.refreshToken) {
        // Access ve Refresh token'ları sakla
        await storeAccessToken(loginData.accessToken);
        await storeRefreshToken(loginData.refreshToken);

        // Başarılı girişte Dashboard'a yönlendir
        navigation?.replace('Dashboard'); // replace ile geri dönemez
      } else {
        // Token yoksa veya başka bir sorun varsa
        Alert.alert(
          'Giriş Başarısız',
          'Token bilgileri alınamadı veya geçersiz yanıt.',
        );
      }
    } catch (error: any) {
      console.error('Login error:', error);
      // API'den gelen hata mesajını göstermeye çalış
      const errorMessage = error.response?.data?.error || 'Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.';
      Alert.alert('Giriş Başarısız', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigation?.navigate('ForgotPassword'); // Şifremi Unuttum ekranına yönlendirme (oluşturulmalı)
  };

  const handleSignUp = () => {
    navigation?.navigate('Register'); // Kayıt Ol ekranına yönlendirme (oluşturulmalı)
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}>
        <View style={styles.container}>
          {/* Logo ve Başlık */}
          <View style={styles.headerContainer}>
            <MaterialIcons
              name="security" // Veya uygulamanın ana ikonunu kullanın
              size={80}
              color={colors.primary}
            />
            <Text style={styles.title}>SpamKilit'e Giriş Yap</Text>
            <Text style={styles.subtitle}>
              Hesabınıza erişmek için bilgilerinizi girin.
            </Text>
          </View>

          {/* Giriş Formu */}
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
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()} // Sonraki input'a odaklan
              />
            </View>

            <View style={styles.inputContainer}>
              <MaterialIcons
                name="lock"
                size={20}
                color={colors.gray.medium}
                style={styles.inputIcon}
              />
              <TextInput
                ref={passwordInputRef} // Ref atama
                style={styles.input}
                placeholder="Şifre"
                placeholderTextColor={colors.gray.medium}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!passwordVisible}
                returnKeyType="done"
                onSubmitEditing={handleLogin} // Enter ile giriş yap
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

            <TouchableOpacity
              style={styles.forgotPasswordButton}
              onPress={handleForgotPassword}>
              <Text style={styles.forgotPasswordText}>Şifremi Unuttum?</Text>
            </TouchableOpacity>
          </View>

          {/* Giriş Butonu */}
          <Button
            title="Giriş Yap"
            variant="primary"
            size="large"
            onPress={handleLogin}
            style={styles.loginButton}
            disabled={isLoading}
            loading={isLoading}
          />

          {/* Kayıt Ol Linki */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Hesabınız yok mu? </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={styles.signUpLink}>Kayıt Ol</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Ref için yardımcı (TextInput'a odaklanmak için)
const passwordInputRef = React.createRef<TextInput>();

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
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: spacing.lg,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: typography.fontSize.sm,
    fontWeight: '500',
  },
  loginButton: {
    marginTop: spacing.sm, // Adjusted margin
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xl,
    paddingBottom: spacing.md, // Added padding at the bottom
  },
  signUpText: {
    color: colors.text.secondary,
    fontSize: typography.fontSize.md,
  },
  signUpLink: {
    color: colors.primary,
    fontSize: typography.fontSize.md,
    fontWeight: 'bold',
  },
});

export default Login; 