import { PermissionsAndroid } from "react-native";

export function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 +
          c(lat1 * p) * c(lat2 * p) *
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)) * 1000; // in meters
}

export function extractStationCode(stopId) {
	const parts = stopId.split(':')
	if (parts.length === 2) {
		return parts[1]
	}
	return ''
}

const ROUTE_COLORS = [
  ['#ff8f00', '#9d00ff', '#00bfff'],
  ['#0277bd', '#bda102', '#bd023d'],
  ['#5e35b1', '#88b135', '#b14935']
]

export function getStepStyle(mode, routeIndex) {
	let style
	if (mode === "WALK") {
    style = {
      lineDasharray: [3, 7],
      lineColor: ROUTE_COLORS[routeIndex][0]
    }
  } else if (mode === "BUS") {
    style = {
      lineColor: ROUTE_COLORS[routeIndex][1]
    }
  } else if (mode === "SUBWAY") {
    style = {
      lineColor:ROUTE_COLORS[routeIndex][2]
    }
  } else {
    style = {lineColor:'red'}
  }
  style.lineWidth = 5
  return style
}

export function stepSummary(step) {
  if (step.mode === 'WALK') {
      return `Walk ${Math.round(step.duration / 60)} mins`
  } else if (step.mode === 'SUBWAY') {
      return `${step.route} line`
  } else if (step.mode === 'BUS') {
      return `Bus ${step.route}`
  }
}

export function getRegionForCoordinates(points) {
  // points should be an array of { latitude: X, longitude: Y }
  let minX, maxX, minY, maxY;

  // init first point
  ((point) => {
    minX = point.latitude;
    maxX = point.latitude;
    minY = point.longitude;
    maxY = point.longitude;
  })(points[0]);

  // calculate rect
  points.map((point) => {
    minX = Math.min(minX, point.latitude);
    maxX = Math.max(maxX, point.latitude);
    minY = Math.min(minY, point.longitude);
    maxY = Math.max(maxY, point.longitude);
  });

  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const ne = [maxX, maxY]
  const sw = [minX, minY]

  return {
    latitude: midX,
    longitude: midY,
    ne,
    sw
  };
}

export default {
	distance,
	extractStationCode,
	getStepStyle
}

export async function requestLocationPermission() {

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Scrambled Tasks Location Permission',
        'message': 'Scrambled Tasks needs access to your location '
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return granted
    }
    else {
      Alert.alert("Location Permission Not Granted");
    }
  } catch (error) {
    console.warn(error)
  }
}
