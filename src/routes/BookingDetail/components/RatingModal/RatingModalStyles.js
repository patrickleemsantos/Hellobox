import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const styles = {
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    modalContainer: {
        height: 550,
        width: 350
    },
    header: {
        width: 350,
        marginBottom: 20
    },
    title: {
        backgroundColor: "#E90000",
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: "center",
        color: "#FFFFFF",
        fontWeight: "bold"
    },
    smallText: {
        textAlign: "center",
        fontSize: 13,
        color: "#A9A9A9"
    },
    profilePictureContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    profilePicture: {
        height: 90, 
        width: 90, 
        borderRadius: 50, 
        marginTop: 20
    },
    textName: {
        fontSize: 17,
        textAlign: "center",
    },
    priceText: {
        textAlign: "center",
        fontSize: 13,
        color: "#A9A9A9",
        marginTop: 18
    },
    price: {
        fontSize: 25,
        textAlign: "center",
        marginTop: 15
    },
    ratingText: {
        textAlign: "center",
        fontSize: 13,
        color: "#A9A9A9",
        marginTop: 18
    },
    starRating: {
        textAlign: "center"
    },
    startContainer: {
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 20
    },
    inputCommentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    inputComment: {
        height: 80,
        backgroundColor: '#C0C0C0',
        marginBottom: 10,
        color: '#FFFFFF',
        paddingHorizontal: 10,
        fontSize: 15,
        width: 325
    },
    buttonContainer: {
        paddingLeft: 10,
        paddingRight: 10
    },
    button: {
		margin: 5,
		height: 40
    },
    subText:{
		fontSize:14,
		fontWeight: "bold",
		color: "#FFFF"
	}
};

export default styles;