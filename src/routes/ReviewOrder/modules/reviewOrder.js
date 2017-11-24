import update from "react-addons-update";
import constants from "./actionConstants";
import { Dimensions } from "react-native";
import RNGooglePlaces from "react-native-google-places";
import request from "../../../util/request";

//------------------------
//Constants
//------------------------
const { 
		BOOK_CAR,
		UPDATE_BOOKING_STATUS,
		// REMOVE_BOOKING
	} = constants;

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;

//------------------------
//Actions
//------------------------
//Book Car
export function bookCar(payload) {
	var randomize = require('randomatic');

	return (dispatch, store) => {
		const nearByDrivers = store().home.nearByDrivers;
		const nearByDriver = nearByDrivers[Math.floor(Math.random() * nearByDrivers.length)];
		const payload = {
			data:{
				booking_id: randomize('0000'),
				account:{
					account_id: store().login.account.account_id,
					date_of_birth: store().login.account.date_of_birth,
					first_name: store().login.account.first_name,
					last_name: store().login.account.last_name,
					profile_picture: store().login.account.profile_picture,
					rating: store().login.account.rating
				},
				driver: nearByDriver.driver,
				pick_up:{
					address:store().home.selectedAddress.selectedPickUp.address,
					name:store().home.selectedAddress.selectedPickUp.name,
					latitude:store().home.selectedAddress.selectedPickUp.latitude,
					longitude:store().home.selectedAddress.selectedPickUp.longitude
				},
				drop_off:{
					address:store().home.selectedAddress.selectedDropOff.address,
					name:store().home.selectedAddress.selectedDropOff.name,
					latitude:store().home.selectedAddress.selectedDropOff.latitude,
					longitude:store().home.selectedAddress.selectedDropOff.longitude
				},
				vehicle:store().home.selectedVehicle,
				fare:store().home.fare,
				additional_price:store().additionalServices.additionalPrice,
				additional_services:store().additionalServices.additionalServices,
				status:"PENDING",
				rating: 0,
				pick_up_date: store().additionalServices.pickUpDateTime,
				note: store().additionalServices.bookingNote,
				timestamp: new Date().toLocaleString()
			},
			nearByDriver: {
				socket_id: nearByDriver.socket_id,
				driver_id: nearByDriver.driver_id,
				latitude: nearByDriver.coordinate.coordinates[1],
				longitude: nearByDriver.coordinate.coordinates[0]
			}
		};

		request.post("http://52.220.212.6:3121/api/bookings")
		.send(payload)
		.finish((error, res)=>{
			dispatch({
				type:BOOK_CAR,
				payload:res.body
			});
		});
	}
}

// Cancel Booking
export function updateBookingStatus(payload) {
	return(dispatch, store) => {
		request.put("http://52.220.212.6:3121/api/updateBookingStatus")
		.send({
			id: store().reviewOrder.booking._id,
			status: payload
		})
		.finish((error, res)=> {
			dispatch({
				type: UPDATE_BOOKING_STATUS,
				payload: res.body
			})
		});
	}
}

// export function removeBooking(payload) {
// 	return{
// 		type: REMOVE_BOOKING,
// 		payload
// 	}
// }

//------------------------
//Action Handlers
//------------------------
// Handle book car
function handleBookCar(state, action) {
	return update(state, {
		booking: {
			$set: action.payload
		}
	})
}

function handleBookingApproved(state, action) {
	return update(state, {
		booking: {
			$set: action.payload
		}
	})
}

function handleUpdateBookingStatus(state, action) {
	return update(state, {
		booking: {
			$set: action.payload
		}
	})
}

// Handle remove booking
// function handleRemoveBooking(state, action) {
// 	return update(state, {
// 		booking: {
// 			$set: {}
// 		},
// 		selectedAddress: {
// 			$set: {}
// 		},
// 		fare: {
// 			$set: null
// 		}
// 	});
// }

const ACTION_HANDLERS = {
	BOOK_CAR: handleBookCar,
	BOOKING_APPROVED: handleBookingApproved,
	UPDATE_BOOKING_STATUS: handleUpdateBookingStatus,
	// REMOVE_BOOKING: handleRemoveBooking
}

const initialState = {

};

export function ReviewOrderReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
