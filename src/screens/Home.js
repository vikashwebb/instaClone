import React, {useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, SafeAreaView} from 'react-native';

// redux
import {getPosts} from '../action/post';
import propTypes from 'prop-types';

import EmptyContainer from '../component/EmptyContainer';
import Post from '../component/Post';
import {connect, useStore} from 'react-redux';

const Home = ({getPosts, postState, userDetails}) => {
  useEffect(() => {
    getPosts();
  }, []);
  console.log('postState.post in Home screen', postState.post);
  console.log('userDetails in  home screen', userDetails);
  return (
    <SafeAreaView>
      {/* <Post /> */}
      {/* <Text>Home screen</Text> */}
      <FlatList
        data={postState.post}
        keyExtractor={item => item.id}
        renderItem={({item, index, seperator}) => (
          // <View key={item.id}>
          //   <Text>ID {item.id}</Text>
          //   <Text>NAme {item.by}</Text>
          //   <Text>Location {item.location}</Text>
          // </View>
          <Post item={item} userDetail={userDetails} key={item.id} />
        )}
        // ListEmptyComponent={() => {
        //   <View style={{justifyContent: 'center', alignItems: 'center'}}>
        //     <Text>no post is available</Text>
        //   </View>;
        // }}
      />
    </SafeAreaView>
  );
};

const mapDispatchToProps = {
  getPosts,
};
const mapStateToProps = state => ({
  userDetails: state.auth.user,
  postState: state.post,
});

Home.prototype = {
  getPosts: propTypes.func.isRequired,
  postState: propTypes.object.isRequired,
  userDetails: propTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
// export default Home;

const style = StyleSheet.create({
  //
});
