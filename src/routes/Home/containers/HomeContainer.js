import { connect } from "react-redux";
import Home from "../components/Home";
import {
    getCurrentLocation,
    getInputData,
    toggleSearchResultmodal,
    getAddressPredictions,
    getSelectedAddress,
    getSelectedVehicle,
    bookCar,
    getNearByDrivers,
    updateSearchAddressLoadingStatus,
    closeResultType,
    updateBookingStatus,
    removeBooking,
    resetBooking,
    updatePushNotificationID
} from "../modules/home";

const mapStateToProps = (state) => ({   
    region: state.home.region,
    inputData: state.home.inputData || {},
    resultTypes: state.home.resultTypes || {},
    predictions: state.home.predictions || [],
    selectedAddress: state.home.selectedAddress || {},
    fare: state.home.fare,
    booking: state.home.booking || {},
    selectedVehicle: state.home.selectedVehicle || {},
    nearByDrivers: state.home.nearByDrivers || [],
    isSearchAddressLoading: state.home.isSearchAddressLoading || false,
    account: state.login.account || {},
    isMapReady: state.home.isMapReady || false,
    directions: state.home.directions
});

const mapActionCreators = {
    getCurrentLocation,
    getInputData,
    toggleSearchResultmodal,
    getAddressPredictions,
    getSelectedAddress,
    getSelectedVehicle,
    bookCar,
    getNearByDrivers,
    closeResultType,
    updateBookingStatus,
    removeBooking,
    resetBooking,
    updatePushNotificationID
};

export default connect(mapStateToProps, mapActionCreators)(Home);