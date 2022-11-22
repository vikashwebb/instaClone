import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import storage from '@react-native-firebase/storage';
import ProgressBar from 'react-native-progress/Bar';

// import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Options} from '../utils/Options';

// redux
import propTypes from 'prop-types';
import {singUp} from '../action/auth';
import {connect, useStore} from 'react-redux';
import IonIcon from 'react-native-vector-icons/Ionicons';
const SingUp = ({navigation, singUp}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [country, setCountry] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState(
    'https://icons.iconarchive.com/icons/iconsmind/outline/512/Add-User-icon.png',
  );
  const [imageUploading, setImageUploading] = useState(false);
  const [uploadStatus, setUploadeStatus] = useState(null);
  const chooseImage = async () => {
    launchImageLibrary(Options, response => {
      if (response.didCancle) {
        console.log('user cancel the image picker');
      } else if (response.error) {
        console.log('image picker error => ', error);
      } else if (response.cutomeButton) {
        console.log('user tapped on custom button', response.cutomeButton);
      } else {
        console.log('choose image response', response);

        uploadeImage(response);
      }
    });
  };
  const uploadeImage = async response => {
    console.log('uploadeImage hits');
    setImageUploading(true);
    const reference = storage()
      .ref()
      .child(`/images/${Date.now}`)
      .putFile(response.assets[0].uri);
    console.log('referance uri', reference);
    // const task = reference.putFile(response.assets[0].path);

    reference.on(
      'state_changed',
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (progress === 100) console.log('Upload is ' + progress + '% done');
      },
      error => {
        console.log('error =>', error);
        // Handle unsuccessful uploads
      },
      () => {
        reference.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log('File available at', downloadURL);
          setImage(downloadURL);
          setImageUploading(false);
        });
      },
    );
  };

  const doSignUp = async () => {
    console.log('doSignUp function hits');
    singUp({name, userName, bio, country, email, password, image});
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageWrap}>
          <TouchableOpacity onPress={chooseImage}>
            <Image
              style={styles.userImage}
              source={{
                uri: image,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.welcomeContent}>
          <Text style={styles.welcome}>Welcome!</Text>
          <Text>Create your account</Text>
        </View>
        <View style={styles.formWrap}>
          <View style={styles.inputWrap}>
            <IonIcon
              style={styles.inputIcon}
              name="person-outline"
              color="#000"
            />
            <TextInput
              style={styles.input}
              value={name}
              placeholder="Name"
              onChangeText={text => setName(text)}
            />
          </View>
          <View style={styles.inputWrap}>
            <IonIcon
              style={styles.inputIcon}
              name="text-outline"
              color="#000"
            />
            <TextInput
              style={styles.input}
              value={userName}
              placeholder="User Name"
              onChangeText={text => setUserName(text)}
            />
          </View>
          <View style={styles.inputWrap}>
            <IonIcon
              style={styles.inputIcon}
              name="lock-closed-outline"
              color="#000"
            />
            <TextInput
              style={styles.input}
              value={password}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={text => setPassword(text)}
            />
          </View>
          <View style={styles.inputWrap}>
            <IonIcon
              style={styles.inputIcon}
              name="mail-outline"
              color="#000"
            />
            <TextInput
              style={styles.input}
              value={email}
              placeholder="E-Mail"
              onChangeText={text => setEmail(text)}
            />
          </View>
          <View style={styles.inputWrap}>
            <IonIcon
              style={styles.inputIcon}
              name="list-outline"
              color="#000"
            />
            <TextInput
              style={styles.input}
              value={bio}
              placeholder="Bio"
              onChangeText={text => setBio(text)}
            />
          </View>
          <View style={styles.inputWrap}>
            <IonIcon
              style={styles.inputIcon}
              name="flag-outline"
              color="#000"
            />
            <TextInput
              style={styles.input}
              value={country}
              placeholder="Country"
              onChangeText={text => setCountry(text)}
            />
          </View>
          <View style={styles.buttonWrap}>
            <TouchableOpacity style={styles.button} onPress={doSignUp}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.singUp}>
            <Text style={styles.singUpText}>I have an account</Text>
            <TouchableOpacity
              style={styles.singUpBtn}
              onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.singUpBtnText}>Sign-in here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const mapDispatchToProps = {
  singUp: data => singUp(data),
};

SingUp.propTypes = {
  singUp: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SingUp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  userImage: {
    width: 70,
    height: 70,
    resizeMode: 'cover',
  },
  imageWrap: {
    padding: 10,
    backgroundColor: '#fff',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  welcomeContent: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  welcome: {
    fontSize: 28,
    color: '#000',
  },
  inputWrap: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  input: {
    height: 40,
    padding: 10,
    width: '80%',
    height: 40,
    backgroundColor: '#fff',
    paddingLeft: 20,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
    elevation: 5,
    zIndex: 9,
    shadowColor: '#3AB4F2',
  },
  inputIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    color: '#3AB4F2',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    borderRadius: 30,
    marginRight: -10,
    shadowOffset: {width: 4, height: 4},
    shadowColor: '#3AB4F2',
    shadowOpacity: 3,
    shadowRadius: 3,
    elevation: 5,
    zIndex: 10,
  },
  buttonWrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3AB4F2',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  singUp: {
    // textAlign: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  singUpBtn: {
    marginHorizontal: 5,
  },
  singUpText: {
    fontWeight: 'bold',
  },
  singUpBtnText: {
    fontWeight: 'bold',
    color: '#3AB4F2',
  },
});
