import { Dimensions } from "react-native";
var width = Dimensions.get("window").width; //full width
const styles = {
    searchResultsWrapper:{
        top:160,
        position:"absolute",
        width:width,
        height:1000,
        backgroundColor:"#fff",
        opacity:0.9
    },
    spinnerContainer: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'blue',
        paddingBottom: 250
    },
    spinner: {
        color: "#E90000",
        marginTop: 10,
        alignSelf: "center"
    },
    listWrapper: {
        opacity:0.9
    },
    primaryText:{
        fontWeight: "bold",
        color:"#373737"
    },
    secondaryText:{
        fontStyle: "italic",
        color:"#7D7D7D",
    },
    leftContainer:{
        flexWrap: "wrap",
        alignItems: "flex-start",
        borderLeftColor:"#7D7D7D",
    },
    leftIcon:{
        fontSize:20,
        color:"#7D7D7D",
    },
    distance:{
        fontSize:12,
    },
    icon:{
        color: "#E90000",
        fontSize: 20,
    },
    button:{
        marginRight: 10,
        alignSelf: "flex-end"
    }
};

export default styles;