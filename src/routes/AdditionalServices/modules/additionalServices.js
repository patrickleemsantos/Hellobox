import update from "react-addons-update";
import constants from "./actionConstants";
import { Dimensions } from "react-native";
import RNGooglePlaces from "react-native-google-places";
import request from "../../../util/request";
var dateFormat = require('dateformat');

//------------------------
//Constants
//------------------------
const { 
		ADD_ADDITIONAL_PRICE,
		REMOVE_ADDITIONAL_PRICE,
		GET_ADDITIONAL_SERVICES,
		REMOVE_ADDITIONAL_SERVICES,
		ADDITIONAL_SERVICE_1,
		ADDITIONAL_SERVICE_2,
		ADDITIONAL_SERVICE_3,
		ADDITIONAL_SERVICE_4,
		ADDITIONAL_SERVICE_5,
		ADDITIONAL_SERVICE_6,
		UPDATE_ADDITIONAL_SERVICE,
		SET_PICKUP_DATE_TIME,
		SET_BOOKING_NOTE,
		RESET_ADDITIONAL_SERVICES
	} = constants;

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;

//------------------------
//Actions
//------------------------
export function resetAdditionalServices(payload) {
	return (dispatch) => {
		dispatch({
			type: RESET_ADDITIONAL_SERVICES,
			payload: payload
		})
	}
}

export function setPickUpDateTime(payload) {
	return {
		type: SET_PICKUP_DATE_TIME,
		payload
	}
}

export function setBookingNote(payload) {
	return {
		type: SET_BOOKING_NOTE,
		payload
	}
}

//Add additional service 1: Goods longer than 6ft (P50)
export function additionalService1(payload) {
	return{
		type: ADDITIONAL_SERVICE_1,
		payload
	}
}

//Add additional service 2: Borrow cart (P60)
export function additionalService2(payload) {
	return{
		type: ADDITIONAL_SERVICE_2,
		payload
	}
}

//Add additional service 3: Mover (P100)
export function additionalService3(payload) {
	return{
		type: ADDITIONAL_SERVICE_3,
		payload
	}
}

//Add additional service 4: Pets (P50)
export function additionalService4(payload) {
	return{
		type: ADDITIONAL_SERVICE_4,
		payload
	}
}

//Add additional service 5: New Car (P100)
export function additionalService5(payload) {
	return{
		type: ADDITIONAL_SERVICE_5,
		payload
	}
}

//Add additional service 6: Dunpler/Construction waste (P65)
export function additionalService6(payload) {
	return{
		type: ADDITIONAL_SERVICE_6,
		payload
	}
}

export function updateAdditionalService(payload) {
	const { service, value } = payload;

	if (service == 1) {
		return(dispatch, store) => {
			dispatch({
				type: ADDITIONAL_SERVICE_1,
				payload: value
			})
		}
	}

	if (service == 2) {
		return(dispatch, store) => {
			dispatch({
				type: ADDITIONAL_SERVICE_2,
				payload: value
			})
		}
	}

	if (service == 3) {
		return(dispatch, store) => {
			dispatch({
				type: ADDITIONAL_SERVICE_3,
				payload: value
			})
		}
	}

	if (service == 4) {
		return(dispatch, store) => {
			dispatch({
				type: ADDITIONAL_SERVICE_4,
				payload: value
			})
		}
	}

	if (service == 5) {
		return(dispatch, store) => {
			dispatch({
				type: ADDITIONAL_SERVICE_5,
				payload: value
			})
		}
	}

	if (service == 6) {
		return(dispatch, store) => {
			dispatch({
				type: ADDITIONAL_SERVICE_6,
				payload: value
			})
		}
	}

}

//Add additional services
export function addAdditionalServices(payload) {
	return(dispatch, store) => {
		const arrAdditionalServices = store().additionalServices.additionalServices;

		arrAdditionalServices.push(payload);

		dispatch({
			type: GET_ADDITIONAL_SERVICES,
			payload: arrAdditionalServices
		})
	}
}

//Remove additional services
export function removeAdditionalServices(payload) {
	return(dispatch, store) => {
		const arrAdditionalServices = store().additionalServices.additionalServices;
		
		for(var i = 0; i <= arrAdditionalServices.length-1; i++){
			if (arrAdditionalServices[i].service === payload.service) {
				arrAdditionalServices.splice(i, 1);
			}
		}

		dispatch({
			type: GET_ADDITIONAL_SERVICES,
			payload: arrAdditionalServices
		})
	}
}

//Add additional price 
export function addAdditionalPrice(payload) {
	return(dispatch, store) => {
		dispatch({
			type: ADD_ADDITIONAL_PRICE,
			payload: store().additionalServices.additionalPrice + payload
		})

		// if (store().home.fare != undefined) {
		// 	dispatch({
		// 		type: GET_FARE,
		// 		payload: store().home.fare + payload
		// 	})
		// }
	}
}

//Remove additional price
export function removeAdditionalPrice(payload) {
	return(dispatch, store) => {
		dispatch({
			type: ADD_ADDITIONAL_PRICE,
			payload: store().additionalServices.additionalPrice - payload
		})

		// if (store().home.fare != undefined) {
		// 	dispatch({
		// 		type: GET_FARE,
		// 		payload: store().home.fare - payload
		// 	})
		// }
	}
}

//------------------------
//Action Handlers
//------------------------
function handleSetPickUpDateTime(state, action) {
	return update(state, {
		pickUpDateTime: {
			$set: action.payload
		}
	})
}

function handleSetBookingNote(state, action) {
	return update(state, {
		bookingNote: {
			$set: action.payload
		}
	})
}

function handleGetAdditionalServices(state, action) {
	return update(state, {
		additionalServices: {
			$set: action.payload
		}
	})
}

function handleAddAdditionalPrice(state, action) {
	return update(state, {
		additionalPrice: {
			$set: action.payload
		}
	})
}

function handleRemoveAdditionalPrice(state, action) {
	return update(state, {
		additionalPrice: {
			$set: action.payload
		}
	})
}

function handleAdditionalService1(state, action) {
	return update(state, {
		additionalService1: {
			$set: action.payload
		}
	})
}

function handleAdditionalService1(state, action) {
	return update(state, {
		additionalService1: {
			$set: action.payload
		}
	})
}

function handleAdditionalService2(state, action) {
	return update(state, {
		additionalService2: {
			$set: action.payload
		}
	})
}

function handleAdditionalService3(state, action) {
	return update(state, {
		additionalService3: {
			$set: action.payload
		}
	})
}

function handleAdditionalService4(state, action) {
	return update(state, {
		additionalService4: {
			$set: action.payload
		}
	})
}

function handleAdditionalService5(state, action) {
	return update(state, {
		additionalService5: {
			$set: action.payload
		}
	})
}

function handleAdditionalService6(state, action) {
	return update(state, {
		additionalService6: {
			$set: action.payload
		}
	})
}

function handleAdditionalService(state, action) {
	if (action.payload == 1) {
		return update(state, {
			additionalService1: {
				$set: action.payload
			}
		})
	}

	if (action.payload == 2) {
		return update(state, {
			additionalService2: {
				$set: action.payload
			}
		})
	}

	if (action.payload == 3) {
		return update(state, {
			additionalService3: {
				$set: action.payload
			}
		})
	}

	if (action.payload == 4) {
		return update(state, {
			additionalService4: {
				$set: action.payload
			}
		})
	}

	if (action.payload == 5) {
		return update(state, {
			additionalService5: {
				$set: action.payload
			}
		})
	}

	if (action.payload == 6) {
		return update(state, {
			additionalService6: {
				$set: action.payload
			}
		})
	}
}

function handleResetAdditionalServices(state, action) {
	return update(state, {
		additionalServices:{
			$set: []
		},
		additionalPrice:{
			$set: 0
		},
		additionalService1:{
			$set: false
		},
		additionalService2:{
			$set: false
		},
		additionalService3:{
			$set: false
		},
		additionalService4:{
			$set: false
		},
		additionalService5:{
			$set: false
		},
		additionalService6:{
			$set: false
		},
		pickUpDateTime: {
			$set: dateFormat(new Date(), "mmmm do yyyy, h:MM:ss TT")
		},
		bookingNote: {
			$set: ""
		}
	});
}

const ACTION_HANDLERS = {
	GET_ADDITIONAL_SERVICES: handleGetAdditionalServices,
	ADD_ADDITIONAL_PRICE: handleAddAdditionalPrice,
	REMOVE_ADDITIONAL_PRICE: handleRemoveAdditionalPrice,
	ADDITIONAL_SERVICE_1: handleAdditionalService1,
	ADDITIONAL_SERVICE_2: handleAdditionalService2,
	ADDITIONAL_SERVICE_3: handleAdditionalService3,
	ADDITIONAL_SERVICE_4: handleAdditionalService4,
	ADDITIONAL_SERVICE_5: handleAdditionalService5,
	ADDITIONAL_SERVICE_6: handleAdditionalService6,
	UPDATE_ADDITIONAL_SERVICE: handleAdditionalService,
	SET_PICKUP_DATE_TIME: handleSetPickUpDateTime,
	SET_BOOKING_NOTE: handleSetBookingNote,
	RESET_ADDITIONAL_SERVICES: handleResetAdditionalServices
}

const initialState = {
	additionalServices: [],
	additionalPrice: 0,
	additionalService1: false,
	additionalService2: false,
	additionalService3: false,
	additionalService4: false,
	additionalService5: false,
	additionalService6: false,
	pickUpDateTime: dateFormat(new Date(), "mmmm do yyyy, h:MM:ss TT"),
	bookingNote: ""
};

export function AdditionalServicesReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
