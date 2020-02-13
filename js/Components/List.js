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
  FlatList,
 } from 'react-native';

 const List = listItem => {
   return (
       <View style={listStyles.loconatiner}>
         <View style={listStyles.contentcontainer}>

           {/* <ScrollView
             // horizontal={true}
             showsHorizontalScrollIndicator={false}
           > */}
           <View style={listStyles.content}>
             {listItem.list.map(place =>
               <TouchableOpacity onPress={() => listItem.handler(place)} key={place.id}>
                 <View style={listStyles.place}>
                   <Image
                     style={{width: 50, height: 50, borderRadius: 25,}}
                     source={{uri: place.image}}
                   />
                   <Text style={listStyles.locTitle}>{place.name}</Text>
                 </View>
               </TouchableOpacity>
             )}
             {/* <FlatList
               data={listItem.list}
               renderItem={place => (
                 <TouchableOpacity onPress={() => listItem.handler(place)} key={place.id}>
               <View style={listStyles.place}>
               <Image
               style={{width: 50, height: 50, borderRadius: 25,}}
               source={{uri: place.image}}
               />
               <Text>{place.name}</Text>
               </View>
                 </TouchableOpacity>
               )}
             /> */}
           </View>
           {/* </ScrollView> */}
         </View>
       </View>
     );
   };


 const listStyles = StyleSheet.create({
   locontainer: {
     flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
   },
   contentcontainer: {
     paddingVertical: 4,
     paddingHorizontal: 14,
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
   },
   content: {
     paddingTop: 10,
     flexDirection: 'row',
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     flexWrap: 'wrap',
   },
   place: {
     paddingHorizontal: 10,
     maxWidth: 100,
     maxHeight: 100,
     paddingTop: 10,
     alignItems: 'center',
   },
   locTitle: {
     paddingTop: 14,
     marginBottom: 10,
     fontSize: 10,
   },
});

export default List;
