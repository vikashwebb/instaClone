import {PermissionsAndroid, ToastAndroid} from 'react-native';

export const requestPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);
    if (
      granted['android.permission.READ_EXTERNAL_STORAGE'] === 'denied' ||
      granted['android.permission.WRITE_EXTERNAL_STORAGE'] === 'denied'
    ) {
      ToastAndroid.show(
        'We Cannot proccess without the Permissions',
        ToastAndroid.LONG,
      ),
        requestPermission();
    }
  } catch (error) {
    console.log(error);
  }
};
