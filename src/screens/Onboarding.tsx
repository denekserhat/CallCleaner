import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors, typography, spacing} from '../theme';
import Button from '../components/common/Button';

type OnboardingProps = {
  navigation?: any;
};

// Onboarding adımları
type Step = {
  id: 'welcome' | 'permissions' | 'ready';
  title: string;
  description: string;
  icon?: string;
  permissions?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
};

const STEPS: Step[] = [
  {
    id: 'welcome',
    title: 'Hoş Geldiniz!',
    description: 'Spam aramalardan kurtulun. Size en iyi korumayı sunuyoruz.',
    icon: 'security',
  },
  {
    id: 'permissions',
    title: 'İzinler',
    description:
      'Uygulamamızın çalışması için telefonunuzdaki bazı izinlere ihtiyacımız var.',
    permissions: [
      {
        title: 'Arama erişimi',
        description: 'Spam aramaları tespit etmek ve engellemek için gerekli',
        icon: 'call',
      },
      {
        title: 'Telefon durumu',
        description: 'Gelen çağrıları takip etmek için gerekli',
        icon: 'phonelink-ring',
      },
    ],
  },
  {
    id: 'ready',
    title: 'Hazır!',
    description:
      'Spam engelleme şimdi aktif. Ayarları kişiselleştirmek için Ana Ekrana gidin.',
    icon: 'check-circle',
  },
];

const Onboarding: React.FC<OnboardingProps> = ({navigation}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    // Ana ekrana yönlendirme
    navigation?.navigate('Dashboard');
  };

  const handlePermissionRequest = () => {
    Alert.alert(
      'İzin Talebi',
      'Gerçek bir uygulamada burada izinler istenecek.',
      [{text: 'Anladım'}],
    );
  };

  const renderStepContent = () => {
    const step = STEPS[currentStep];

    switch (step.id) {
      case 'welcome':
        return (
          <View style={styles.stepContent}>
            <View style={styles.iconContainer}>
              <MaterialIcons
                name={step.icon || 'help'}
                size={100}
                color={colors.primary}
              />
            </View>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepDescription}>{step.description}</Text>
          </View>
        );

      case 'permissions':
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepDescription}>{step.description}</Text>

            <View style={styles.permissionsContainer}>
              {step.permissions?.map((permission, index) => (
                <View key={index} style={styles.permissionItem}>
                  <MaterialIcons
                    name={permission.icon}
                    size={36}
                    color={colors.primary}
                    style={styles.permissionIcon}
                  />
                  <View style={styles.permissionTextContainer}>
                    <Text style={styles.permissionTitle}>
                      {permission.title}
                    </Text>
                    <Text style={styles.permissionDescription}>
                      {permission.description}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        );

      case 'ready':
        return (
          <View style={styles.stepContent}>
            <View style={styles.iconContainer}>
              <MaterialIcons
                name={step.icon || 'help'}
                size={100}
                color={colors.primary}
              />
            </View>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepDescription}>{step.description}</Text>
          </View>
        );

      default:
        return null;
    }
  };

  const renderButton = () => {
    const step = STEPS[currentStep];

    switch (step.id) {
      case 'welcome':
        return (
          <Button
            title="Devam"
            variant="primary"
            size="large"
            onPress={handleNext}
          />
        );

      case 'permissions':
        return (
          <Button
            title="İzin Ver"
            variant="primary"
            size="large"
            onPress={() => {
              handlePermissionRequest();
              handleNext();
            }}
          />
        );

      case 'ready':
        return (
          <Button
            title="Başla"
            variant="primary"
            size="large"
            onPress={handleFinish}
          />
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>{renderStepContent()}</View>

        <View style={styles.footer}>
          <View style={styles.paginationContainer}>
            {STEPS.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  index === currentStep && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>

          <View style={styles.buttonsContainer}>
            {currentStep > 0 && (
              <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <MaterialIcons
                  name="arrow-back"
                  size={24}
                  color={colors.text.secondary}
                />
              </TouchableOpacity>
            )}
            <View style={styles.primaryButtonContainer}>{renderButton()}</View>
          </View>
        </View>
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
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  stepContent: {
    width: '100%',
    alignItems: 'center',
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  stepTitle: {
    fontSize: typography.fontSize.xxl,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  stepDescription: {
    fontSize: typography.fontSize.lg,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  permissionsContainer: {
    width: '100%',
    marginTop: spacing.md,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.background.card,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gray.light,
  },
  permissionIcon: {
    marginRight: spacing.md,
  },
  permissionTextContainer: {
    flex: 1,
  },
  permissionTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  permissionDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
  },
  footer: {
    padding: spacing.lg,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.gray.medium,
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: colors.primary,
    width: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  primaryButtonContainer: {
    flex: 1,
  },
});

export default Onboarding;
