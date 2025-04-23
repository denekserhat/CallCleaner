import {NavigationContainerRef, CommonActions} from '@react-navigation/native';
import * as React from 'react';

// RootStackParamList'i App.tsx'den import etmek daha iyi olurdu ama döngüsel bağımlılık
// yaratmamak için şimdilik any kullanabilir veya tipleri ayrı bir dosyaya taşıyabiliriz.
// En basit yaklaşım için any kullanalım.
export const navigationRef = React.createRef<NavigationContainerRef<any>>();

/**
 * Belirtilen ekrana gider.
 * @param name Gidilecek ekranın adı.
 * @param params Ekrana gönderilecek parametreler.
 */
function navigate(name: string, params?: object) {
  navigationRef.current?.navigate(name, params);
}

/**
 * Navigasyon geçmişini sıfırlayarak belirtilen ekrana gider.
 * Genellikle Login ekranına dönerken kullanılır.
 * @param routeName Gidilecek ekranın adı.
 */
function resetRoot(routeName: string = 'Login') {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: routeName}],
    }),
  );
}

/**
 * Bir önceki ekrana döner.
 */
function goBack() {
  navigationRef.current?.goBack();
}

// Diğer navigasyon eylemleri (push, replace vb.) buraya eklenebilir.

export default {
  navigate,
  resetRoot,
  goBack,
};
