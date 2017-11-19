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

const ACTION_HANDLERS = {
	SET_CURRENT_BOOKING: handleSetCurrentBooking,
	UPDATE_BOOKING: handleUpdateBooking,
	UPDATE_LOADER: handleUpdateLoader
}

const initialState = {
	currentBooking: {},
	showLoader: false
};

export function BookingDetailReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
