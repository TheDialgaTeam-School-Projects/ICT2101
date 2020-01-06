import {StyleSheet} from 'react-native';
import { Dimensions } from "react-native";
/**
 * Stylesheet for MapView and NavigationView content.
 */

 const {height, width} = Dimensions.get('window')

 export const MapCss = StyleSheet.create({
   page: {
     flex: 1,
     justifyContent: "center",
     alignItems: "center",
     backgroundColor: "#F5FCFF"
   },
   container: {
     height:height,
     width:width,
     backgroundColor: "white"
   },
   map: {
     flex: 1
   },
   searchOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    flexDirection: 'column',
    bottom: 0,
  },
  searchResults: {
    backgroundColor: 'white',
  },
  btnNavigate: {
    zIndex:2
  },
  navigation: {
    backgroundColor: "gainsboro",
    flex: 1
  },
  pin: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigateButton: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    zIndex: 100,
  },
  recenterButton: {
   	marginBottom: 10,
   	marginLeft: 5,
   	alignSelf: 'flex-start'
  },
  instructionCard: {
   	position: 'absolute',
   	top: 10,
   	left: 5,
   	right: 5
  },
  footer: {
   	position: 'absolute',
   	bottom: 0,
   	right: 0,
   	left: 0,
   	flexDirection: 'column',
   },
   myStarStyle: {
     color: 'yellow',
     backgroundColor: 'transparent',
     textShadowColor: 'black',
     textShadowOffset: {width: 1, height: 1},
     textShadowRadius: 2,
   },
   myEmptyStarStyle: {
     color: 'white',
   },
   searchBox: {
    backgroundColor: 'white',
  }
 });
