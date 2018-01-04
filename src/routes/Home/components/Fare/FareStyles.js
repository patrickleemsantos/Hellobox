import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");

const styles = {
    fareContainer: {
        width:width,
        height:40,
        padding:10,
        backgroundColor:"#FDFEFE"
    },
    fareText: {
        fontSize: 15
    },
    amountText:{
        fontWeight:"bold",
        fontSize: 15,
        color: "#E90000",
    },
    showBreakdownText:{
        fontSize: 12
    },
    colFare: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems: 'flex-start'
    },
    colBreakdown: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        alignItems: 'flex-end',
        paddingBottom: 10
    },
    btnBreakdown: {
        height:10,
        paddingTop:13,
    },
    spinner: {
        color: "#E90000",
        alignSelf: "center",
    }
};

export default styles;