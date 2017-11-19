import { connect } from "react-redux";
import BookingDetail from "../components/BookingDetail";
import {
    setCurrentBooking,
    updateBookingStatus
} from "../modules/bookingDetail";

const mapStateToProps = (state) => ({   
    currentBooking: state.bookingDetail.currentBooking || {},
    showLoader: state.bookingDetail.showLoader || false
});

const mapActionCreators = {
    setCurrentBooking,
    updateBookingStatus
};

export default connect(mapStateToProps, mapActionCreators)(BookingDetail);