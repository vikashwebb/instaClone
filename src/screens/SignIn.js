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

import propTypes from 'prop-types';
import {singIn} from '../action/auth';
import {connect, useStore} from 'react-redux';
import IonIcon from 'react-native-vector-icons/Ionicons';

const SignIn = ({navigation, singIn}) => {
  const [image, setImage] = useState(
    'https://img.icons8.com/ios/452/guest-male.png',
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const doSignIn = () => {
    singIn({email, password});
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageWrap}>
          <Image
            style={styles.userImage}
            source={{
              uri: image,
            }}
          />
        </View>
        <View style={styles.welcomeContent}>
          <Text style={styles.welcome}>Welcome!</Text>
          <Text>Login your account</Text>
        </View>
        <View style={styles.formWrap}>
          <View style={styles.inputWrap}>
            <IonIcon
              style={styles.inputIcon}
              name="text-outline"
              color="#000"
            />
            <TextInput
              style={styles.input}
              value={email}
              placeholder="User Name"
              onChangeText={text => setEmail(text)}
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
          <View style={styles.buttonWrap}>
            <TouchableOpacity style={styles.button} onPress={() => doSignIn()}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.singUp}>
            <Text style={styles.singUpText}>Don't have an account?</Text>
            <TouchableOpacity
              style={styles.singUpBtn}
              onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.singUpBtnText}>Sign up here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const mapDispatchToProps = {
  singIn: data => singIn(data),
};

singIn.propTypes = {
  singIn: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SignIn);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  userImage: {
    width: 50,
    height: 50,
  },
  imageWrap: {
    padding: 10,
    backgroundColor: '#fff',
    width: 70,
    height: 70,
    borderRadius: 35,
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
