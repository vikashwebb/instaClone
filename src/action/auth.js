import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import database from '@react-native-firebase/database';
import {SET_USER} from './action.type';

export const singUp = data => async dispach => {
  const {name, userName, bio, email, password, country, image} = data;
  console.log('user data====>', data);

  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(res => {
      console.log('user data ', res);
      console.log('data.user', data);
      console.log('name', name);
      console.log('userName', userName);
      console.log('bio', bio);
      console.log('country', country);
      console.log('uid', res.user._user.uid);
      database()
        .ref('/users/' + res.user._user.uid)
        .set({
          name: name,
          userName: userName,
          bio: bio,
          country: country,
          image: image,
          uid: res.user._user.uid,
        })
        .then(() => {
          console.log('data set successfully ', data);

          // dispach(setUser());
          Snackbar.show({
            text: 'Account Created',
            textColor: '#fff',
            backgroundColor: 'green',
          });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(error => {
      console.log(error);
      Snackbar.show({
        text: 'singUp Failed',
        backgroundColor: 'red',
        textColor: '#fff',
      });
    });
};

export const singIn = data => async dispach => {
  console.log('login data', data);

  auth()
    .signInWithEmailAndPassword(data.email, data.password)
    .then(() => {
      Snackbar.show({
        text: 'signIn succesfull',
        textColor: '#fff',
        backgroundColor: 'green',
      });
    })
    .catch(error => {
      console.log(error);
      Snackbar.show({
        text: 'signIn failed',
        textColor: '#fff',
        backgroundColor: 'red',
      });
    });
};

export const singOut = () => async dispach => {
  console.log('signout funciton');
  auth()
    .signOut()
    .then(() => {
      Snackbar.show({
        text: 'signOut succesfull',
        textColor: '#fff',
        backgroundColor: 'green',
      });
    })
    .catch(error => {
      console.log(error);
      Snackbar.show({
        text: 'signOut failed',
        textColor: '#fff',
        backgroundColor: 'red',
      });
    });
};
