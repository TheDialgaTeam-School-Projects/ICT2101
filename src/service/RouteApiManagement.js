const axios = require('axios')
const BASE_URL = 'https://developers.onemap.sg/'
let auth = null


function format2d(num) {
	if (num < 10) {
		return '0' + num
	}
	return num
}

function dateNow() {
	const now = new Date();
	return `${format2d(now.getYear())}-${format2d(now.getMonth())}-${format2d(now.getDate())}`
}

function timeNow() {
	const now = new Date();
	return `${format2d(now.getHours())}:${format2d(now.getMinutes())}`
}

export function initRouteApi() {
	if (auth !== null && new Date().getTime() < auth.expiry_timestamp) {
		return
	}

    const config = {
	    method: 'post',
	    url: BASE_URL + 'privateapi/auth/post/getToken',
	    data: {
	    	email: 'ongdexing@gmail.com',
	    	password: 'qwer1234'
	    },
	    header: {
        	'Content-Type': 'multipart/form-data',
        },
    }
	axios.request(config)
		.then(response => {
			auth = response.data
			// findRoute([1.3803409,103.8480833], [1.3276919,103.9407637])
			// 	.then(res => console.log(res))
		})
		.catch(error => {
			console.log(error)
		})
}

export function findRoute(start, end) {
	const config = {
		url: BASE_URL + 'privateapi/routingsvc/route',
		params: {
			start: start.join(','),
			end: end.join(','),
			token: auth.access_token,
			routeType: 'pt',
			mode: 'transit',
			numItineraries: 3,
			date: dateNow(),
			time: timeNow()
		},
	}
	return axios.request(config)
}

export function findLatLng(keywords) {
	const config = {
	    url: BASE_URL + 'commonapi/search',
	    params: {
	        searchVal: keywords,
	        returnGeom: 'Y',
	        getAddrDetails: 'Y',
	        pageNum: 1
	    }
	};
	return axios.request(config)
}

// returns the distance for first + last mile
export function distanceWalked(route) {
	const itenery = result.plan.itineraries[0]
	const firstStep = itenery.legs[0]
	const lastStep = itenery[itenery.legs.length - 1]
	let dist = 0
	if (firstStep.mode === "WALK") {
		dist += firstStep.distance
	}

	if (lastStep.mode === "WALK") {
		dist += lastStep.distance
	}
	return parseFloat(dist.toFixed(2))
}

// returns the distance for first + last mile
export function totalDistance(route, index) {
	let i = 0
	let distWalk = 0
	let distBus = 0
	let distSubway = 0
	const itenery = route.plan.itineraries[index]

	for (i = 0; i < itenery.legs.length; i++) {
		if(itenery.legs[i].mode === "WALK"){
			distWalk += itenery.legs[i].distance
		}
		else if(itenery.legs[i].mode === "BUS"){
			distBus += itenery.legs[i].distance
		}
		else if (itenery.legs[i].mode === "SUBWAY") {
			distSubway += itenery.legs[i].distance
		}
	}
	console.log("WALK: " +  parseInt(distWalk.toFixed(2)).toString())
	console.log("BUS: " +  parseInt(distBus.toFixed(2)).toString())
	console.log("SUBWAY: " +  parseInt(distSubway.toFixed(2)).toString())
	let totalDistance = [parseInt(distWalk.toFixed(2)), parseInt(distBus.toFixed(2)), parseInt(distSubway.toFixed(2))]
	return totalDistance
}
