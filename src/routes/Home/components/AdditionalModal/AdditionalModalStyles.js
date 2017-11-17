import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const styles = {
    modalContainer: {
        width:width,
        height:height,
        padding:10,
        backgroundColor:"#FFF"
    },
    menu: {
		color: "#fff",
		fontSize: 20
    },
    btnIcons: {
        color: "#E90000",
		fontSize: 20
    },
    headerText:{
		color:"#fff",
		fontSize:18
    },
    title: {
        color: "#808080",
        fontSize: 15
    },
    btnPassenger: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    footerContainer: {
        backgroundColor: '#fff'
    },
    fare:{
        paddingTop:15,
        fontWeight:"bold",
        fontSize: 18,
    },
    amount:{
        paddingTop:15,
        fontWeight:"bold",
        fontSize: 18,
    },
    additionalText: {
        fontSize: 14
    }
};

export default styles;