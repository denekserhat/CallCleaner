import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors, typography, spacing} from '../theme';
import Header from '../components/common/Header';
import Button from '../components/common/Button';

type BlockedCallsProps = {
  navigation?: any;
};

// Engellenen bir çağrı için tip tanımı
type BlockedCall = {
  id: string;
  phoneNumber: string;
  date: string;
  time: string;
  callType?: string; // Opsiyonel, çağrı tipi tahmini (ör. "Telepazarlama")
};

const BlockedCalls: React.FC<BlockedCallsProps> = ({navigation}) => {
  // Örnek veri
  const blockedCalls: BlockedCall[] = [
    {
      id: '1',
      phoneNumber: '0212 555 1234',
      date: '01 Nisan 2023',
      time: '14:32',
      callType: 'Telepazarlama',
    },
    {
      id: '2',
      phoneNumber: '0533 123 4567',
      date: '01 Nisan 2023',
      time: '12:15',
      callType: 'Bilinmeyen',
    },
    {
      id: '3',
      phoneNumber: '0555 666 7788',
      date: '31 Mart 2023',
      time: '09:45',
      callType: 'Dolandırıcılık',
    },
    {
      id: '4',
      phoneNumber: '0212 333 2211',
      date: '30 Mart 2023',
      time: '16:20',
      callType: 'Telepazarlama',
    },
    {
      id: '5',
      phoneNumber: '0532 111 2233',
      date: '29 Mart 2023',
      time: '20:10',
      callType: 'Rahatsız Edici',
    },
  ];

  const handleBackPress = () => {
    navigation?.goBack();
  };

  const handleClearAll = () => {
    Alert.alert(
      'Tümünü Temizle',
      'Engellenen tüm çağrı kayıtları silinecek. Devam etmek istiyor musunuz?',
      [
        {text: 'İptal', style: 'cancel'},
        {
          text: 'Temizle',
          style: 'destructive',
          onPress: () => console.log('Tümü temizlendi'),
        },
      ],
    );
  };

  const handleLongPress = (item: BlockedCall) => {
    Alert.alert('İşlemler', `${item.phoneNumber} numarası için`, [
      {
        text: 'Beyaz Listeye Ekle',
        onPress: () => console.log('Beyaz listeye eklendi', item.phoneNumber),
      },
      {
        text: 'Detayları Gör',
        onPress: () => console.log('Detayları göster', item),
      },
      {text: 'İptal', style: 'cancel'},
    ]);
  };

  const handleReportWrong = (item: BlockedCall) => {
    Alert.alert(
      'Yanlış Engelleme Bildir',
      `${item.phoneNumber} numarası yanlışlıkla engellendi olarak işaretlenecek. Devam edilsin mi?`,
      [
        {text: 'İptal', style: 'cancel'},
        {
          text: 'Bildir',
          onPress: () =>
            console.log('Yanlış engelleme bildirildi', item.phoneNumber),
        },
      ],
    );
  };

  const renderItem = ({item}: {item: BlockedCall}) => (
    <TouchableOpacity
      style={styles.callItem}
      onLongPress={() => handleLongPress(item)}
      delayLongPress={500}>
      <View style={styles.callInfo}>
        <Text style={styles.phoneNumber}>{item.phoneNumber}</Text>
        <Text style={styles.callDate}>
          {item.date}, {item.time}
        </Text>
        {item.callType && (
          <View style={styles.callTypeContainer}>
            <Text style={styles.callType}>{item.callType}</Text>
          </View>
        )}
      </View>
      <TouchableOpacity
        style={styles.wrongButton}
        onPress={() => handleReportWrong(item)}>
        <MaterialIcons name="error" size={16} color={colors.danger} />
        <Text style={styles.wrongButtonText}>Yanlış mı?</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Son Engellenen Aramalar"
        showBackButton
        onBackPress={handleBackPress}
      />

      <View style={styles.container}>
        {blockedCalls.length > 0 ? (
          <FlatList
            data={blockedCalls}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <MaterialIcons name="block" size={64} color={colors.gray.medium} />
            <Text style={styles.emptyText}>Henüz engellenen arama yok</Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <Button
            title="Tümünü Temizle"
            onPress={handleClearAll}
            variant="outline"
            size="medium"
          />
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
    padding: spacing.md,
  },
  listContent: {
    paddingBottom: spacing.lg,
  },
  callItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray.medium,
  },
  callInfo: {
    flex: 1,
  },
  phoneNumber: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  callDate: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  callTypeContainer: {
    backgroundColor: colors.primaryLight,
    borderRadius: 4,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  callType: {
    fontSize: typography.fontSize.xs,
    color: colors.primary,
    fontWeight: '500',
  },
  wrongButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.xs,
  },
  wrongButtonText: {
    fontSize: typography.fontSize.sm,
    color: colors.danger,
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    fontSize: typography.fontSize.md,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  buttonContainer: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
  },
});

export default BlockedCalls;
