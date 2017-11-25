import { connect } from "react-redux";
import Login from "../components/Login";
import {
    getUsername,
    getPassword,
    setAccount,
    login,
    setLoginPreference
} from "../modules/login";

const mapStateToProps = (state) => ({   
    username: state.login.username || "",
    password: state.login.password || "",
    loginResult: state.login.loginResult || {},
    account: state.login.account || {},
    isLoading: state.login.isLoading || false,
    loginPreference: state.login.loginPreference || "mobile"
});

const mapActionCreators = {
    getUsername,
    getPassword,
    setAccount,
    login,
    setLoginPreference
};

export default connect(mapStateToProps, mapActionCreators)(Login);