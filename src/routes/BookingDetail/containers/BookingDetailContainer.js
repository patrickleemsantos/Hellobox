import { connect } from "react-redux";
import BookingDetail from "../components/BookingDetail";
import {
    setCurrentBooking,
    updateBookingStatus,
    getBookingHistory,
    setShowDriver
} from "../modules/bookingDetail";

const mapStateToProps = (state) => ({   
    currentBooking: state.bookingDetail.currentBooking,
    bookingHistory: state.bookingDetail.bookingHistory,
    showLoader: state.bookingDetail.showLoader || false,
    showDriver: state.showDriver || true
});

const mapActionCreators = {
    setCurrentBooking,
    updateBookingStatus,
    getBookingHistory,
    setShowDriver
};

export default connect(mapStateToProps, mapActionCreators)(BookingDetail);