import update from "react-addons-update";
import RNGooglePlaces from "react-native-google-places";
import Polyline from '@mapbox/polyline';

//------------------------
//Actions
//------------------------
export function setFirstName(payload) {
	return {
		type: SET_FIRSTNAME,
		payload
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

const ACTION_HANDLERS = {
	SET_FIRSTNAME: handleSetFirstName
}

export function AccountInformationReducer (state = {}, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
