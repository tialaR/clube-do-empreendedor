import {Linking, ToastAndroid} from 'react-native';

export function openWhatsapp({phone}: {phone: string | null | undefined}) {
  Linking.canOpenURL('whatsapp://send?text=Olá, tudo bem?')
    .then(supported => {
      if (supported) {
        return Linking.openURL(
          `whatsapp://send?phone=${phone}&text=Olá, tudo bem?`,
        );
      } else {
        return Linking.openURL(
          `https://api.whatsapp.com/send?phone=${phone}&text=Olá, tudo bem?`,
        );
      }
    })
    .catch(() => {
      ToastAndroid.show('Ocorreu algum erro', ToastAndroid.SHORT);
    });
}

export function openInstagram({
  instagram,
}: {
  instagram: string | null | undefined;
}) {
  Linking.canOpenURL(`instagram://user?username=${instagram}`)
    .then(supported => {
      if (supported) {
        return Linking.openURL(`instagram://user?username=${instagram}`);
      } else {
        return Linking.openURL(`https://www.instagram.com/${instagram}`);
      }
    })
    .catch(() => {
      ToastAndroid.show('Ocorreu algum erro', ToastAndroid.SHORT);
    });
}

export function openFacebook({
  facebook,
}: {
  facebook: string | null | undefined;
}) {
  Linking.canOpenURL(`fb://profile/${facebook}`)
    .then(supported => {
      if (supported) {
        return Linking.openURL(`fb://profile/${facebook}`);
      } else {
        return Linking.openURL(`https://www.facebook.com/${facebook}`);
      }
    })
    .catch(() => {
      ToastAndroid.show('Ocorreu algum erro', ToastAndroid.SHORT);
    });
}
