import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedbackBase,
  ActivityIndicator,
} from 'react-native';
import propTypes from 'prop-types';
import {connect, useStore} from 'react-redux';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Snackbar from 'react-native-snackbar';
import ProgressBar from 'react-native-progress/Bar';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import {Options} from '../utils/Options';
import shortid from 'shortid';
import {utils} from '@react-native-firebase/app';
// import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const AddPost = ({navigation, userState}) => {
  console.log('userState.auth.user =>', userState.auth.user);
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [discription, setDiscription] = useState('');

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

  const addPost = async () => {
    try {
      if (!location || !discription || !image) {
        Snackbar.show({
          text: 'please Add all the photos',
          backgroundColor: 'red',
          textColor: '#fff',
        });
      }

      // console.log('userState asdf', userState.auth.user);

      const uid = shortid.generate();
      await database().ref(`/posts/${uid}`).set({
        location,
        discription,
        picture: image,
        by: userState.auth.user.name,
        date: Date.now(),
        userId: userState.auth.user.uid,
        userImage: userState.auth.user.image,
        id: uid,
        likeCount: 0,
      });
      console.log('post added success');
      navigation.navigate('Home');
    } catch (error) {
      console.log('add post error', error);
    }
  };

  return (
    <ScrollView style={styles.conatiner}>
      {/* {image && (
        <Image
          source={{uri: image}}
          style={styles.logoImg}
          resizeMode="center"
        />
      )} */}
      {image ? (
        <>
          <Image
            source={{uri: image}}
            style={styles.postImage}
            resizeMode="center"
          />
        </>
      ) : (
        <>
          <View>
            {imageUploading ? (
              <View style={styles.loaderSection}>
                <ActivityIndicator size="large" color="#3AB4F2" />
              </View>
            ) : (
              <TouchableOpacity
                style={styles.uploadeImageBtn}
                onPress={() => chooseImage()}>
                <IonIcon name="add-outline" style={styles.addIcon} />
              </TouchableOpacity>
            )}
          </View>
        </>
      )}

      {/* <Text>image text:- {image}</Text> */}
      <View style={styles.formWrap}>
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.input}
            value={location}
            placeholder="Add Location"
            onChangeText={text => setLocation(text)}
          />
        </View>
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.input}
            value={discription}
            placeholder="Discription"
            multiline={true}
            numberOfLines={4}
            onChangeText={text => setDiscription(text)}
          />
        </View>
        <View style={styles.buttonWrap}>
          <TouchableOpacity style={styles.button} onPress={() => addPost()}>
            <Text style={styles.buttonText}>Publish</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => ({
  userState: state,
});

AddPost.propTypes = {
  userState: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(AddPost);

const styles = StyleSheet.create({
  conatiner: {
    padding: 10,
  },
  uploadeImageBtn: {
    width: '100%',
    height: 150,
    backgroundColor: '#3AB4F225',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  addIcon: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#3AB4F2',
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  input: {
    padding: 10,
    width: '100%',
    backgroundColor: '#fff',
    paddingLeft: 20,
    elevation: 5,
    zIndex: 9,
    shadowColor: '#3AB4F2',
    textAlignVertical: 'top',
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
  formWrap: {
    marginVertical: 20,
  },
  postImage: {
    width: '100%',
    height: 200,
    resizeMode: 'center',
  },
  loaderSection: {
    width: '100%',
    height: 150,
    borderRadius: 5,
    backgroundColor: '#3AB4F225',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
