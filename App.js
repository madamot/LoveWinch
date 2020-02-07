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
import MapView, { PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Polyline from '@mapbox/polyline';
import * as axios from 'axios';
import BottomDrawer from 'rn-bottom-drawer';

import List from './js/Components/List';
import Detail from './js/Components/Detail';

const { Marker } = MapView;
const { height, width } = Dimensions.get('screen');
const ASPECT_RATIO = width / height;
const LATITUDE = 51.064022;
const LONGITUDE = -1.316288;
const LATITUDE_DELTA = 0.0322;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const TAB_BAR_HEIGHT = -20;

    // const locations = [
    //   {
    //     id: 1,
    //     type: 'Attractions',
    //     name: 'Cathedral',
    //     image: 'https://www.winchester-cathedral.org.uk/wp-content/uploads/Winchester-074-23102013-A4.jpg',
    //     latitude: 51.060891,
    //     longitude: -1.313165,
    //   },
    //   {
    //     id: 2,
    //     type: 'Attractions',
    //     name: 'Great Hall',
    //     image: 'https://thecrestdroxfordholidays.com/wp-content/uploads/2018/09/Winchester-Great-Hall.png',
    //     latlng: {
    //       latitude: 51.062759,
    //       longitude: -1.319771,
    //     }
    //   },
    //   {
    //     id: 3,
    //     type: 'Attractions',
    //     name: 'St Alfred',
    //     image: 'https://www.historic-uk.com/wp-content/uploads/2017/04/king-alfred-and-the-cakes.jpg',
    //     latlng: {
    //       latitude: 51.061520,
    //       longitude: -1.309099,
    //     }
    //   },
    //   {
    //     id: 4,
    //     type: 'Commercial',
    //     name: 'Weatherspoons',
    //     image: 'https://www.historic-uk.com/wp-content/uploads/2017/04/king-alfred-and-the-cakes.jpg',
    //     latlng: {
    //       latitude: 51.064042,
    //       longitude: -1.316191,
    //     }
    //   },
    //   ]

    const trails = [
      {
        id: 1,
        name: 'Cathedral',
        image: 'https://www.winchester-cathedral.org.uk/wp-content/uploads/Winchester-074-23102013-A4.jpg',
      },
      {
        id: 2,
        name: 'Great Hall',
        image: 'https://www.winchester-cathedral.org.uk/wp-content/uploads/Winchester-074-23102013-A4.jpg',
      },
      {
        id: 3,
        name: 'Cathedral',
        image: 'https://www.winchester-cathedral.org.uk/wp-content/uploads/Winchester-074-23102013-A4.jpg',
      },
      {
        id: 4,
        name: 'Great Hall',
        image: 'https://www.winchester-cathedral.org.uk/wp-content/uploads/Winchester-074-23102013-A4.jpg',
      },
      {
        id: 5,
        name: 'Cathedral',
        image: 'https://www.winchester-cathedral.org.uk/wp-content/uploads/Winchester-074-23102013-A4.jpg',
      },
      {
        id: 6,
        name: 'Great Hall',
        image: 'https://www.winchester-cathedral.org.uk/wp-content/uploads/Winchester-074-23102013-A4.jpg',
      },
      ]

export default class Home extends Component {
  componentDidMount = () => {
    this.getLocations();
    Geolocation.getCurrentPosition(
     (position) => {
       // console.log(position);
       let initalPosition = {
         latitude: position.coords.latitude,
         longitude: position.coords.longitude,
         latitudeDelta: 0.0322,
         longitudeDelta: 0.035,
       }
       this.setState({initalPosition});
       this.setState({
         latitude: position.coords.latitude,
         longitude: position.coords.longitude,
       });

     },
     (error) => this.setState({ error: error.message }),
     { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
   );
   // console.log(this.state.latitude);
  }

  static navigationOptions = {
    header: null,
  };

  state = {
    region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    active: 'all',
    tabFilter: [],
    selection: false,
    locations: [],
    trails: trails,
    chosenLocation: null,
    content: 'loc',
    latitude: null,
    longitude: null,
    error: null,
    coords: [],
    x: 'false',
    desLatitude: null,
    desLongitude: null,
    cordLatitude:51.060891,
    cordLongitude:-1.313165,
  }

    getLocations() {
    axios
      .get('http://127.0.0.1:8000/api/v1/')
      .then(res => {
        this.setState({ locations: res.data })
        this.setState({ tabFilter: res.data })
        // console.log(this.state.locations);
      })
      .catch(err => {
        console.log("error getting backend api");
      });

  }


  onRegionChange(region) {
    this.setState({ region });
  }

  handleTab = (tabKey) => {
    const newLocations = this.state.locations;
    //
    // if (tabKey !== 'all') {
    //   newLocations = this.state.locations.filter(locations => locations.type === tabKey);
    //   this.setState({ active: tabKey, locations: newLocations });
    // }
    //
    // this.setState({ active: tabKey, locations: newLocations });
    // console.log(newLocations);
    if (tabKey == 'all') {
      this.getLocations();
      this.setState({ active: tabKey });
    }
    else if (tabKey == 'Attraction') {
      tabFilter = this.state.locations.filter(locations => locations.type === tabKey);
      this.setState({ active: tabKey, tabFilter: tabFilter });
    }
    else if (tabKey == 'Commercial') {
      tabFilter = this.state.locations.filter(locations => locations.type === tabKey);
        this.setState({ active: tabKey, tabFilter: tabFilter });
    }
  }

  handleCon = (loc) => {
      this.setState({ content: loc });

    }


  goToPlace(latitude, longitude) {
    const chosenLocation = this.state.latlng;
    this.map.animateCamera({ center: {
      latitude:
        latitude,
      longitude:
        longitude
    }
    });
  }

  goBack() {
    this.map.animateCamera({ center: this.state.initalPosition });
    this.setState({

      error: null,
      coords: [],
      x: 'false',
    })
    // this.map.animateCamera({ pitch: this.getRandomFloat(0, 90) });
  }


  focusHandler = (place) => {
    if (this.state.selection === false) {
      this.setState({ selection: true });
      this.setState({ chosenLocation: place });
      console.log(this.state.chosenLocation);
      this.setState({
        desLatitude: place.latitude,
        desLongitude: place.longitude,
      })
      console.log(this.state.desLatitude);
      console.log(this.state.desLongitude);
      if (this.state.chosenLocation) {
        this.goToPlace(this.state.chosenLocation.latitude, this.state.chosenLocation.longitude);
      }
    } else {
      this.setState({ selection: false });
      this.goBack();
    }
  }

  async getDirections(startLoc, destinationLoc) {
      try {
          let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }&key=AIzaSyALxSvI1eqDi0VooB6wRZGG0Du-T8doVnI&mode=walking`)
          let respJson = await resp.json();
          let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
          let coords = points.map((point, index) => {
              return  {
                  latitude : point[0],
                  longitude : point[1]
              }
          })
          this.setState({coords: coords})
          this.setState({x: "true"})
          return coords
          console.log(this.state.coords);
      } catch(error) {
         console.log(error);
         this.setState({x: "error"})
         return error
      }
  }


mergeLot = () => {
    if (this.state.latitude != null && this.state.longitude!=null && this.state.desLongitude != null && this.state.desLatitude != null)
     {
       let concatLot = this.state.latitude +","+this.state.longitude
       let concatdesLot = this.state.desLatitude +","+this.state.desLongitude
       this.setState({
         concat: concatLot,
         concatdes: concatdesLot
       }, () => {
         this.getDirections(concatLot, concatdesLot);
       });
       console.log(concatLot);
       console.log(concatdesLot);
     }
   }
   "51.060891,-1.313165"

  renderHeader() {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <View style={{flex: 2, flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.login}>
              <Text style={{fontSize: 18, color: 'purple'}}>Login</Text>
            </View>
            <View style={styles.settings}>
              <Button
                title="Settings"
                onPress={() => this.props.navigation.navigate('Settings')}
              />
            </View>
          </View>
        </View>
        {this.renderTabs()}
      </View>
    )
  }

  renderTabs() {
    const { active } = this.state;
    return (
      <View style={styles.tabs}>
        <View style={[styles.tab, active === 'all' ? styles.activeTab : null ]}>
          <Text
            style={[
              styles.tabTitle,
              active === 'all' ? styles.activeTabTitle : null
            ]}
            onPress={() => this.handleTab('all')}
          >
            All
          </Text>
        </View>
        <View style={[styles.tab, active === 'Attraction' ? styles.activeTab : null ]}>
          <Text
            style={[
              styles.tabTitle,
              active === 'attractions' ? styles.activeTabTitle : null
            ]}
            onPress={() => this.handleTab('Attraction')}
          >
            Attractions
          </Text>
        </View>
        <View style={[styles.tab, active === 'Commercial' ? styles.activeTab : null ]}>
          <Text
            style={[
              styles.tabTitle,
              active === 'commercial' ? styles.activeTabTitle : null
            ]}
            onPress={() => this.handleTab('Commercial')}
          >
            Commercial
          </Text>
        </View>
      </View>
    )
  }

  renderMap() {
    const winchMarker = ({type}) => (
      <View style={[styles.marker, styles['${type}Marker']]}>
        {type === 'Attraction' ?
          <View style={styles.attractions}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>A</Text>
          </View>
        : <View style={styles.commercial}><Text style={{color: 'white', fontWeight: 'bold'}}>C</Text></View>
        }
      </View>
    )
    return (
      <View style={styles.map}>
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={map => this.map = map}
          style={{flex: 1, height: height, width,}}
          showsMyLocationButton={true}
          showsUserLocation={true}
          initialRegion={this.state.initalPosition}
          // onRegionChange={region => this.onRegionChange(region)}
        >
          {this.state.tabFilter.map(marker => (
            <Marker
              key={marker.id}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude
              }}
            >
              {winchMarker(marker)}
              <Callout onPress={() => this.focusHandler(marker)} style={styles.plainView}>
                <View>
                  <Text>{marker.name}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
          {/* <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={2}
          strokeColor="red"/> */}
          {!!this.state.latitude && !!this.state.longitude && this.state.x == 'true' &&
            <MapView.Polyline
              coordinates={this.state.coords}
              strokeWidth={2}
              strokeColor="red"
            />
          }

          {/* {!!this.state.latitude && !!this.state.longitude && this.state.x == 'error' &&
            <MapView.Polyline
              coordinates={[
            {latitude: this.state.latitude, longitude: this.state.longitude},
            {latitude: this.state.cordLatitude, longitude: this.state.cordLongitude},
              ]}
              strokeWidth={2}
              strokeColor="yellow"
            />
          } */}
        </MapView>
      </View>
    )
  }

  renderList() {
    const { locations, trails, selection, chosenLocation, tabFilter, content } = this.state;
    if (!selection) {
      return (
        <View style={styles.locations}>
          <View style={styles.drawerTabs}>
            <View style={styles.drawerTab, content == 'loc' ? styles.activeDrawerTab : null}>
              <Text style={styles.drawerTitle} onPress={() => this.handleCon('loc')}>
                Locations
              </Text>
            </View>
            <View style={styles.drawerTab, content == 'trails' ? styles.activeDrawerTab : null}>
              <Text style={styles.drawerTitle} onPress={() => this.handleCon('trails')}>
                Trails
              </Text>
            </View>
          </View>
          <List name="Locations" list={tabFilter} handler={this.focusHandler} />
          <TouchableOpacity
            onPress={() => this.mergeLot()}
          >
            <Text>Directions</Text>
          </TouchableOpacity>
          {/* <List name="Trails" list={trails} handler={this.focusHandler} /> */}
        </View>
      )
    }
    else {
      return (
          <View style={styles.focusContainer}>
            <Detail location={chosenLocation} handler={this.focusHandler} directions={this.mergeLot} />
          </View>
      )
    }
  }

  renderTrails() {
    const { locations, trails, selection, chosenLocation, tabFilter, content } = this.state;
    return (
      <View style={styles.trails}>
        <View style={styles.drawerTabs}>
          <View style={styles.drawerTab, content == 'loc' ? styles.activeDrawerTab : null}>
            <Text style={styles.drawerTitle} onPress={() => this.handleCon('loc')}>
              Locations
            </Text>
          </View>
          <View style={styles.drawerTab, content == 'trails' ? styles.activeDrawerTab : null}>
            <Text style={styles.drawerTitle} onPress={() => this.handleCon('trails')}>
              Trails
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.trailTitleCon}>
            <Text style={styles.trailTitle}>Add locations to make your own trail!</Text>
          </View>
          <View>
            <Text> {this.state.latitude} </Text>
            <Text> {this.state.longitude} </Text>
            <Text> {this.state.error} </Text>
          </View>
        </View>
      </View>
    )
  }

  renderDrawer() {
    const { content } = this.state;
    if (content == 'loc') {
      return (
        <View>
          {this.renderList()}
        </View>
      )
    }
    else if (content == 'trails'){
      return (
        <View>
          {this.renderTrails()}
        </View>
      )
    }
  }

   render() {
     return (
       <SafeAreaView style={styles.container}>
         {this.renderHeader()}
         {this.renderMap()}
         <BottomDrawer
           containerHeight={300}
           offset={TAB_BAR_HEIGHT}
           startUp={false}
           shadow={true}
           ref={drawer => this.drawer = drawer}
         >
           <ScrollView>
             {this.renderDrawer()}
           </ScrollView>
         </BottomDrawer>
       </SafeAreaView>
     );
   }
 }

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
 },
 headerContainer: {
   backgroundColor: '#fff',
   left: 0,
   right: 0,
   top: 0,
   height: height * 0.1,
   width: width,
 },
 header: {
   flex: 1,
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'center',
   paddingHorizontal: 14,
 },
 login: {
   alignItems: 'center',
   justifyContent: 'center',
   paddingHorizontal: 14,
 },
 settings: {
   alignItems: 'center',
   justifyContent: 'center',
   paddingHorizontal: 14,
 },
 tabs: {
   flex: 1,
   flexDirection: 'row',
   justifyContent: 'center',
   height: height * 0.05,
   alignItems: 'center',
   bottom: -7,
 },
 tab: {
   justifyContent: 'center',
   paddingHorizontal: 20,
 },
 tabTitle: {
   fontWeight: 'bold',
   marginBottom: 10,
 },
 activeTab: {
   borderBottomColor: 'purple',
   borderBottomWidth: 10,
 },
 activeTabTitle: {
   color: 'purple',
 },
 map: {
   flex: 1,
 },
 attractions: {
   backgroundColor: 'green',
   borderRadius: 100,
   borderColor: 'white',
   borderWidth: 3,
   paddingHorizontal: 6,
   paddingVertical: 3,
 },
 commercial: {
   backgroundColor: 'red',
   borderRadius: 100,
   borderColor: 'white',
   borderWidth: 3,
   paddingHorizontal: 6,
   paddingVertical: 3,
 },
 plainView: {
  width: 100,
},
 focusContainer: {
   flex: 1,
   paddingHorizontal: 14,
 },
 drawerTabs: {
   flex: 1,
   flexDirection: 'row',
   justifyContent: 'center',
   height: height * 0.05,
   alignItems: 'center',
   bottom: -7,
 },
 drawerTab: {
   justifyContent: 'center',
   paddingHorizontal: 20,
 },
 drawerTitle: {
   marginBottom: 5,
   paddingHorizontal: 20,
 },
 activeDrawerTab: {
   borderBottomColor: 'grey',
   borderBottomWidth: 1,
 },
 trailTitleCon: {
   flex: 1,
   flexDirection: 'row',
   justifyContent: 'center',
   alignItems: 'center',
   padding: 30,
   paddingHorizontal: 70,
 },
 trailTitle: {
   fontSize: 18
 }
});


// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   Text,
//   View,
//   StyleSheet,
//   PixelRatio,
//   TouchableHighlight,
// } from 'react-native';
//
// import {
//   ViroVRSceneNavigator,
//   ViroARSceneNavigator
// } from 'react-viro';
//
// import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
//
//
// /*
//  TODO: Insert your API key below
//  */
// var sharedProps = {
//   apiKey:"1AB415AE-A2C5-419E-B175-36434EF75A67",
// }
//
// // Sets the default scene you want for AR and VR
// var InitialARScene = require('./js/HelloWorldSceneAR');
// var InitialVRScene = require('./js/HelloWorldScene');
//
// var UNSET = "UNSET";
// var VR_NAVIGATOR_TYPE = "VR";
// var AR_NAVIGATOR_TYPE = "AR";
//
// // This determines which type of experience to launch in, or UNSET, if the user should
// // be presented with a choice of AR or VR. By default, we offer the user a choice.
// var defaultNavigatorType = UNSET;
//
// export default class ViroSample extends Component {
//   constructor() {
//     super();
//
//     this.state = {
//       navigatorType : defaultNavigatorType,
//       sharedProps : sharedProps
//     }
//     this._getExperienceSelector = this._getExperienceSelector.bind(this);
//     this._getARNavigator = this._getARNavigator.bind(this);
//     this._getVRNavigator = this._getVRNavigator.bind(this);
//     this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(this);
//     this._exitViro = this._exitViro.bind(this);
//   }
//
//   // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
//   // if you are building a specific type of experience.
//   render() {
//     if (this.state.navigatorType == UNSET) {
//       return this._getExperienceSelector();
//     } else if (this.state.navigatorType == VR_NAVIGATOR_TYPE) {
//       return this._getVRNavigator();
//     } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {
//       return this._getARNavigator();
//     }
//
//   }
//
//   // Presents the user with a choice of an AR or VR experience
//   _getExperienceSelector() {
//     return (
//       <View style={localStyles.outer} >
//         <View style={localStyles.inner} >
//
//           <Text style={localStyles.titleText}>
//             Choose your desired experience:
//           </Text>
//
//           <TouchableHighlight style={localStyles.buttons}
//             onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}
//             underlayColor={'#68a0ff'} >
//
//             <Text style={localStyles.buttonText}>AR</Text>
//           </TouchableHighlight>
//
//           <TouchableHighlight style={localStyles.buttons}
//             onPress={this._getExperienceButtonOnPress(VR_NAVIGATOR_TYPE)}
//             underlayColor={'#68a0ff'} >
//
//             <Text style={localStyles.buttonText}>VR</Text>
//           </TouchableHighlight>
//         </View>
//         <View style={{ flex: 1 }}>
//           <MapView
//             provider={PROVIDER_GOOGLE}
//             style={{ flex: 1 }}
//             initialRegion={{
//               latitude: 37.78825,
//               longitude: -122.4324,
//               latitudeDelta: 0.0922,
//               longitudeDelta: 0.0421
//             }}></MapView>
//         </View>
//       </View>
//     );
//   }
//
//   // Returns the ViroARSceneNavigator which will start the AR experience
//   _getARNavigator() {
//     return (
//       <ViroARSceneNavigator {...this.state.sharedProps}
//         initialScene={{scene: InitialARScene}} />
//     );
//   }
//
//   // Returns the ViroSceneNavigator which will start the VR experience
//   _getVRNavigator() {
//     return (
//       <ViroVRSceneNavigator {...this.state.sharedProps}
//         initialScene={{scene: InitialVRScene}} onExitViro={this._exitViro}/>
//     );
//   }
//
//   // This function returns an anonymous/lambda function to be used
//   // by the experience selector buttons
//   _getExperienceButtonOnPress(navigatorType) {
//     return () => {
//       this.setState({
//         navigatorType : navigatorType
//       })
//     }
//   }
//
//   // This function "exits" Viro by setting the navigatorType to UNSET.
//   _exitViro() {
//     this.setState({
//       navigatorType : UNSET
//     })
//   }
// }
//
// var localStyles = StyleSheet.create({
//   viroContainer :{
//   },
//   outer : {
//     flex : 1,
//     flexDirection: 'row',
//     alignItems:'center',
//     backgroundColor: "black",
//   },
//   inner: {
//     flex : 1,
//     flexDirection: 'column',
//     alignItems:'center',
//     backgroundColor: "black",
//   },
//   titleText: {
//     paddingTop: 30,
//     paddingBottom: 20,
//     color:'#fff',
//     textAlign:'center',
//     fontSize : 25
//   },
//   buttonText: {
//     color:'#fff',
//     textAlign:'center',
//     fontSize : 20
//   },
//   buttons : {
//     height: 80,
//     width: 150,
//     paddingTop:20,
//     paddingBottom:20,
//     marginTop: 10,
//     marginBottom: 10,
//     backgroundColor:'#68a0cf',
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#fff',
//   },
//   exitButton : {
//     height: 50,
//     width: 100,
//     paddingTop:10,
//     paddingBottom:10,
//     marginTop: 10,
//     marginBottom: 10,
//     backgroundColor:'#68a0cf',
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#fff',
//   }
// });
//
// module.exports = ViroSample
