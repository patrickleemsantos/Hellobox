import update from "react-addons-update";
import constants from "./actionConstants";
import { Dimensions, Alert, AsyncStorage } from "react-native";
import RNGooglePlaces from "react-native-google-places";
import Polyline from '@mapbox/polyline';
import request from "../../../util/request";

//------------------------
//Constants
//------------------------
const { GET_USERNAME,
        GET_PASSWORD,
        GET_LOGIN_STATUS,
        LOGIN,
        UPDATE_LOADING_STATUS,
        SET_ACCOUNT,
        CLEAR_INPUTS,
        SET_LOGIN_PREFERENCE
	} = constants;

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;

//------------------------
//Actions
//------------------------
//Get username
export function getUsername(payload) {
	return{
		type: GET_USERNAME,
		payload
	}
}

//Get password
export function getPassword(payload) {
	return{
		type: GET_PASSWORD,
		payload
	}
}

export function setAccount(payload) {
    return{
		type: SET_ACCOUNT,
		payload
	}
}

export function setLoginPreference(payload) {
    return{
		type: SET_LOGIN_PREFERENCE,
		payload
	}
}

export function login() {
    return(dispatch, store)=>{

        if (store().login.username != "" && store().login.password != "") {
            const payload = {
                username: store().login.username,
                password:store().login.password
            }

            dispatch({
                type: UPDATE_LOADING_STATUS,
                payload: true
            });

            request.get("http://52.220.212.6:3121/api/accountLogin")
            .query({
                username: store().login.username,
                password: store().login.password,
                login_preference: store().login.loginPreference
            })
            .finish((error, res)=>{
                if (res.body.error) {
                    const response = {
                        status: false,
                        message: res.body.error
                    }
                    
                    dispatch({
                        type: LOGIN,
                        payload: response
                    });
                    
                    Alert.alert('Error', res.body.error);
                } else {
                    const response = {
                        status: true,
                        message: "Success"
                    }

                    dispatch({
                        type: LOGIN,
                        payload: response
                    });

                    dispatch({
                        type: SET_ACCOUNT,
                        payload: res.body
                    });

                    dispatch({
                        type: CLEAR_INPUTS,
                        payload
                    });

                    AsyncStorage.setItem('account', JSON.stringify(res.body));
                }

                dispatch({
                    type: UPDATE_LOADING_STATUS,
                    payload: false
                });
            });
        } else {
            Alert.alert('Error', "Please enter username/password");
        }
	};
}

//------------------------
//Action Handlers
//------------------------
function handleClearInputs(state, action) {
    return update(state, {
		username: {
			$set: ""
        },
        password: {
			$set: ""
		}
	})
}

function handleGetUsername(state, action) {
	return update(state, {
		username: {
			$set: action.payload
		}
	})
}

function handleGetPassword(state, action) {
	return update(state, {
		password: {
			$set: action.payload
		}
	})
}

function handleLogin(state, action) {
	return update(state, {
		loginResult: {
			status: {
				$set: action.payload.status
			},
			message: {
				$set: action.payload.message
			}
		}
	})
}

function handleLoadingStatus(state, action) {
    return update(state, {
        isLoading: {
            $set: action.payload
        }
    })
}

function handleSetAccount(state, action) {
    return update(state, {
        account: {
            $set: action.payload
        }
    })
}

function handleSetLoginPreference(state, action) {
    return update(state, {
        loginPreference: {
            $set: action.payload
        }
    })
}

const ACTION_HANDLERS = {
	GET_USERNAME: handleGetUsername,
    GET_PASSWORD: handleGetPassword,
    LOGIN: handleLogin,
    SET_ACCOUNT: handleSetAccount,
    UPDATE_LOADING_STATUS: handleLoadingStatus,
    CLEAR_INPUTS: handleClearInputs,
    SET_LOGIN_PREFERENCE: handleSetLoginPreference
}

const initialState = {
    username: "",
    password: "",
    loginResult: {},
    isLoading: false,
    account: {},
    loginPreference: "mobile"
};

export function LoginReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
