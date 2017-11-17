import { combineReducers } from "redux";
import { LoginReducer as login } from "../routes/Login/modules/login"
import { HomeReducer as home } from "../routes/Home/modules/home";
import { TrackDriverReducer as trackDriver } from "../routes/TrackDriver/modules/trackDriver"
import { BookingsReducer as bookings } from "../routes/Bookings/modules/bookings"

export const makeRootReducer = () => {
    return combineReducers({
        login,
        home,
        trackDriver,
        bookings
    });
}

export default makeRootReducer;