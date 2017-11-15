import { connect } from "react-redux";
import Login from "../components/Login";
import {
    getUsername,
    getPassword,
    setAccount,
    login
} from "../modules/login";

const mapStateToProps = (state) => ({   
    username: state.login.username || "",
    password: state.login.password || "",
    loginResult: state.login.loginResult || {},
    account: state.login.account || {},
    isLoading: state.login.isLoading || false
});

const mapActionCreators = {
    getUsername,
    getPassword,
    setAccount,
    login
};

export default connect(mapStateToProps, mapActionCreators)(Login);