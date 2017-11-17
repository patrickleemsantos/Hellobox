import { connect } from "react-redux";
import Bookings from "../components/Bookings";
import {
	getBookings
} from "../modules/bookings";

const mapStateToProps = (state) => ({
	bookings: state.bookings.bookings || {},
	showBookingLoader: state.bookings.showBookingLoader || false,
});

const mapActionCreators = {
	getBookings
};

export default connect(mapStateToProps, mapActionCreators)(Bookings);