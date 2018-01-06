import update from "react-addons-update";
import constants from "./actionConstants";
import { Dimensions, NetInfo, Platform } from "react-native";
import RNGooglePlaces from "react-native-google-places";
import request from "../../../util/request";

//------------------------
//Constants
//------------------------
const { 
		SET_CURRENT_BOOKING,
		UPDATE_BOOKING,
		UPDATE_BOOKING_HISTORY,
		UPDATE_LOADER,
		SHOW_RATING_MODAL,
		SHOW_MAP_TRACK_MODAL,
		SET_SELECTED_STAR,
		GET_COMMENT,
		UPDATE_DRIVER_LOCATION,
		SET_TRACK_TIMER
	} = constants;

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;

//------------------------
//Actions
//------------------------
//Get username
export function setCurrentBooking(payload) {
	return {
		type: SET_CURRENT_BOOKING,
		payload
	}
}

export function setShowRatingModal(payload) {
	return {
		type: SHOW_RATING_MODAL,
		payload
	}
}

export function setTrackTimer(payload) {
	return {
		type: SET_TRACK_TIMER,
		payload
	}
}

export function setShowMapTrackModal(payload) {
	// return {
	// 	type: SHOW_MAP_TRACK_MODAL,
	// 	payload
	// }

	return (dispatch, store)=>{
		if (Platform.OS === 'ios') {
			// NetInfo.addEventListener('change',
			// 	(networkType)=> {
			// 		if (networkType == 'wifi' || networkType == 'cell') {
						let id = store().bookingDetail.currentBooking.driver.driver_id;
						request.get("http://52.220.212.6:3121/api/getCurrentDriverLocation/" + id)
						.finish((error, res)=>{
							dispatch({
								type:UPDATE_DRIVER_LOCATION,
								payload:res.body
							});
						});
		
						dispatch({
							type: SHOW_MAP_TRACK_MODAL,
							payload
						});
			// 		} else {
			// 			Alert.alert('Error', "Please connect to the internet");
			// 		}
			// 	}
			// )
		} else {
			NetInfo.isConnected.fetch().then(isConnected => {
				if(isConnected) {
					let id = store().bookingDetail.currentBooking.driver.driver_id;
					request.get("http://52.220.212.6:3121/api/getCurrentDriverLocation/" + id)
					.finish((error, res)=>{
						dispatch({
							type:UPDATE_DRIVER_LOCATION,
							payload:res.body
						});
					});
	
					dispatch({
						type: SHOW_MAP_TRACK_MODAL,
						payload
					});
				} else {
					Alert.alert('Error', "Please connect to the internet");
				}
			});
		}
	}
}

export function setSelectedStar(payload) {
	return {
		type: SET_SELECTED_STAR,
		payload
	}
}

export function getComment(payload) {
	return {
		type: GET_COMMENT,
		payload
	}
}

export function saveComment() {
	return(dispatch, store) => {
		if (store().bookingDetail.rating !== 0 && store().bookingDetail.comment !== "") {
			if (Platform.OS === 'ios') {
				// NetInfo.addEventListener('change',
				// 	(networkType)=> {
				// 		if (networkType == 'wifi' || networkType == 'cell') {
							request.put("http://52.220.212.6:3121/api/updateBookingRating")
							.send({
								id: store().bookingDetail.currentBooking._id,
								rating: parseInt(store().bookingDetail.selectedStar),
								comment: store().bookingDetail.comment
							})
							.finish((error, res)=> {
								dispatch({
									type: SET_CURRENT_BOOKING,
									payload: res.body
								});
		
								dispatch({
									type: SHOW_RATING_MODAL,
									payload: false
								});
							});
				// 		} else {
				// 			Alert.alert('Error', "Please connect to the internet");
				// 		}
				// 	}
				// )
			} else {
				NetInfo.isConnected.fetch().then(isConnected => {
					if(isConnected) {
						request.put("http://52.220.212.6:3121/api/updateBookingRating")
						.send({
							id: store().bookingDetail.currentBooking._id,
							rating: store().bookingDetail.selectedStar,
							comment: store().bookingDetail.comment
						})
						.finish((error, res)=> {
							dispatch({
								type: SET_CURRENT_BOOKING,
								payload: res.body
							});
	
							dispatch({
								type: SHOW_RATING_MODAL,
								payload: false
							});
						});
					} else {
						Alert.alert('Error', "Please connect to the internet");
					}
				});
			}
		}
	}
}

export function trackDriver() {
	return (dispatch, store)=>{
		if (Platform.OS === 'ios') {
			// NetInfo.addEventListener('change',
			// 	(networkType)=> {
			// 		if (networkType == 'wifi' || networkType == 'cell') {
						let id = store().bookingDetail.currentBooking.driver.driver_id;
						request.get("http://52.220.212.6:3121/api/getCurrentDriverLocation/" + id)
						.finish((error, res)=>{
							dispatch({
								type:UPDATE_DRIVER_LOCATION,
								payload:res.body
							});
						});
			// 		} else {
			// 			Alert.alert('Error', "Please connect to the internet");
			// 		}
			// 	}
			// )
		} else {
			NetInfo.isConnected.fetch().then(isConnected => {
				if(isConnected) {
					let id = store().bookingDetail.currentBooking.driver.driver_id;
					request.get("http://52.220.212.6:3121/api/getCurrentDriverLocation/" + id)
					.finish((error, res)=>{
						dispatch({
							type:UPDATE_DRIVER_LOCATION,
							payload:res.body
						});
					});
				} else {
					Alert.alert('Error', "Please connect to the internet");
				}
			});
		}
	}
}

export function getBookingHistory(payload) {
	return(dispatch, store) => {
		if (Platform.OS === 'ios') {
			// NetInfo.addEventListener('change',
			// 	(networkType)=> {
			// 		if (networkType == 'wifi' || networkType == 'cell') {
						request.get("http://52.220.212.6:3121/api/getBookingHistory")
						.query({
							booking_id: payload,
						})
						.finish((error, res)=>{
							if(res){
								dispatch({
									type:UPDATE_BOOKING_HISTORY,
									payload:res.body
								});
							}
						});
			// 		}
			// 	}
			// )
		} else {
			NetInfo.isConnected.fetch().then(isConnected => {
				if(isConnected) {
					request.get("http://52.220.212.6:3121/api/getBookingHistory")
					.query({
						booking_id: payload,
					})
					.finish((error, res)=>{
						if(res){
							dispatch({
								type:UPDATE_BOOKING_HISTORY,
								payload:res.body
							});
						}
					});
				} else {
					Alert.alert('Error', "Please connect to the internet");
				}
			});
		}
	}
}

export function updateBookingStatus(payload) {
	return(dispatch, store) => {
		dispatch({
			type: UPDATE_LOADER,
			payload: true
		});
		
		if (Platform.OS === 'ios') {
			// NetInfo.addEventListener('change',
			// 	(networkType)=> {
			// 		if (networkType == 'wifi' || networkType == 'cell') {
						request.put("http://52.220.212.6:3121/api/updateBookingStatus")
						.send({
							id: store().bookingDetail.currentBooking._id,
							status: payload
						})
						.finish((error, res)=> {
							dispatch({
								type: UPDATE_BOOKING,
								payload: res.body
							});
						});
					// } else {
					// 	Alert.alert('Error', "Please connect to the internet");
					// }

					dispatch({
						type: UPDATE_LOADER,
						payload: false
					});
			// 	}
			// )
		} else {
			NetInfo.isConnected.fetch().then(isConnected => {
				if(isConnected) {
					request.put("http://52.220.212.6:3121/api/updateBookingStatus")
					.send({
						id: store().bookingDetail.currentBooking._id,
						status: payload
					})
					.finish((error, res)=> {
						dispatch({
							type: UPDATE_BOOKING,
							payload: res.body
						});
					});
				} else {
					Alert.alert('Error', "Please connect to the internet");
				}
	
				dispatch({
					type: UPDATE_LOADER,
					payload: false
				});
			});
		}
	}
}

//------------------------
//Action Handlers
//------------------------
function handleSetCurrentBooking(state, action) {
	return update(state, {
		currentBooking: {
			$set: action.payload
		}
	})
}

function handleUpdateBooking(state, action) {
	return update(state, {
		currentBooking: {
			$set: action.payload
		}
	})
}

function handleUpdateLoader(state, action) {
	return update(state, {
		showLoader: {
			$set: action.payload
		}
	})
}

function handleUpdateBookingHistory(state, action) {
	return update(state, {
		bookingHistory: {
			$set: action.payload
		}
	})
}

function handleShowRatingModal(state, action) {
	return update(state, {
		showRatingModal: {
			$set: action.payload
		}
	})
}

function handleMapTrackModal(state, action) {
	return update(state, {
		showMapTrackModal: {
			$set: action.payload
		}
	})
}

function handleSelectedStar(state, action) {
	return update(state, {
		selectedStar: {
			$set: action.payload
		}
	})
}

function handleGetComment(state, action) {
	return update(state, {
		comment: {
			$set: action.payload
		}
	})
}

function handleBookingOnMyWay(state, action) {
	return update(state, {
		currentBooking: {
			$set: action.payload
		}
	})
}

function handleBookingLoadedAndDeliveryStarted(state, action) {
	return update(state, {
		currentBooking: {
			$set: action.payload
		}
	})
}

function handleBookingArrivedAtDeliveryLocation(state, action) {
	return update(state, {
		currentBooking: {
			$set: action.payload
		}
	})
}

function handleBookingJobCompleted(state, action) {
	return update(state, {
		currentBooking: {
			$set: action.payload
		}
	})
}

function handleUpdateDriverLocation(state, action) {
	return update(state, {
		currentDriverLocation: {
			$set: action.payload
		}
	})
}

function handleSetTrackTimer(state, action) {
	return update(state, {
		trackTimer: {
			$set: action.payload
		}
	})
}

function handleEmitBookingHistory(state, action) {
	if (state.currentBooking) {
		if (state.currentBooking.booking_id === action.payload.booking_id) {
			return update(state, {
				bookingHistory: {
					$set: action.payload.booking_history
				}
			})
		} else {
			return update(state, {
				bookingHistory: {
					$set: {}
				}
			})
		}
	} else {
		return update(state, {
			bookingHistory: {
				$set: {}
			}
		})
	}
}

const ACTION_HANDLERS = {
	SET_CURRENT_BOOKING: handleSetCurrentBooking,
	UPDATE_BOOKING: handleUpdateBooking,
	UPDATE_BOOKING_HISTORY: handleUpdateBookingHistory,
	EMIT_BOOKING_HISTORY: handleEmitBookingHistory,
	UPDATE_LOADER: handleUpdateLoader,
	SHOW_RATING_MODAL: handleShowRatingModal,
	SHOW_MAP_TRACK_MODAL: handleMapTrackModal,
	SET_SELECTED_STAR: handleSelectedStar,
	GET_COMMENT: handleGetComment,
	UPDATE_DRIVER_LOCATION: handleUpdateDriverLocation,
	BOOKING_ON_MY_WAY: handleBookingOnMyWay,
	BOOKING_LOADED_AND_DELIVERY_STARTED: handleBookingLoadedAndDeliveryStarted,
	BOOKING_ARRIVED_AT_DELIVERY_LOCATION: handleBookingArrivedAtDeliveryLocation,
	BOOKING_JOB_COMPLETED: handleBookingJobCompleted,
	SET_TRACK_TIMER: handleSetTrackTimer
}

const initialState = {
	showLoader: false,
	showRatingModal: false,
	showMapTrackModal: false,
	selectedStar: 0,
	comment: ""
};

export function BookingDetailReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
