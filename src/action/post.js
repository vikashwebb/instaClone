import database from '@react-native-firebase/database';
import {SET_POST, ERROR_POST} from './action.type';

export const getPosts = () => async dispatch => {
  console.log('get post hits');
  try {
    console.log('posts-------->', database().ref('/posts/'));
    database()
      .ref('/posts/')
      .once('value', snapshot => {
        console.log('user post', snapshot.val());
        if (snapshot.val()) {
          dispatch({
            type: SET_POST,
            payload: Object.values(snapshot.val()),
          });
        } else {
          dispatch({
            type: ERROR_POST,
            payload: [],
          });
        }
      });
  } catch (error) {
    console.log('post error', error);
  }
};
