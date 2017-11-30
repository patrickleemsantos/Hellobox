import { connect } from "react-redux";
import Bookings from "../components/Bookings";
import {
	getBookings,
	setSelectedBookings
} from "../modules/bookings";

const mapStateToProps = (state) => ({
	bookings: state.bookings.bookings || [],
	showBookingLoader: state.bookings.showBookingLoader || false,
	selectedBookings: state.bookings.selectedBookings || "current"
});

const mapActionCreators = {
	getBookings,
	setSelectedBookings
};

export default connect(mapStateToProps, mapActionCreators)(Bookings);