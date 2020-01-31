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

 const Detail = detailItem => {
   return (
       <View>
         <View style={detailStyles.backButton}>
           <Button title='X' onPress={detailItem.handler} />
         </View>
         <View>
           <View style={detailStyles.focusData}>
             <Text style={detailStyles.dataTitle}>{detailItem.location.name}</Text>
             <Text>{detailItem.location.type}</Text>
             <TouchableOpacity
               style={detailStyles.ARButton}
               onPress={() => this.props.navigation.navigate('ARContent', {
                 location: detailItem.location.name,
                 otherParam: 'anything you want here',
               })
               }
             >
               <Text style={detailStyles.buttonTxt}>Go to AR Content</Text>
             </TouchableOpacity>
             <Text>{detailItem.location.description}</Text>
           </View>
         </View>
       </View>
     );
   };


 const detailStyles = StyleSheet.create({
   backButton: {
     alignItems: 'flex-end',
     justifyContent: 'flex-end',
   },
   focusData: {
     flex: 1,
     paddingHorizontal: 14,
   },
   dataTitle: {
     fontWeight: 'bold',
     fontSize: 18,
   },
   ARButton: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
     marginTop: 15,
     borderWidth: 0.5,
     borderColor: '#147EFB',
     borderRadius: 10,
     padding: 15,
     backgroundColor: '#147EFB',
     color: 'white',
   },
   buttonTxt: {
     color: 'white',
     fontSize: 12,
     fontWeight: 'bold',
   },
});

export default Detail;
