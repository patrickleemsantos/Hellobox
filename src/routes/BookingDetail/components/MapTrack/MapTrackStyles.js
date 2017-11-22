import { StyleSheet, Dimensions } from "react-native";
var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full width
const styles = {
    headerColor: {
        backgroundColor: "#E90000"
    },
    modal: {
        width: width,
        height: height,
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    inputWrapper:{
        top:0,
        position:"absolute",
        backgroundColor:"#fff",
        width:width
    },
    inputSearch:{
        backgroundColor:"#fff"
    },
	title: {
		color: "#FFFFFF",
    },
    menu: {
		color: "#fff",
		fontSize: 20
    },
};

export default styles;