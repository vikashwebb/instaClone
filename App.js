import React, {useEffect} from 'react';

import {Text} from 'react-native';
import 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

import {
  NavigationContainer,
  validatePathConfig,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {useDispatch, connect} from 'react-redux';

import AddPost from './src/screens/AddPost';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import Home from './src/screens/Home';
import CustomeHeader from './src/layout/CustomeHeader';
import {SET_USER, IS_AUTHENTICATED} from './src/action/action.type';
import database from '@react-native-firebase/database';
import EmptyContaner from './src/component/EmptyContainer';

import {requestPermission} from './src/utils/AskPermission';
import {ScreenStackHeaderCenterView} from 'react-native-screens';

import {SafeAreaView} from 'react-native';
import TabNavigatior from './src/component/TabsNavigator';

const Stack = createStackNavigator();

const App = ({authState}) => {
  const dispatch = useDispatch();

  const onAuthStateChange = user => {
    if (user) {
      dispatch({
        type: IS_AUTHENTICATED,
        payload: true,
      });
      console.log('user._user.uid ==  ===  == >>> >>', user);

      database()
        .ref(`/users/${user._user.uid}`)
        .once('value', snapshot => {
          // console.log('USER DATA asdfadf', snapshot);
          dispatch({
            type: SET_USER,
            payload: snapshot.val(),
          });
        });
    } else {
      console.log('onAuthStateChange else');
      dispatch({
        type: IS_AUTHENTICATED,
        payload: false,
      });
    }
  };

  useEffect(() => {
    requestPermission;
    const subsciber = auth().onAuthStateChanged(onAuthStateChange);
    console.log('subsciber subsciber', subsciber)
    return subsciber;
  }, []);

  if (authState.isLoading) {
    return <EmptyContaner />;
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          {authState.isAuthenticated ? (
            <>
              <Stack.Screen name="Home" component={TabNavigatior} options={{
                header: props => <CustomeHeader {...props} />,
                headerStyle: {
                  backgroundColor: 'white',
                },
              }} /> 
              <Stack.Screen name="AddPost" component={TabNavigatior} 
                options={{
                  header: props => null,
                }}
              />
              
            </>
          ) : (
            <>
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="SignUp" component={SignUp} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const mapStateToProps = state => ({
  authState: state.auth,
});

export default connect(mapStateToProps)(App);
