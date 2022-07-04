import {Linking, ToastAndroid} from 'react-native';

export function openWhatsapp() {
  Linking.canOpenURL('whatsapp://send?text=Olá, tudo bem?')
    .then(supported => {
      if (supported) {
        return Linking.openURL(
          'whatsapp://send?phone=557199999999&text=Olá, tudo bem?',
        );
      } else {
        return Linking.openURL(
          'https://api.whatsapp.com/send?phone=557199999999&text=Olá, tudo bem?',
        );
      }
    })
    .catch(() => {
      ToastAndroid.show('Ocorreu algum erro', ToastAndroid.SHORT);
    });
}

export function openInstagram() {
  Linking.canOpenURL('instagram://user?username=tiala_rocha')
    .then(supported => {
      if (supported) {
        return Linking.openURL('instagram://user?username=tiala_rocha');
      } else {
        return Linking.openURL('https://www.instagram.com/tiala_rocha');
      }
    })
    .catch(() => {
      ToastAndroid.show('Ocorreu algum erro', ToastAndroid.SHORT);
    });
}

export function openFacebook() {
  Linking.canOpenURL('fb://profile/tiktokbrasil.official')
    .then(supported => {
      if (supported) {
        return Linking.openURL('fb://profile/tiktokbrasil.official');
      } else {
        return Linking.openURL(
          'https://www.facebook.com/tiktokbrasil.official',
        );
      }
    })
    .catch(() => {
      ToastAndroid.show('Ocorreu algum erro', ToastAndroid.SHORT);
    });
}
