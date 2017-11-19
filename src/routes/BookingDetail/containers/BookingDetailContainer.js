import { connect } from "react-redux";
import BookingDetail from "../components/BookingDetail";
import {
    setCurrentBooking,
    updateBookingStatus,
    getBookingHistory
} from "../modules/bookingDetail";

const mapStateToProps = (state) => ({   
    currentBooking: state.bookingDetail.currentBooking,
    bookingHistory: state.bookingDetail.bookingHistory,
    showLoader: state.bookingDetail.showLoader || false
});

const mapActionCreators = {
    setCurrentBooking,
    updateBookingStatus,
    getBookingHistory
};

export default connect(mapStateToProps, mapActionCreators)(BookingDetail);