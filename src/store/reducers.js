import { combineReducers } from "redux";
import { LoginReducer as login } from "../routes/Login/modules/login"
import { HomeReducer as home } from "../routes/Home/modules/home";
import { TrackDriverReducer as trackDriver } from "../routes/TrackDriver/modules/trackDriver"

export const makeRootReducer = () => {
    return combineReducers({
        login,
        home,
        trackDriver
    });
}

export default makeRootReducer;