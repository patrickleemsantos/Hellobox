import { connect } from "react-redux";
import AccountInformation from "../components/AccountInformation";
import {
} from "../modules/accountInformation";

const mapStateToProps = (state) => ({   
    account: state.login.account
});

const mapActionCreators = {
};

export default connect(mapStateToProps, mapActionCreators)(AccountInformation);