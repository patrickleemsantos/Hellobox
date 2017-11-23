import { connect } from "react-redux";
import ReviewOrder from "../components/ReviewOrder";
import {
    bookCar,
    updateBookingStatus
} from "../modules/reviewOrder";

const mapStateToProps = (state) => ({   
    inputData: state.home.inputData || {},
    resultTypes: state.home.resultTypes || {},
    predictions: state.home.predictions || [],
    selectedAddress: state.home.selectedAddress || {},
    fare: state.home.fare || 0,
    selectedVehicle: state.home.selectedVehicle || {},
    nearByDrivers: state.home.nearByDrivers || [],
    additionalServices: state.additionalServices.additionalServices || [],
    additionalPrice: state.additionalServices.additionalPrice || 0,
    additionalService1: state.additionalServices.additionalService1 || false,
    additionalService2: state.additionalServices.additionalService2 || false,
    additionalService3: state.additionalServices.additionalService3 || false,
    additionalService4: state.additionalServices.additionalService4 || false,
    additionalService5: state.additionalServices.additionalService5 || false,
    additionalService6: state.additionalServices.additionalService6 || false,
    pickUpDateTime: state.additionalServices.pickUpDateTime || "2017-01-01 00:00",
    bookingNote: state.additionalServices.bookingNote || "",
    booking: state.reviewOrder.booking || {},
});

const mapActionCreators = {
    bookCar,
    updateBookingStatus
};

export default connect(mapStateToProps, mapActionCreators)(ReviewOrder);