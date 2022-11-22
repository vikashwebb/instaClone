import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {JumpingTransition} from 'react-native-reanimated';

const EmptyContainer = () => {
  return (
    <View style={styles.EmptyContainer}>
      <ActivityIndicator size="large" color="blue" />
    </View>
  );
};

export default EmptyContainer;

const styles = StyleSheet.create({
  EmptyContainer: {
    flex: 1,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
