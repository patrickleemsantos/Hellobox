import update from "react-addons-update";
import constants from "./actionConstants";
import { Dimensions } from "react-native";
import RNGooglePlaces from "react-native-google-places";
import request from "../../../util/request";

//------------------------
//Constants
//------------------------
const { 
		
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

export function setShowMapTrackModal(payload) {
	return {
		type: SHOW_MAP_TRACK_MODAL,
		payload
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
		}
	}
}

export function trackDriver() {
	return (dispatch, store)=>{
		let id = store().bookingDetail.currentBooking.driver.driver_id;
		request.get("http://52.220.212.6:3121/api/getCurrentDriverLocation/" + id)
		.finish((error, res)=>{
			dispatch({
				type:UPDATE_DRIVER_LOCATION,
				payload:res.body
			});
		});
	}
}

export function getBookingHistory(payload) {
	return(dispatch, store) => {
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
	}
}

export function updateBookingStatus(payload) {
	return(dispatch, store) => {
		dispatch({
			type: UPDATE_LOADER,
			payload: true
		});
		
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

			dispatch({
				type: UPDATE_LOADER,
				payload: false
			});
		});
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

const ACTION_HANDLERS = {
	
}

const initialState = {
	
};

export function AdditionalServicesReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
