# CallCleaner
Kendiniz 1 numarayı engelleyebilirsiniz.
Ama toplu şekilde 10bin numarayı engelleyebiliriz.


CallCleaner, istenmeyen aramaları arkaplanda otomatik olarak tespit edip engelleyen React Native tabanlı bir mobil uygulamadır. Kullanıcıları rahatsız edici spam aramalardan korumak ve telefon deneyimini iyileştirmek için tasarlanmıştır.

## 🌟 Özellikler

- 📱 İstenmeyen aramaları otomatik tespit ve engelleme
- 🔍 Şüpheli numaraları gerçek zamanlı analiz etme
- 📊 Spam numara veritabanı ile entegrasyon
- 📝 Engellenen aramalar için detaylı raporlama
- ⚡ Düşük sistem kaynağı kullanımı
- 🔒 Gizlilik odaklı tasarım

## 🚀 Planlanan Özellikler

- [ ] Yapay zeka destekli spam çağrı tespiti
- [ ] Topluluk tabanlı spam numara raporlama sistemi
- [ ] Özelleştirilebilir engelleme kuralları
- [ ] Sesli mesaj filtreleme
- [ ] Çoklu dil desteği

## 🛠️ Teknik Detaylar

### Gereksinimler
- Android 6.0 ve üzeri / iOS 12 ve üzeri
- İzinler:
  - Telefon durumunu okuma (Android)
  - Çağrıları yönetme (Android)
  - CallKit entegrasyonu (iOS)
  - İnternet erişimi

### Kullanılan Teknolojiler
- React Native
- TypeScript
- React Navigation
- Async Storage
- React Native Permissions
- React Native Background Tasks
- CallKit (iOS)
- Phone Call Broadcast Receiver (Android)

## 💻 Kurulum

```bash
# Repository'yi klonlayın
git clone https://github.com/denekserhat/CallCleaner.git

# Proje dizinine gidin
cd CallCleaner

# Bağımlılıkları yükleyin
npm install

# iOS için pod kurulumu (macOS gereklidir)
npx pod-install

# Uygulamayı çalıştırın
npm run android  # Android için
# veya
npm run ios      # iOS için
```

## 📱 Uygulama Yapısı

src/
├── assets/         # Görseller, fontlar ve diğer statik dosyalar
├── components/     # Yeniden kullanılabilir UI bileşenleri
├── navigation/     # Router ve navigasyon yapılandırması
├── screens/        # Uygulama ekranları
├── services/       # API ve yerel servisler
├── store/          # Durum yönetimi
├── theme/          # Stil sabitleri ve temalar
└── utils/          # Yardımcı fonksiyonlar ve kütüphaneler

## 📝 Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

Projeye katkıda bulunmak istiyorsanız:

1. Bu repository'yi fork edin
2. Yeni bir feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. Bir Pull Request oluşturun

## 📞 İletişim

Serhat Denek - [@denekserhat](https://github.com/denekserhat)

Proje Linki: [https://github.com/denekserhat/CallCleaner](https://github.com/denekserhat/CallCleaner)