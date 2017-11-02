import { Dimensions } from "react-native";
const { width } = Dimensions.get("window");

const styles = {
    fareContainer: {
        width:width,
        height:40,
        padding:10,
        backgroundColor:"#B0B0B0"
    },
    fareText: {
        fontSize: 12
    },
    amountText:{
        fontWeight:"bold",
        fontSize: 12
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
        alignItems: 'flex-end'
    },
    btnBreakdown: {
        height:10,
        paddingTop:13,
    }
};

export default styles;