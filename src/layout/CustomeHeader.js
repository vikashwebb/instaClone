import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {Header} from 'react-native-elements';
import {connect} from 'react-redux';
import protoType from 'prop-types';
import {singOut} from '../action/auth';
import IonIcon from 'react-native-vector-icons/Ionicons';

const CustomeHeader = ({navigation, singOut, authState}) => {
  return (
    // <Header
    //   leftComponent={{icon: 'menu', color: '#fff'}}
    //   centerComponent={{text: 'MY TITLE', style: {color: '#fff'}}}
    //   rightComponent={{icon: 'home', color: '#fff'}}
    // />
    <View style={styles.header}>
      <View>
        <Image
          style={styles.logoImg}
          // source={require('../assets/insta-logo.png')}
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png',
          }}
        />
      </View>
      <View style={styles.rightSection}>
        {authState.isAuthenticated && (
          <>
            <TouchableOpacity onPress={() => navigation.navigate('AddPost')}>
              <IonIcon name="add-circle-outline" style={styles.topIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => singOut()}>
              <IonIcon name="log-out-outline" style={styles.topIcon} />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};
const mapStateToProps = state => ({
  authState: state.auth,
});
const mapDispatchToProps = {
  singOut,
};

CustomeHeader.prototype = {
  singOut: protoType.func.isRequired,
  authState: protoType.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomeHeader);

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ccc',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  logoImg: {
    width: 150,
    height: 60,
    resizeMode: 'center',
  },
  rightSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topIcon: {
    fontSize: 30,
    color: '#000',
    padding: 8,
  },
});
