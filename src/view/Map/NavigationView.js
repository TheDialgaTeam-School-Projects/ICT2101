import React from 'react'
import { StyleSheet, View, Dimensions, Toast, Alert } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import Geolocation from 'react-native-geolocation-service';
import polyUtil from 'polyline-encoded'
import { Button, Text, Card, CardItem, Body, ListItem } from 'native-base'
import KeepAwake from 'react-native-keep-awake';
import Modal, {ModalTitle, ModalContent, ModalFooter, ModalButton, SlideAnimation, ScaleAnimation} from 'react-native-modals'
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeedbackManagement from '../../service/FeedbackManagement';
import {distance, extractStationCode, getStepStyle} from '../../controller/Map/MapController';
import { totalDistance } from "../../service/RouteApiManagement"
import { updateTask } from "../../service/TaskManagement"
import {MapCss} from '../../css/MapCss';
import {GlobalCss} from '../../css/GlobalCss';

class NavigationView extends React.Component {
	static navigationOptions = {
		header: null,
	}

	constructor(props) {
		super(props)
		this.state = {
			routes: [],
			stepPos: 0,
			followingUser: false,
			estimatedArrival: '',
			travelTime: '',
      navigationCompleteModal: false,
      feedbackModal: false,
      safety: 3,
      speed: 3,
      enjoyment: 3,
		}
		this.stepPos = 0
		this.start = [1.3783408,103.8487161]
		this.dest = [1.3279527,103.9406124]
		this.steps = []
		this.watchId = null
		this._isMounted = false
		this.lastDist = 0
		this.deviateTicks = 0
		this.stepCoords = []
    this.selectedRouteIndex = this.props.navigation.getParam('selectedRouteIndex')
		this.route = this.props.navigation.getParam('route')

		const itinery = this.props.navigation.getParam('itenery')
    const {legs} = itinery
    this.steps = legs
    const routes = []
    for (let i = 0; i < legs.length; i++) {
    	const leg = legs[i]
      const coordinates = polyUtil.decode(leg.legGeometry.points, {
        precision: 5
      }).map(i => [i[1], i[0]])
      this.stepCoords.push(coordinates)
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
      routes.push(route)
    }
    const endTime = new Date(itinery.endTime)

    this.routes = routes
    this.travelTime = `${Math.floor(itinery.duration / 60)} mins`
    this.estimatedArrival = endTime.toLocaleTimeString()
    this.camera = null;
	}

	componentDidMount() {
		this._isMounted = true
		//this.setState({ navigationCompleteModal: true });
		// Add method call to update tasks
		// let distanceTravelled = totalDistance(this.route, this.selectedRouteIndex)
		// console.log(distanceTravelled[0], distanceTravelled[1], distanceTravelled[2])
		// // WALK
		// updateTask("WALK", distanceTravelled[0])
		// // BUS
		// updateTask("BUS", distanceTravelled[1])
		// // SUBWAY
		// updateTask("MRT", distanceTravelled[2])

   	this.watchId = Geolocation.watchPosition((pos) => {
   		const crd = pos.coords;
   		console.log(`watchPosition lat: ${crd.latitude}, long: ${crd.longitude}`)
   		if (this.steps.length === 0) return;

   		const futureStepDist = []
   		for (let i = 0; i < this.stepPos + 1; i++) {
   			futureStepDist.push(null)
   		}
   		for (let i = this.stepPos; i < this.steps.length; i++) {
	   		const step = this.steps[i];

	   		const targetLat = step.to.lat
	   		const targetLon = step.to.lon
   			const dist = distance(crd.latitude, crd.longitude, targetLat, targetLon)
   			futureStepDist.push(dist)
   		}
   		const dist = futureStepDist[0]
   		console.log(`distance to next step ${this.stepPos}: ${dist}`)
   		if (dist > this.lastDist) {
   			this.deviateTicks += 1
   		}

   		this.lastDist = dist

   		// when user moves away from target location for more than 5 ticks
   		if (this.deviateTicks === 5) {
   			console.log('deviating')
   			// find the nearest step to resume
   			let minPosition = 0
     		let minDist = 1000
     		for (let i = 0; i < this.steps.length; i++) {
     			for (let y = 0; y < this.stepCoords[i].length; y++) {
     				const [lon, lat] = this.stepCoords[i][y]
     				const latDelta = Math.abs(crd.latitude - lat)
     				const lonDelta = Math.abs(crd.longitude - lon)
     				const delta = latDelta + lonDelta
     				if (minDist > delta) {
     					minDist = delta
     					minPosition = i
     				}
     			}
     		}
     		console.log('min position ', minPosition, this.steps[minPosition].from.name)
   			this.stepPos = minPosition
   			this.setState({
   				stepPos: this.stepPos
   			})
   			this.deviateTicks = 0
   			return;
   		}

   		for (let i = this.stepPos; i < this.steps.length; i++) {
   			const dist = futureStepDist[i]
   			console.log(`future step ${i} distance: ${dist}`)
	   		if (dist !== null && dist <= 50) {
	   			this.stepPos = i + 1
	   			if (this.stepPos === this.steps.length) {
						const route = this.props.navigation.getParam('itenery')
	   				// reached destination
            this.setState({ navigationCompleteModal: true });
						// Add method call to update tasks
						let distanceTravelled = totalDistance(this.route, this.selectedRouteIndex)
						console.log(distanceTravelled[0], distanceTravelled[1], distanceTravelled[2])
						// WALK
						updateTask("WALK", distanceTravelled[0])
						// BUS
						updateTask("BUS", distanceTravelled[1])
						// SUBWAY
						updateTask("MRT", distanceTravelled[2])
	   				return
	   			}

	   			this.deviateTicks = 0
	   			this.setState({
	   				stepPos: this.stepPos
	   			})
	   			const step = this.steps[this.stepPos]
	   			console.log(`reached step ${this.stepPos}, target lat: ${step.from.lat}, long: ${step.from.lon}`);
	   			break
	   		}
   		}
   	},
   	(err) => {
   		console.warn('Failed to watch position ERROR(' + err.code + '): ' + err.message);
   	},
   	{
	  	enableHighAccuracy: true,
	  	maximumAge: 1000
		})
	}

	componentWillUnmount() {
		this._isMounted = false
		if (this.watchId !== null) {
			Geolocation.clearWatch(this.watchId)
		}
	}

	handleTrackingModeChange = (e) => {
		const {followUserMode} = e.nativeEvent.payload
		console.log('handleTrackingModeChange', followUserMode)
		this.setState({
			followingUser: !!followUserMode
		})
	}

	getInstructionText = () => {
		const step = this.steps[this.state.stepPos]
		let instruction = ''
		if (step.mode === "WALK") {
			let toName = step.to.name
			if (toName === 'path' && this.steps.length > 1) {
				toName = this.steps[1].from.name
			}
			instruction = `Walk ${step.distance}m to ${toName}`
		} else if (step.mode === "SUBWAY") {
			instruction = `Take train from ${extractStationCode(step.from.stopId)} ${step.from.name} to ${extractStationCode(step.to.stopId)} ${step.to.name}`
		} else if (step.mode === 'BUS') {
			instruction = `Take bus ${step.route} from ${step.from.name} to ${step.to.name}`
		}

		return <CardItem>
    	<Body>
    		<Text>{instruction}</Text>
    	</Body>
    </CardItem>
	}

	handleExit = () => {
		this.props.navigation.goBack()
	}

	handleRecenter = () => {
		if (!this._isMounted) return

		this.setState({followingUser: true})
		if (this.camera !== null) {
			this.camera.zoomTo(16)
		}
	}

  handleSubmitFeedback = () => {
    const origin = this.props.navigation.getParam('origin')
    const dest = this.props.navigation.getParam('dest')
    console.log(`Origin lat: ${origin[0]}, long: ${origin[1]}`)
    console.log(`Dest lat: ${dest[0]}, long: ${dest[1]}`)
    console.log(`Safety: ${this.state.safety}`)
    console.log(`Speed: ${this.state.speed}`)
    console.log(`Enjoyment: ${this.state.enjoyment}`)
    FeedbackManagement.submitFeedback(origin, dest, this.state.safety, this.state.speed, this.state.enjoyment)
      .then(() => {
        Alert.alert("Successfully submitted feedback");
      })
      .catch((e) => {
        Alert.alert("Failed to submit feedback, reason: " + e.message);
        console.log(`Failed to submit feedback, reason: ${e.message}`)
      })
  }

	render() {
		return <View style={MapCss.page}>
			<KeepAwake />
      <MapboxGL.MapView
      	style={MapCss.container}
      	onDidFinishRenderingMapFully={(r) => this.handleRecenter()}
    	>
        <MapboxGL.UserLocation />
        <MapboxGL.Camera
        	ref={(ref) => this.camera = ref}
        	defaultSettings={{
            centerCoordinate: [103.9406124,1.3279527],
        		zoomLevel: 16
          }}
        	onUserTrackingModeChange={this.handleTrackingModeChange}
        	followUserLocation={this.state.followingUser}
        	followUserMode={MapboxGL.UserTrackingModes.FollowWithCourse}
        />
        {this.routes.map((route, index) => {
          const step = this.steps[index]
        	return <MapboxGL.ShapeSource id={`line${index}`} shape={route} key={index}>
            <MapboxGL.LineLayer id={`lineLayer${index}`} style={getStepStyle(step.mode, this.selectedRouteIndex)} />
          </MapboxGL.ShapeSource>
        })}
      </MapboxGL.MapView>

			{this.steps.length > 0 && <Card style={MapCss.instructionCard}>
        {this.getInstructionText()}
      </Card>}

      <View style={MapCss.footer}>
	      {!this.state.followingUser && <Button style={MapCss.recenterButton} onPress={this.handleRecenter}>
	      	<Text>Re-center</Text>
				</Button>}

      	<View style={{
      		backgroundColor: 'white',
      		flexDirection: 'row'
      	}}>
	      	<Button style={{
	      		marginRight: 5
	      	}}
	      	onPress={this.handleExit}>
	      		<Text>X</Text>
	      	</Button>
	      	<View style={{flexDirection: 'column'}}>
	      		<Text>{this.travelTime}</Text>
	          <Text>Estimated Arrival: {this.estimatedArrival}</Text>
	      	</View>
      	</View>
      </View>
      <Modal
          width={0.9}
          visible={this.state.navigationCompleteModal}
          rounded
          actionsBordered
          modalAnimation={new ScaleAnimation()}
          onTouchOutside={() => {
            this.setState({ navigationCompleteModal: false });
            this.props.navigation.goBack();
          }}
          onHardwareBackPress={() => {
            console.log('onHardwareBackPress');
            this.setState({ navigationCompleteModal: false });
            this.props.navigation.goBack();
            return true;
          }}
          modalTitle={
            <ModalTitle
              title="You have reached your destination!"
              align="center"
            />
          }
          footer={
            <ModalFooter>
              <ModalButton text="CANCEL" bordered onPress={() => {
                  this.setState({ navigationCompleteModal: false });
      	   				this.props.navigation.goBack();
                }}
                key="navigationCompleteModal-1"
              />
              <ModalButton
                text="OK"
                bordered
                onPress={() => {
                  this.setState({ navigationCompleteModal: false });
                  this.setState({ feedbackModal: true });
                }}
                key="navigationCompleteModal-2"
              />
            </ModalFooter>
          }
        >
          <ModalContent
            style={{ backgroundColor: '#fff' }}
          >
            <Text>Would you like to tell us your thoughts on the journey?</Text>
            <Text>For e.g.(Safety, Speed and Enjoyment)</Text>
          </ModalContent>
        </Modal>
        <Modal
            width={0.9}
            visible={this.state.feedbackModal}
            rounded
            actionsBordered
            onHardwareBackPress={() => {
              console.log('onHardwareBackPress');
              this.setState({ feedbackModal: false });
              this.props.navigation.goBack();
              return true;
            }}
            modalTitle={
              <ModalTitle
                title="Feedback on journey"
                align="center"
              />
            }
            footer={
              <ModalFooter>
                <ModalButton text="CANCEL" bordered onPress={() => {
                    this.setState({ feedbackModal: false });
        	   				this.props.navigation.goBack();
                  }}
                  key="feedbackModal-1"
                />
                <ModalButton
                  text="SUBMIT"
                  bordered
                  onPress={() => {
                    this.setState({ feedbackModal: false });
                    {this.handleSubmitFeedback()}
        	   				this.props.navigation.goBack();
                  }}
                  key="feedbackModal-2"
                />
              </ModalFooter>
            }
          >
            <ModalContent
              style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'}}
            >
              <Text style= {{...GlobalCss.fontSizeXXSmall, ...GlobalCss.fontStyleBold}}>Safety</Text>
              <Stars
                default={3}
                count={5}
                half={true}
                update={(val)=>{this.setState({safety: val})}}
                starSize={35}
                fullStar={<Icon name={'star'} size={35} style={[MapCss.myStarStyle]}/>}
                emptyStar={<Icon name={'star-outline'} size={35} style={[MapCss.myStarStyle, MapCss.myEmptyStarStyle]}/>}
                halfStar={<Icon name={'star-half'} size={35} style={[MapCss.myStarStyle]}/>}
              />
              <Text style= {{...GlobalCss.fontSizeXXSmall, ...GlobalCss.fontStyleBold}}>Speed</Text>
              <Stars
                default={3}
                count={5}
                half={true}
                update={(val)=>{this.setState({speed: val})}}
                starSize={35}
                fullStar={<Icon name={'star'} size={35} style={[MapCss.myStarStyle]}/>}
                emptyStar={<Icon name={'star-outline'} size={35} style={[MapCss.myStarStyle, MapCss.myEmptyStarStyle]}/>}
                halfStar={<Icon name={'star-half'} size={35} style={[MapCss.myStarStyle]}/>}
              />
              <Text style= {{...GlobalCss.fontSizeXXSmall, ...GlobalCss.fontStyleBold}}>Enjoyment</Text>
              <Stars
                default={3}
                count={5}
                half={true}
                update={(val)=>{this.setState({enjoyment: val})}}
                starSize={35}
                fullStar={<Icon name={'star'} size={35} style={[MapCss.myStarStyle]}/>}
                emptyStar={<Icon name={'star-outline'} size={35} style={[MapCss.myStarStyle, MapCss.myEmptyStarStyle]}/>}
                halfStar={<Icon name={'star-half'} size={35} style={[MapCss.myStarStyle]}/>}
              />
            </ModalContent>
          </Modal>
    </View>
	}
}

export default NavigationView
