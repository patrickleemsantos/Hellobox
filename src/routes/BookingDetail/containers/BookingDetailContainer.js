import { connect } from "react-redux";
import BookingDetail from "../components/BookingDetail";
import {
    setCurrentBooking,
    updateBookingStatus,
    getBookingHistory,
    setShowRatingModal,
    setShowMapTrackModal,
    setSelectedStar,
    getComment,
    saveComment,
    trackDriver,
    setTrackTimer
} from "../modules/bookingDetail";

const mapStateToProps = (state) => ({   
    region: state.home.region,
    currentBooking: state.bookingDetail.currentBooking,
    bookingHistory: state.bookingDetail.bookingHistory,
    showLoader: state.bookingDetail.showLoader || false,
    showRatingModal: state.bookingDetail.showRatingModal || false,
    showMapTrackModal: state.bookingDetail.showMapTrackModal || false,
    selectedStar: state.bookingDetail.selectedStar || 0,
    comment: state.bookingDetail.comment || "",
    currentDriverLocation: state.bookingDetail.currentDriverLocation,
    trackTimer: state.bookingDetail.trackTimer
});

const mapActionCreators = {
    setCurrentBooking,
    updateBookingStatus,
    getBookingHistory,
    setShowRatingModal,
    setShowMapTrackModal,
    setSelectedStar,
    getComment,
    saveComment,
    trackDriver,
    setTrackTimer
};

export default connect(mapStateToProps, mapActionCreators)(BookingDetail);