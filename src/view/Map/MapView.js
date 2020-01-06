import React, { Component } from "react";
import { StyleSheet, View, Platform, PermissionsAndroid, Alert, BackHandler, Keyboard, NativeModules, TextInput } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps"
import Geolocation from 'react-native-geolocation-service'
import { findRoute, findLatLng } from "../../service/RouteApiManagement"
import polyUtil from 'polyline-encoded'
import { Input, List, ListItem, Text, Content, Container, Body, Spinner, Button, Accordion } from 'native-base';
import MapPin from './PinIcon'
import {getStepStyle, stepSummary, getRegionForCoordinates, requestLocationPermission} from '../../controller/Map/MapController'
import {MapCss} from '../../css/MapCss'
import {GlobalCss} from '../../css/GlobalCss'

MapboxGL.setAccessToken("pk.eyJ1IjoiaW5maW9sZSIsImEiOiJjazF2eHY2YXcwOThpM2lvNHEzOGFldmM0In0.gz29cPkaQLgaMs9hP_RiKQ")

export default class MapView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      granted: null,
      searching: false,
      searchLoading: false,
      searchResults: [],
      endFeature: null,
      followingUser: false,
      destLat: null,
      destLng: null,
      originLat: null,
      originLng: null,
      selectedRouteIndex: -1,
      selectingRoute: false,
    }
    this.searchTimeout = null
    this.routeResult = null
  }

  handleSearchTextChange = (text) => {
    if (this.searchTimeout != null) {
      clearTimeout(this.searchTimeout)
    }
    const trimmedText = text.trim()
    if (trimmedText.length === 0) {
      return
    }

    this.searchTimeout = setTimeout(() => {
      this.setState({
        searchLoading: true,
        selectedRouteIndex: -1
      })
      findLatLng(trimmedText)
        .then((resp) => {
          this.setState({
            searchResults: resp.data.results,
            searchLoading: false,
            searching: true,
            selectingRoute: false
          })
        })

      this.searchTimeout = null
    }, 300)
  }

  handleSearchFocus = () => {
    this.setState({
      searching: true
    })
  }

  handleBackPress = () => {
    if (this.state.searching) {
      this.setState({
        searching: false
      })
      return true
    }
    return false
  }

  handleSearchItemPress = (index) => () => {
    const item = this.state.searchResults[index]
    const lat = parseFloat(item.LATITUDE)
    const long = parseFloat(item.LONGITUDE)

    Geolocation.getCurrentPosition(
        (position) => {
            console.log(position);
            const {longitude, latitude} = position.coords
            findRoute([latitude, longitude], [lat, long])
              .then(res => {
                this.setState({
                  routeResult: res.data,
                  selectingRoute: true
                })
              })
              .catch(error => {
                console.log('fail to find route', error)
              })
        },
        (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    )

    this.setState({
      searchResults: [],
      searchLoading: false,
      destLat: lat,
      destLng: long,
    })
    Keyboard.dismiss()
  }

  handleTrackingModeChange = (e) => {
    const {followUserMode} = e.nativeEvent.payload
    console.log('handleTrackingModeChange', followUserMode)
    this.setState({
      followingUser: !!followUserMode
    })
  }

  handleRecenter = () => {
    if (!this._isMounted) return

    this.setState({followingUser: true})
    if (this.camera !== null) {
      this.camera.zoomTo(16)
    }
  }

  handleRouteSelected = (index) => () => {
    if (this.camera !== null) {
      const {legs} = this.state.routeResult.plan.itineraries[index]
      const coords = []
      for (const leg of legs) {
        coords.push(...polyUtil.decode(leg.legGeometry.points, {
          precision: 5
        }))
      }

      const region = getRegionForCoordinates(coords.map(c => ({
        latitude: c[0],
        longitude: c[1]
      })))
      this.camera.flyTo([region.longitude, region.latitude])
      this.camera.fitBounds(region.ne.reverse(), region.sw.reverse())
    }
    this.setState({
      selectedRouteIndex: index
    })
  }

  async componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
    MapView.onSearchFocus = this.handleSearchFocus
    MapView.onSearchTextChange = this.handleSearchTextChange

    var hasLocationPermission = await requestLocationPermission()
    MapboxGL.locationManager.start()
    MapboxGL.setTelemetryEnabled(false);
    //geolocation
    if (hasLocationPermission) {
        Geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
                this.setState({
                  granted: hasLocationPermission,
                  originLat: position.coords.latitude,
                  originLng: position.coords.longitude
                })
                // Alert.alert("Current position: " + position.coords.latitude.toString() + "," + position.coords.longitude.toString());
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }
  }

  componentWillUnmount() {
    MapView.onSearchFocus = null
    MapboxGL.locationManager.dispose();
    this.backHandler.remove();
    if (this.searchTimeout !== null) {
      clearTimeout(this.searchTimeout)
    }
  }

  renderSearchItem = ({item, index}) => (
    <ListItem key={index} onPress={this.handleSearchItemPress(index)}>
      <Body>
        <Text>{item.SEARCHVAL}</Text>
        <Text note>{item.ADDRESS}</Text>
      </Body>
    </ListItem>
  )

  renderSearch() {
    if (this.state.searchLoading) {
      return <Spinner />
    } else {
      if (!this.state.selectingRoute) {
        return <List
          dataArray={this.state.searchResults}
          renderItem={this.renderSearchItem}
          keyExtractor={(item, index) => index.toString()}
        />
      } else {
        const {itineraries} = this.state.routeResult.plan
        const routes = <List>
          {itineraries.map((itinery, index) => {
            const {legs} = itinery
            let stepsSummary = ''
            if (legs.length > 0) {

              stepsSummary += `Walk ${Math.round(legs[0].duration / 60)} mins`
            }
            for (let i = 1; i < legs.length; i++) {
              stepsSummary += ` > ${stepSummary(legs[i])}`
            }
            return <ListItem onPress={this.handleRouteSelected(index)} key={index} selected={this.state.selectedRouteIndex === index}>
              <Text>{stepsSummary}</Text>
            </ListItem>
          })}
        </List>

        return <Accordion
          dataArray={[{title: 'Routes'}]}
          expanded={0}
          renderContent={() => routes}
        />
      }
    }
  }

  renderRoute() {
    if (!this.state.routeResult || this.state.selectedRouteIndex === -1) {
      return null
    }
    const routeIndex = this.state.selectedRouteIndex

    const {legs} = this.state.routeResult.plan.itineraries[routeIndex]
    return legs.map((leg, index) => {
      const coordinates = polyUtil.decode(leg.legGeometry.points, {
        precision: 5
      }).map(i => [i[1], i[0]])
      const route = {
        "type": "FeatureCollection",
        "features": []
      }
      route.features.push({
        "type": "Feature",
        "geometry": {
          "type": "LineString",
          "coordinates":  coordinates
        }
      })

      return <MapboxGL.ShapeSource id={`line${index}`} shape={route} key={`route${routeIndex}-step${index}`}>
        <MapboxGL.LineLayer id={`lineLayer${index}`} style={getStepStyle(leg.mode, routeIndex)} />
      </MapboxGL.ShapeSource>
    })
  }

  render() {
    const haveOrigin = this.state.originLng && this.state.originLat
    const haveDestination = this.state.destLng && this.state.destLat

    return <View style={MapCss.page}>
      <View style={MapCss.page}>
        <MapboxGL.MapView
          style={MapCss.container}
          onDidFinishRenderingMapFully={(r) => this.handleRecenter()}
        >
          <MapboxGL.UserLocation />
          {haveOrigin &&<MapboxGL.Camera
          	ref={(ref) => this.camera = ref}
          	defaultSettings={{
              centerCoordinate: [this.state.originLng, this.state.originLat],
          		zoomLevel: 16
            }}
          	onUserTrackingModeChange={this.handleTrackingModeChange}
          	followUserLocation={this.state.followingUser}
          	followUserMode={MapboxGL.UserTrackingModes.FollowWithCourse}
          />}

          {this.renderRoute()}

          <MapboxGL.Images images={{assets: ['pin']}} />
          {haveDestination && <MapboxGL.PointAnnotation id="endPoint"
            coordinate={[this.state.destLng, this.state.destLat]}
          >
            <View style={MapCss.pin}>
              <MapPin />
            </View>
          </MapboxGL.PointAnnotation>}
        </MapboxGL.MapView>
      </View>
      {(haveDestination && this.state.selectedRouteIndex !== -1) && <View style={MapCss.navigateButton}>
        <Button
          block
          onPress={() => {
            this.props.navigation.navigate('NavigationView', {
              route: this.state.routeResult,
              itenery: this.state.routeResult.plan.itineraries[this.state.selectedRouteIndex],
              origin: [this.state.originLat, this.state.originLng],
              dest: [this.state.destLat, this.state.destLng],
              selectedRouteIndex: this.state.selectedRouteIndex
            })
          }}
        >
          <Text>Start Navigation</Text>
        </Button>
      </View>}
      {<View style={{...MapCss.searchOverlay,...GlobalCss.p1}}  pointerEvents="box-none">
        <TextInput
          style={MapCss.searchBox}
          placeholder='Search Location'
          onFocus={this.handleSearchFocus}
          onChangeText={this.handleSearchTextChange}
        />
        {this.state.searching &&
          <View style={MapCss.searchResults}>{this.renderSearch()}</View>}
      </View>}
    </View>
  }
}
