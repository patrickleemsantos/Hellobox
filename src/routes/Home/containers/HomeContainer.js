import { connect } from "react-redux";
import Home from "../components/Home";
import {
    getCurrentLocation,
    getInputData,
    toggleSearchResultmodal,
    getAddressPredictions,
    getSelectedAddress,
    getSelectedVehicle,
    showAdditionalModal,
    addAdditionalServices,
    removeAdditionalServices,
    addAdditionalPrice,
    removeAdditionalPrice,
    additionalService1,
    additionalService2,
    additionalService3,
    additionalService4,
    additionalService5,
    additionalService6,
    updateAdditionalService,
    bookCar,
    getNearByDrivers,
    updateSearchAddressLoadingStatus,
    closeResultType,
    updateBookingStatus,
    removeBooking
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
    isAdditionalModalVisible: state.home.isAdditionalModalVisible || false,
    additionalServices: state.home.additionalServices || [],
    additionalPrice: state.home.additionalPrice || 0,
    additionalService1: state.home.additionalService1 || false,
    additionalService2: state.home.additionalService2 || false,
    additionalService3: state.home.additionalService3 || false,
    additionalService4: state.home.additionalService4 || false,
    additionalService5: state.home.additionalService5 || false,
    additionalService6: state.home.additionalService6 || false,
    nearByDrivers: state.home.nearByDrivers || [],
    isSearchAddressLoading: state.home.isSearchAddressLoading || false,
    account: state.login.account || {},
    // directions: state.home.directions || [],
    isMapReady: state.home.isMapReady || false
});

const mapActionCreators = {
    getCurrentLocation,
    getInputData,
    toggleSearchResultmodal,
    getAddressPredictions,
    getSelectedAddress,
    getSelectedVehicle,
    showAdditionalModal,
    addAdditionalServices,
    removeAdditionalServices,
    addAdditionalPrice,
    removeAdditionalPrice,
    updateAdditionalService,
    bookCar,
    getNearByDrivers,
    closeResultType,
    updateBookingStatus,
    removeBooking
};

export default connect(mapStateToProps, mapActionCreators)(Home);