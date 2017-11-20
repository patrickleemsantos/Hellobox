import update from "react-addons-update";
import constants from "./actionConstants";
import { Dimensions } from "react-native";
import RNGooglePlaces from "react-native-google-places";
import request from "../../../util/request";

//------------------------
//Constants
//------------------------
const { 
		SET_CURRENT_BOOKING,
		UPDATE_BOOKING,
		UPDATE_BOOKING_HISTORY,
		UPDATE_LOADER
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

function handleEmitBookingHistory(state, action) {
	if (state.currentBooking) {
		if (state.currentBooking.booking_id === action.payload.booking_id) {
			return update(state, {
				bookingHistory: {
					$set: action.payload.booking_history
				}
			})
		}
	} else {
		return update(state, {
			currentBooking: {
				$set: null
			}
		})
	}
}

const ACTION_HANDLERS = {
	SET_CURRENT_BOOKING: handleSetCurrentBooking,
	UPDATE_BOOKING: handleUpdateBooking,
	UPDATE_BOOKING_HISTORY: handleUpdateBookingHistory,
	EMIT_BOOKING_HISTORY: handleEmitBookingHistory,
	UPDATE_LOADER: handleUpdateLoader
}

const initialState = {
	showLoader: false
};

export function BookingDetailReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
