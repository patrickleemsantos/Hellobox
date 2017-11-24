import update from "react-addons-update";
import constants from "./actionConstants";
import { Dimensions, Alert, AsyncStorage } from "react-native";
import RNGooglePlaces from "react-native-google-places";
import Polyline from '@mapbox/polyline';
import request from "../../../util/request";

//------------------------
//Constants
//------------------------
const { 
        SET_FIRSTNAME,
        SET_LASTNAME,
        SET_EMAIL,
        SET_MOBILE_NUMBER,
        SET_PASSWORD,
        SET_REGISTER_STATUS,
        SET_LOADING_STATUS,
        CLEAR_INPUT
    } = constants;
    
//------------------------
//Actions
//------------------------
export function setFirstName(payload) {
	return {
		type: SET_FIRSTNAME,
		payload
	}
}

export function setLastName(payload) {
	return{
		type: SET_LASTNAME,
		payload
	}
}

export function setEmail(payload) {
	return{
		type: SET_EMAIL,
		payload
	}
}

export function setMobileNumber(payload) {
	return{
		type: SET_MOBILE_NUMBER,
		payload
	}
}

export function setPassword(payload) {
	return{
		type: SET_PASSWORD,
		payload
	}
}

export function addAccount(payload) {
    return (dispatch, store) => {
        if (store().register.firstName == "") {
            Alert.alert("Hellobox", "Please enter first name");
        } else {
            if (store().register.lastName == "") {
                Alert.alert("Hellobox", "Please enter last name");
            } else {
                if (store().register.mobile_number == "") {
                    Alert.alert("Hellobox", "Please enter mobile number");
                } else {
                    if (store().register.email == "") {
                        Alert.alert("Hellobox", "Please enter email");
                    } else {
                        if (store().register.password == "") {
                            Alert.alert("Hellobox", "Please enter password");
                        } else {
                            const payload = {
                                account_id: store().register.mobileNumber,
                                email: store().register.email,
                                first_name: store().register.firstName,
                                last_name: store().register.lastName,
                                mobile_number: store().register.mobileNumber,
                                email: store().register.email,
                                password: store().register.password
                            };
                            
                            dispatch({
                                type: SET_LOADING_STATUS,
                                payload: true
                            })

                            request.post("http://52.220.212.6:3121/api/addAccount")
                            .send(payload)
                            .finish((error, res)=> {
                                if (res.body.error) {
                                    Alert.alert('Error', res.body.error);
                                } else {
                                    AsyncStorage.setItem('account', JSON.stringify(res.body));
                                    
                                    dispatch({
                                        type: SET_REGISTER_STATUS,
                                        payload: true
                                    })

                                    dispatch({
                                        type: CLEAR_INPUT,
                                        payload
                                    })
                                }

                                dispatch({
                                    type: SET_LOADING_STATUS,
                                    payload: false
                                })
                            });
                        }
                    }
                }
            }
        }
    }

}

//------------------------
//Action Handlers
//------------------------
function handleSetFirstName(state, action) {
    return update(state, {
		firstName: {
			$set: action.payload
		}
	})
}

function handleSetLasttName(state, action) {
    return update(state, {
		lastName: {
			$set: action.payload
		}
	})
}

function handleSetEmail(state, action) {
    return update(state, {
		email: {
			$set: action.payload
		}
	})
}

function handleSetMobileNumber(state, action) {
    return update(state, {
		mobileNumber: {
			$set: action.payload
		}
	})
}

function handleSetPassword(state, action) {
    return update(state, {
		password: {
			$set: action.payload
		}
	})
}

function handleSetRegisterStatus(state, action) {
    return update(state, {
		registerStatus: {
			$set: action.payload
		}
	})
}

function handleSetLoadingStatus(state, action) {
    return update(state, {
		loadingStatus: {
			$set: action.payload
		}
	})
}

function handleClearInput(state, action) {
    return update(state, {
		firstName: {
			$set: ""
        },
        lastName: {
			$set: ""
        },
        email: {
			$set: ""
        },
        password: {
			$set: ""
        },
        mobileNumber: {
			$set: ""
		},
	})
}

const ACTION_HANDLERS = {
    SET_FIRSTNAME: handleSetFirstName,
    SET_LASTNAME: handleSetLasttName,
    SET_EMAIL: handleSetEmail,
    SET_MOBILE_NUMBER: handleSetMobileNumber,
    SET_PASSWORD: handleSetPassword,
    SET_REGISTER_STATUS: handleSetRegisterStatus,
    SET_LOADING_STATUS: handleSetLoadingStatus,
    CLEAR_INPUT: handleClearInput
}

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    password: "",
    registerStatus: false,
    loadingStatus: false
};

export function RegisterReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
