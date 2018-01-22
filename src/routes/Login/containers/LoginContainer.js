import { connect } from "react-redux";
import Login from "../components/Login";
import {
    getUsername,
    getPassword,
    setAccount,
    login,
    setLoginPreference,
    setShowForgotPasswordModal
} from "../modules/login";

const mapStateToProps = (state) => ({   
    username: state.login.username || "",
    password: state.login.password || "",
    loginResult: state.login.loginResult || {},
    account: state.login.account || {},
    isLoading: state.login.isLoading || false,
    loginPreference: state.login.loginPreference || "mobile",
    showForgotPasswordModal: state.login.showForgotPasswordModal || false
});

const mapActionCreators = {
    getUsername,
    getPassword,
    setAccount,
    login,
    setLoginPreference,
    setShowForgotPasswordModal
};

export default connect(mapStateToProps, mapActionCreators)(Login);