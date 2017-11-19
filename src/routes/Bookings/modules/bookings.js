import update from "react-addons-update";
import constants from "./actionConstants";
import { Dimensions } from "react-native"

import request from "../../../util/request";

//--------------------
//Constants
//--------------------
const { 
	GET_BOOKINGS,
	UPDATE_BOOKING_LOADER,
	CLEAR_BOOKINGS
} = constants;

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA

//--------------------
//Actions
//--------------------
export function getBookings(payload) {
	return(dispatch)=>{
		dispatch({
			type:CLEAR_BOOKINGS,
			payload
		});

		dispatch({
			type:UPDATE_BOOKING_LOADER,
			payload:true
		});

		request.get("http://52.220.212.6:3121/api/bookingsByAccount")
		.query({
			account_id: payload,
		})
		.finish((error, res)=>{
			if(res){
				dispatch({
					type:GET_BOOKINGS,
					payload:res.body
				});

				dispatch({
					type:UPDATE_BOOKING_LOADER,
					payload:false
				});
			}
		});
	};
}

//--------------------
//Action Handlers
//--------------------
function handleGetBookings(state, action) {
	return update(state, {
		bookings: {
			$set: action.payload
		}
	})
}

function handleBookingLoader(state, action) {
	return update(state, {
		showBookingLoader:{
			$set:action.payload
		}
	});
}

function handleClearBookings(state, action) {
	return update(state, {
		bookings:{
			$set: {}
		}
	});
}

const ACTION_HANDLERS = {
	GET_BOOKINGS: handleGetBookings,
	UPDATE_BOOKING_LOADER: handleBookingLoader,
	CLEAR_BOOKINGS: handleClearBookings
}

const initialState = {
	bookings: {},
	showBookingLoader: false
};

export function BookingsReducer (state = initialState, action){
	const handler = ACTION_HANDLERS[action.type];

	return handler ? handler(state, action) : state;
}