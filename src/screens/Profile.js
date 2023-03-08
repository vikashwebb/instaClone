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
import Micon from 'react-native-vector-icons/MaterialIcons'
import {connect, useStore} from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
const Profile = ({getPosts, postState, userDetails}) => {
    const[posts, setPosts] = useState([])
    const[myposts, setMyPosts] = useState([])
    console.log('postState.post.length', posts)
    console.log('userDetails', userDetails) 
    const getMyPosts = () => {
    let newArray = posts.filter(post => post.userId == userDetails.uid )
    // console.log('newArray', newArray)
    setMyPosts(newArray)
    }
    useEffect(() => {
    getPosts();
    getMyPosts ();
    if(postState.post){
        setPosts(postState.post)
    }
    },[]);
    return(
        <ScrollView>
            <View style={styles.topSection}>
                <View style={styles.profileHeader}>
                    <TouchableOpacity>
                        <Micon name='arrow-back-ios' size={20} color='#000' />
                    </TouchableOpacity>
                    {/* <View><Text>{userDetails.userName}</Text></View> */}
                    <View>
                    <TouchableOpacity>
                        <Micon name='vertical-distribute' size={20} color='#000' />
                    </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <View style={styles.profileImageWraper}>
                        <Image source={{uri: userDetails.image}} style={styles.profileImage} />
                        <View style={styles.userData}>
                            <Text style={styles.userName}> {userDetails.name} <Micon name='verified' size={18} color='#2c9cdb' /> </Text>
                            <Text style={styles.userBio}> {userDetails.userName} </Text>
                        </View>
                    </View>
                    <View style={styles.dataSection}>
                        <View style={styles.dataSectionInner}>
                            <Text style={styles.dataSectionTitle}>Post</Text>
                            <Text style={styles.dataSectionData}>{myposts.length}</Text>
                        </View>
                        <View style={styles.dataSectionInner}>
                            <Text style={styles.dataSectionTitle}>Following</Text>
                            <Text style={styles.dataSectionData}>4</Text>
                        </View>
                        <View style={styles.dataSectionInner}>
                            <Text style={styles.dataSectionTitle}>Followers</Text>
                            <Text style={styles.dataSectionData}>0</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View>
                <View style={styles.postWraper}>
                    <FlatList
                        data={myposts}
                        keyExtractor={item => item.id}
                        renderItem={({item, index, seperator}) => ( 
                            <Image key={index} source={{uri: item.picture}} style={styles.imagePost} /> 
                    )}
                    />
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
    imagePost:{
        aspectRatio: 1/1,
        resizeMode: 'cover',
        width: '30%'
    },
    postWraper:{
        flexDirection: "row",
        // width: '100%',
    },
    profilePost:{
        width: '100%',
        backgroundColor: '#ccc'
    },
    topSection:{
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingBottom: 30,
        marginBottom: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        elevation: 3,
    },
    userData:{
        paddingVertical: 10
    },
    userName:{
        fontSize: 20,
        color: '#000',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
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
    },
    userBio:{
        fontSize: 13,
        color: '#333',
        textAlign: 'center',
        marginTop: 10
    },
    dataSection:{
        flexDirection: 'row',
        justifyContent: "space-evenly",
        alignItems: 'center',
        paddingHorizontal: 20
    },
    dataSectionInner:{
        alignItems: 'center',
        width: '33.3%',
    },
    dataSectionTitle:{
        fontSize: 13,
        color: '#333'
    },
    dataSectionData:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000'
    }
    
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);