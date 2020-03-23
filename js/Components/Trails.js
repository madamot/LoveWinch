import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Text,
  Image,
  Dimensions,
  Button,
  TouchableOpacity,
  Picker,
 } from 'react-native';
 import { withNavigation } from 'react-navigation';
 import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

 const Trails = trailItem => {
   return (
       <View>
         <View>
           <View>
             {/* <Text onPress={trailItem.locate}>Trail 1</Text> */}
             {trailItem.list.map(place =>
               <TouchableOpacity onPress={() => trailItem.handler(place)} key={place.id}>
                 <View>
                   <Image
                     style={{width: 300, height: 100, borderRadius: 5,}}
                     source={{uri: place.image}}
                   />
                   <Text>{place.name}</Text>
                 </View>
               </TouchableOpacity>
             )}
           </View>
         </View>
       </View>
     );
   };


 const trailStyles = StyleSheet.create({

});

export default Trails;
