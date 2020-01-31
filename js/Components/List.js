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
 } from 'react-native';

 const List = listItem => {
   return (
       <View style={listStyles.loconatiner}>
         <View style={listStyles.contentcontainer}>
           <Text style={listStyles.locTitle}>{listItem.name}</Text>
           <View
             style={{
               borderBottomColor: 'grey',
               borderBottomWidth: 0.3,
             }}
           />
           <ScrollView
             horizontal={true}
             showsHorizontalScrollIndicator={false}
           >
             <View style={listStyles.content}>
               {listItem.list.map(place =>
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
             </View>
           </ScrollView>
         </View>
       </View>
     );
   };


 const listStyles = StyleSheet.create({
   contentcontainer: {
     paddingLeft: 14,
     paddingVertical: 4,
   },
   content: {
     paddingHorizontal: 14,
     paddingTop: 10,
     flex: 1,
     flexDirection: 'row',
     alignItems: 'center',
   },
   place: {
     paddingHorizontal: 10,
     flex: 1,
     flexDirection: 'column',
     alignItems: 'center',
   },
   locTitle: {
     paddingTop: 14,
     marginBottom: 10,

   },
});

export default List;
