import update from "react-addons-update";
import constants from "./actionConstants";
import { Dimensions, NetInfo } from "react-native";
import RNGooglePlaces from "react-native-google-places";
import Polyline from '@mapbox/polyline';
import request from "../../../util/request";
import calculateFare from "../../../util/fareCalculator";

//------------------------
//Constants
//------------------------
const { GET_CURRENT_LOCATION, 
		GET_INPUT, 
		TOGGLE_SEARCH_RESULT,
		GET_ADDRESS_PREDICTIONS,
		GET_SELECTED_ADDRESS,
		GET_DISTANCE_MATRIX,
		GET_FARE,
		GET_SELECTED_VEHICLE,
		GET_NEARBY_DRIVERS,
		UPDATE_SEARCH_ADDRESS_LOADING_STATUS,
		CLOSE_RESULT_TYPE,
		GET_DIRECTIONS,
		IS_MAP_READY,
		RESET_BOOKING
	} = constants;

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;

//------------------------
//Actions
//------------------------
export function resetBooking(payload) {
	return {
		type: RESET_BOOKING,
		payload
	}
}

export function closeResultType(payload) {
	return(dispatch, store) => {
		dispatch({
				type: CLOSE_RESULT_TYPE,
				payload
			}
		)
	}
}

export function updateSearchAddressLoadingStatus() {
	return (dispatch) => {
		type: UPDATE_SEARCH_ADDRESS_LOADING_STATUS,
		payload
	}
}

export function getCurrentLocation(){
	return(dispatch) => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				dispatch({
					type: GET_CURRENT_LOCATION,
					payload: position
				});

				dispatch({
					type: IS_MAP_READY,
					payload: true
				});
			},
			(error) => console.log(error.message),
			{enableHighAccuracy: false, timeout: 20000, maximumAge:1000}
		);
	}
}

//Get user input
export function getInputData(payload) {
	return{
		type: GET_INPUT,
		payload
	}
}

//Toggle search result modal
export function toggleSearchResultmodal(payload) {
	return{
		type: TOGGLE_SEARCH_RESULT,
		payload
	}
}

//Get addresses from google place
export function getAddressPredictions() {
	return(dispatch, store) => {
		let userInput = store().home.resultTypes.pickUp ? store().home.inputData.pickUp : store().home.inputData.dropOff;
		if (userInput != "") {
			dispatch({
				type: UPDATE_SEARCH_ADDRESS_LOADING_STATUS,
				payload: true
			})

			dispatch({
				type: GET_ADDRESS_PREDICTIONS,
				payload: {}
			})
			RNGooglePlaces.getAutocompletePredictions(userInput,
				{
					country: "PH"
				}
			)
			.then((results) =>
				dispatch({
							type: GET_ADDRESS_PREDICTIONS,
							payload: results
						}
					)
			)
			.then(() => dispatch({
				type: UPDATE_SEARCH_ADDRESS_LOADING_STATUS,
				payload: false
			}))
			.catch((error) => console.log(error.message))
		}
	};
}

//Get selected address
export function getSelectedAddress(payload) {
	// const dummyNumbers = {
	// 	baseFare: 0.4,
	// 	timeRate: 0.14,
	// 	distanceRate: 0.97,
	// 	surge: 1
	// }

	return (dispatch, store) => {
		RNGooglePlaces.lookUpPlaceByID(payload)
		.then((results) => {
			dispatch({
				type: GET_SELECTED_ADDRESS,
				payload: results
			})
		})
		.then(() => {
			//Get the distance and time
			if(store().home.selectedAddress.selectedPickUp && store().home.selectedAddress.selectedDropOff){
				NetInfo.isConnected.fetch().then(isConnected => {
					if(isConnected) {
						request.get("https://maps.googleapis.com/maps/api/distancematrix/json")
						.query({
							origins:store().home.selectedAddress.selectedPickUp.latitude + "," + store().home.selectedAddress.selectedPickUp.longitude,
							destinations:store().home.selectedAddress.selectedDropOff.latitude + "," + store().home.selectedAddress.selectedDropOff.longitude,
							mode: "driving",
							key: "AIzaSyBNDEF41tmSDitm8r73vTGbUviVpKC1XiM"
						})
						.finish((error, res)=>{
							dispatch({
								type:GET_DISTANCE_MATRIX,
								payload:res.body
							});
						})

						// request.get("https://maps.googleapis.com/maps/api/directions/json")
						// .query({
						// 	origin:store().home.selectedAddress.selectedPickUp.latitude + "," + store().home.selectedAddress.selectedPickUp.longitude,
						// 	destination:store().home.selectedAddress.selectedDropOff.latitude + "," + store().home.selectedAddress.selectedDropOff.longitude
						// })
						// .finish((error, res)=>{
						// 	let points = Polyline.decode(res.body.routes[0].overview_polyline.points);
						// 	let coords = points.map((point, index) => {
						// 		return  {
						// 			latitude : point[0],
						// 			longitude : point[1]
						// 		}
						// 	})
						// 	dispatch({
						// 		type:GET_DIRECTIONS,
						// 		payload:coords
						// 	});
						// })

						setTimeout(function() {
							if(store().home.selectedAddress.selectedPickUp && store().home.selectedAddress.selectedDropOff){
								// const fare = calculateFare(
								// 	dummyNumbers.baseFare,
								// 	dummyNumbers.timeRate,
								// 	store().home.distanceMatrix.rows[0].elements[0].duration.value,
								// 	dummyNumbers.distanceRate,
								// 	store().home.distanceMatrix.rows[0].elements[0].distance.value,
								// 	dummyNumbers.surge,
								// 	store().home.selectedVehicle
								// );

								const fare = calculateFare(
									store().home.distanceMatrix.rows[0].elements[0].duration.value,
									store().home.distanceMatrix.rows[0].elements[0].distance.value,
									store().home.selectedVehicle
								);

								dispatch({
									type: GET_FARE,
									payload: fare
								})
							}
						}, 2000)
					} else {
						Alert.alert('Error', "Please connect to the internet");
					}
				});
			}
		})
		.catch((error) => console.log(error.message));
	}
}

export function getSelectedVehicle(payload) {
	// const dummyNumbers = {
	// 	baseFare: 0.4,
	// 	timeRate: 0.14,
	// 	distanceRate: 0.97,
	// 	surge: 1
	// }

	return(dispatch, store) => {
		dispatch({
			type: GET_SELECTED_VEHICLE,
			payload
		})

		if(store().home.selectedAddress.selectedPickUp && store().home.selectedAddress.selectedDropOff){
			// const fare = calculateFare(
			// 	dummyNumbers.baseFare,
			// 	dummyNumbers.timeRate,
			// 	store().home.distanceMatrix.rows[0].elements[0].duration.value,
			// 	dummyNumbers.distanceRate,
			// 	store().home.distanceMatrix.rows[0].elements[0].distance.value,
			// 	dummyNumbers.surge,
			// 	store().home.selectedVehicle
			// );

			const fare = calculateFare(
				store().home.distanceMatrix.rows[0].elements[0].duration.value,
				store().home.distanceMatrix.rows[0].elements[0].distance.value,
				store().home.selectedVehicle
			);

			dispatch({
				type: GET_FARE,
				payload: fare
			})
		}
	}
}

// Get nearby drivers
export function getNearByDrivers(){
	return(dispatch, store)=>{
		NetInfo.isConnected.fetch().then(isConnected => {
			if(isConnected) {
				request.get("http://52.220.212.6:3121/api/driverLocation")
				.query({
					latitude:store().home.region.latitude,
					longitude:store().home.region.longitude	
				})
				.finish((error, res)=>{
					if(res){
						dispatch({
							type:GET_NEARBY_DRIVERS,
							payload:res.body
						});
					}
				});
			} else {
				Alert.alert('Error', "Please connect to the internet");
			}
		});
	};
}

//------------------------
//Action Handlers
//------------------------
function handleGetDirections(state, action) {
	return update(state, {
		directions: {
			$set: action.payload
		}
	})
}

function handleCloseResultType(state, action) {
	return update(state, {
		resultTypes: {
			pickUp: {
				$set: false
			},
			dropOff: {
				$set: false
			}
		}
	})
}

function handleUpdateSearchAddressLoadingStatus(state, action) {
	return update(state, {
		isSearchAddressLoading:{
			$set: action.payload	
		}
	})
}

function handleGetCurrentLocation(state, action){
	return update(state, {
		region:{
			latitude:{
				$set: action.payload.coords.latitude
			},
			longitude:{
				$set: action.payload.coords.longitude
			},
			latitudeDelta:{
				$set: LATITUDE_DELTA
			},
			longitudeDelta:{
				$set: LONGITUDE_DELTA
			}
		}
	})
}

function handleGetInputData(state, action){
	const { key, value } = action.payload;
	return update(state, {
		inputData: {
			[key]: {
				$set:value
			}
		}
	});
}

function handleToggleSearchResult(state, action){
	if(action.payload === "pickUp") {
		return update(state, {
			resultTypes: {
				pickUp: {
					$set: true,
				},
				dropOff: {
					$set: false
				}
			},
			predictions: {
				$set: {}
			},
			selectedAddress: {
				selectedPickUp: {
					$set: null
				}
			},
			fare: {
				$set: null
			}
		})
	}

	if(action.payload === "dropOff") {
		return update(state, {
			resultTypes: {
				pickUp: {
					$set: false,
				},
				dropOff: {
					$set: true
				}
			},
			predictions: {
				$set: {}
			},
			selectedAddress: {
				selectedDropOff: {
					$set: null
				}
			},
			fare: {
				$set: null
			}
		})
	}
}

function handleGetAddressPredictions(state, action) {
	return update(state, {
		predictions: {
			$set: action.payload
		}
	})
}

function handleGetSelectedAddress(state, action) {
	let selectedTitle = state.resultTypes.pickUp ? "selectedPickUp" : "selectedDropOff";
	return update(state, {
		selectedAddress: {
			[selectedTitle]:{
				$set: action.payload
			}
		},
		resultTypes: {
			pickUp: {
				$set: false
			},
			dropOff: {
				$set: false
			}
		}
	})
}

function handleGetDistanceMatrix(state, action) {
	return update(state, {
		distanceMatrix: {
			$set: action.payload
		}
	})
}

function handleGetFare(state, action) {
	return update(state, {
		fare: {
			$set: action.payload
		}
	})
}

function handleGetSelectedVehicle(state, action) {
	return update(state, {
		selectedVehicle: {
			$set: action.payload
		}
	})
}

//Handle get nearby drivers
function handleGetNearbyDrivers(state, action){
	return update(state, {
		nearByDrivers:{
			$set:action.payload
		}
	});
}

function handleIsMapReady(state, action) {
	return update(state, {
		isMapReady:{
			$set:action.payload
		}
	});
}

function handleResetBooking(state, action) {
	return update(state, {
		inputData:{
			$set: {}
		},
		resultTypes:{
			$set: {}
		},
		selectedAddress:{
			$set: {}
		},
		selectedVehicle:{
			$set: "motorcycle"
		},
		fare: {
			$set: null
		},
		resetStatus: {
			$set: true
		}
	});
}

const ACTION_HANDLERS = {
	GET_CURRENT_LOCATION: handleGetCurrentLocation,
	GET_INPUT: handleGetInputData,
	TOGGLE_SEARCH_RESULT: handleToggleSearchResult,
	GET_ADDRESS_PREDICTIONS: handleGetAddressPredictions,
	GET_SELECTED_ADDRESS: handleGetSelectedAddress,
	GET_DISTANCE_MATRIX: handleGetDistanceMatrix,
	GET_FARE: handleGetFare,
	GET_SELECTED_VEHICLE: handleGetSelectedVehicle,
	GET_NEARBY_DRIVERS:handleGetNearbyDrivers,
	UPDATE_SEARCH_ADDRESS_LOADING_STATUS:handleUpdateSearchAddressLoadingStatus,
	CLOSE_RESULT_TYPE:handleCloseResultType,
	GET_DIRECTIONS:handleGetDirections,
	IS_MAP_READY: handleIsMapReady,
	RESET_BOOKING: handleResetBooking
}

const initialState = {
	region: {},
	inputData: {},
	resultTypes: {},
	selectedAddress: {},
	selectedVehicle: "motorcycle",
	isSearchAddressLoading: false,
	isMapReady: false,
	resetStatus: false
};

export function HomeReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
