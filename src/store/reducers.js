import { combineReducers } from "redux";
import { LoginReducer as login } from "../routes/Login/modules/login"
import { HomeReducer as home } from "../routes/Home/modules/home";
import { TrackDriverReducer as trackDriver } from "../routes/TrackDriver/modules/trackDriver"
import { BookingsReducer as bookings } from "../routes/Bookings/modules/bookings"
import { BookingDetailReducer as bookingDetail } from "../routes/BookingDetail/modules/bookingDetail"
import { AdditionalServicesReducer as additionalServices } from "../routes/AdditionalServices/modules/additionalServices"
import { ReviewOrderReducer as reviewOrder } from "../routes/ReviewOrder/modules/reviewOrder"
import { RegisterReducer as register } from "../routes/Register/modules/register"

export const makeRootReducer = () => {
    return combineReducers({
        login,
        home,
        trackDriver,
        bookings,
        bookingDetail,
        additionalServices,
        reviewOrder,
        register
    });
}

export default makeRootReducer;