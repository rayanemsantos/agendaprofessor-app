import React, {Component} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { fontRegular, light, primary } from '../assets/colors';
import { Subtitle } from './text';


export default function Loading({title = 'Aguarde...'}) {
    return (
      <>
      <View style={styles.backdrop}></View> 
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Subtitle
              text={title}
              style={styles.title}
            />
            <ActivityIndicator size="large" color={light}/>
          </View>
        </View>
      </>
    )
}

const styles = StyleSheet.create({
  backdrop: {
    // backgroundColor:'#000', 
    // opacity:0.1,
    // borderRadius:30, 
    position:'absolute', 
    top:0, 
    bottom:0, 
    right:0, 
    left:0, 
    zIndex: 9, 
    alignItems: 'center', 
    justifyContent:'center'
  },
  container: {
    position:'absolute',
    zIndex: 100, 
    top:0, 
    bottom:0, 
    right:0, 
    left:0, 
    alignItems: 'center', 
    justifyContent:'center'
  },
  titleContainer: {
    zIndex: 999,
    backgroundColor: primary, 
    padding: 16, 
    borderRadius:12,
  },
  title: {
    color: light
  }
});
