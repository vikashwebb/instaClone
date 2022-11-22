import {FirebaseDatabaseTypes} from '@react-native-firebase/database';
import React, {useState, useEffect, useReducer} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Share,
  Modal,
  ScrollView,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import database from '@react-native-firebase/database';

const Post = ({item, userDetail}) => {
  console.log('userDetails in post screen', userDetail);
  console.log('item in post screen', item);

  // console.log('Vote lenght in post screen', Object.keys(item.vote).length);

  const [commentPopup, setCommentPopup] = useState(false);
  const [userLike, setUserLike] = useState(false);
  const [likes, setLikes] = useState(item.likeCount);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Share this post',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const postLike = () => {
    database()
      .ref(`/posts/${item.id}/vote/${userDetail.uid}`)
      .set({
        like: 1,
      })
      .then(() => {
        console.log('post liked');
        setUserLike(true);
      });

    database()
      .ref(`/posts/${item.id}`)
      .update({
        likeCount: likes + 1,
      })
      .then(() => {
        console.log('likeCount +1');
      });
  };
  const postDislike = () => {
    database()
      .ref(`/posts/${item.id}/vote/${userDetail.uid}`)
      .set({
        dislike: 1,
      })
      .then(() => {
        console.log('post disliked');
        setUserLike(false);
      });
    database()
      .ref(`/posts/${item.id}`)
      .update({
        likeCount: likes - 1,
      })
      .then(() => {
        console.log('likeCount -1');
      });
  };

  useEffect(() => {
    const checkUser = item?.vote ? Object.keys(item?.vote) : null;

    console.log('item in useEffact', item);

    if (checkUser?.includes(userDetail?.uid)) {
      console.log('yes its matched');
      setUserLike(false);
    } else {
      setUserLike(false);
    }

    console.log('like count', item.likeCount);
    if (item?.vote) {
      console.log('if condtion');
      // let like = 0;
      Object.values(item.vote).map(val => {
        if (val.like) {
          setUserLike(false);
          console.log('like length', val.length);
          console.log('item.likeCount true', item.likeCount);

          // setLikes(item.likeCount);
        }
        if (val.dislike) {
          setUserLike(true);
          console.log('like length', val.length);

          // database()
          //   .ref(`/posts/${item.id}`)
          //   .update({
          //     likeCount: likes - 1,
          //   })
          //   .then(() => {
          //     console.log('likeCount -1');
          //   });
          console.log('item.likeCount false', item.likeCount);
        }
      });

      setLikes(item.likeCount);
      console.log('like count print -->>', likes);
    }
  }, [userLike]);
  return (
    <>
      <View style={styles.instaPost}>
        <View style={styles.userHeader}>
          <View style={styles.userHeaderLeft}>
            <Image source={{uri: item.userImage}} style={styles.userImage} />
            <View>
              <Text style={styles.userHeaderUserName}>{item.by}</Text>
              <Text style={styles.userHeaderUserLoacation}>
                {item.location}
              </Text>
            </View>
          </View>
          <View style={styles.userHeaderRight}>
            <IonIcon
              name="ellipsis-vertical-circle-outline"
              style={styles.userHeaderRightIcon}
            />
          </View>
        </View>
        <View>
          <Image source={{uri: item.picture}} style={styles.postImage} />
        </View>
        <View style={styles.actionSection}>
          <View style={styles.iconList}>
            {/* {item?.vote.} */}

            {userLike ? (
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => postDislike()}>
                <IonIcon
                  name="heart"
                  color="#FF0000"
                  style={styles.likedIcon}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => postLike()}>
                <IonIcon name="heart-outline" style={styles.actionIcons} />
              </TouchableOpacity>
            )}
            {/* <IonIcon name="heart-outline" style={styles.actionIcons} /> */}

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => setCommentPopup(true)}>
              <IonIcon
                name="chatbubble-ellipses-outline"
                style={styles.actionIcons}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => onShare()}>
              <IonIcon name="arrow-redo-outline" style={styles.actionIcons} />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.actionBtn}>
              <IonIcon name="bookmarks-outline" style={styles.actionIcons} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.contentSection}>
          <Text style={styles.contentLike}>
            {/* ---
            {item?.vote
              ? (item?.vote).includes(userDetail.uid)
                ? 'true'
                : 'false'
              : null}
            // --- */}
            {item.likeCount} Likes
          </Text>
          <Text style={styles.contentDis}>
            <Text style={styles.contentLike}>{item.by}</Text> {item.discription}
          </Text>
        </View>
      </View>

      {/* modal for comment */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={commentPopup}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!commentPopup);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => setCommentPopup(!commentPopup)}
              style={styles.backBtn}>
              <IonIcon name="chevron-back-outline" style={styles.backIcons} />
            </TouchableOpacity>
            <View>
              <Text style={styles.commentHeading}>Comments</Text>
            </View>
          </View>
          <ScrollView>
            <View style={styles.commentSection}>
              <View style={styles.commentSectionDis}>
                <Image
                  source={{uri: userDetail.image}}
                  style={styles.userImage}
                />
                <View>
                  <Text style={styles.userHeaderUserName}>
                    {item.by}{' '}
                    <Text style={styles.commentDis}>{item.discription}</Text>
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
          {/* <View style={styles.userHeaderLeft}>
              <Image
                source={{uri: userDetail.image}}
                style={styles.userImage}
              />
              <View>
                <Text style={styles.userHeaderUserName}>{item.by}</Text>
                <Text style={styles.userHeaderUserLoacation}>
                  {item.location}
                </Text>
              </View>
            </View> */}
        </View>
      </Modal>
    </>
  );
};

export default Post;

const styles = StyleSheet.create({
  commentSectionDis: {
    flexDirection: 'row',
  },
  commentDis: {
    fontWeight: 'normal',
    paddingLeft: 5,
  },
  commentSection: {
    width: '100%',
    // backgroundColor: '#ccc',
    justifyContent: 'flex-start',
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  commentHeading: {
    fontSize: 18,
    marginVertical: 10,
    color: '#000',
    fontWeight: 'bold',
  },
  backBtn: {
    position: 'absolute',
    left: 5,
    top: 7,
  },
  backIcons: {
    fontSize: 30,
    color: '#000',
  },
  modalHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
  },
  centeredView: {
    // marginTop: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  contentDis: {
    color: '#000',
    paddingVertical: 5,
  },
  contentSection: {
    marginHorizontal: 10,
  },
  contentLike: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  instaPost: {
    width: '100%',
    // backgroundColor: '#AEBDCA',
    marginVertical: 10,
  },
  userHeader: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userImage: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#405DE6',
    padding: 1,
  },
  userHeaderLeft: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  userHeaderUserName: {
    textAlignVertical: 'center',
    fontWeight: 'bold',
    color: '#000',
    fontSize: 14,
  },
  userHeaderUserLoacation: {
    fontSize: 12,
    color: '#000',
  },
  userHeaderRightIcon: {
    fontSize: 25,
  },
  postImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  actionSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconList: {
    flexDirection: 'row',
  },
  actionIcons: {
    fontSize: 30,
    color: '#000',
  },
  likedIcon: {
    fontSize: 30,
    color: '#ff0000',
  },
  actionBtn: {
    padding: 3,
    marginVertical: 5,
    paddingHorizontal: 7,
  },
});
