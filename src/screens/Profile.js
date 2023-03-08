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
import {getPosts} from '../action/post';
import propTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons'
import {connect, useStore} from 'react-redux';
const Profile = ({getPosts, postState, userDetails}) => {
    const[posts, setPosts] = useState([])
    const[myposts, setMyPosts] = useState([])
    useEffect(() => {
        getPosts();
        getMyPosts ();
        if(postState.post){
            setPosts(postState.post)
        }
      }, []);

      console.log('postState.post.length', posts)
      console.log('userDetails', userDetails) 
      const getMyPosts = () => {
        let newArray = posts.filter(post => post.userId == userDetails.uid )
        // console.log('newArray', newArray)
        setMyPosts(newArray)
    
      }
    return(
        <ScrollView>
            <View style={styles.profileHeader}>
                <TouchableOpacity>
                    <Icon name='caret-back' size={20} color='#000' />
                </TouchableOpacity>
                <View><Text>{userDetails.userName}</Text></View>
                <View>
                <TouchableOpacity>
                    <Icon name='ellipsis-vertical' size={20} color='#000' />
                </TouchableOpacity>
                </View>
            </View>
            <View>
                <View style={styles.profileImageWraper}>
                    <Image source={{uri: userDetails.image}} style={styles.profileImage} />
                    <View style={styles.userData}>
                        <Text style={styles.userName}> {userDetails.name} </Text>
                        <Text style={styles.userName}> {userDetails.bio} </Text>
                    </View>
                </View>
                <View>
                    <View>
                        <Text>Post</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}
const mapDispatchToProps = {
    getPosts,
  };
const mapStateToProps = state => ({
    userDetails: state.auth.user, 
    postState: state.post,
  });
  Profile.prototype = {
    getPosts: propTypes.func.isRequired,
    postState: propTypes.object.isRequired,
    userDetails: propTypes.object.isRequired,
  };

const styles = StyleSheet.create({
    userData:{
        paddingVertical: 10
    },
    userName:{
        fontSize: 13,
        color: '#000',
        textAlign: 'center'
    },
    profileHeader:{
        flexDirection: 'row' ,
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical:5
    },
    profileImage:{
        width: 100,
        height: 100,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 50,
        padding: 10,
        resizeMode: 'contain'
    },
    profileImageWraper:{
        justifyContent: 'center',
        alignItems: "center",
        paddingVertical: 10
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);