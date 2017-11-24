import { connect } from "react-redux";
import Register from "../components/Register";
import {
    setFirstName,
    setLastName,
    setEmail,
    setMobileNumber,
    setPassword,
    addAccount
} from "../modules/register";

const mapStateToProps = (state) => ({   
    firstName: state.register.firstName || "",
    lastName: state.register.lastName || "",
    email: state.register.email || "",
    mobileNumber: state.register.mobileNumber || "",
    password: state.register.password || "",
    registerStatus: state.register.registerStatus || false,
    loadingStatus: state.register.loadingStatus || false
});

const mapActionCreators = {
    setFirstName,
    setLastName,
    setEmail,
    setMobileNumber,
    setPassword,
    addAccount
};

export default connect(mapStateToProps, mapActionCreators)(Register);