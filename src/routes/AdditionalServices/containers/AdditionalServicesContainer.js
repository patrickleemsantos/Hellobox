import { connect } from "react-redux";
import BookingDetail from "../components/BookingDetail";
import {
} from "../modules/additionalServices";

const mapStateToProps = (state) => ({   
    
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
    trackDriver
};

export default connect(mapStateToProps, mapActionCreators)(BookingDetail);