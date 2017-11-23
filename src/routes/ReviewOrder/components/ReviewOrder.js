import React from "react";
import { View, Alert, AsyncStorage, StyleSheet } from "react-native";
import { Container, Content, Body, Left, Right, Text, Header, Button, Title, Footer, FooterTab, Thumbnail, List, ListItem } from "native-base";
import { Actions } from "react-native-router-flux";
import StarRating from 'react-native-star-rating';
import Icon from "react-native-vector-icons/FontAwesome";

import FindDriver from "./FindDriver";
import { BookingFooter } from "./BookingFooter/index";

const carMarker = require("../../../assets/images/carMarker.png");

class ReviewOrder extends React.Component {
    
    render () {    
        const { selectedPickUp, selectedDropOff } = this.props.selectedAddress;
        const { status } = this.props.booking;

        return (
            <Container>
                { (status !== "PENDING") &&
                    <View style={{flex:1}}>
                        <Header style={styles.headerColor} iosBarStyle="light-content" androidStatusBarColor="#E90000">
                            <Left>
                                <Button transparent onPress={() => Actions.pop()}>
                                    <Icon name="arrow-left" style={styles.menu} /> 
                                </Button>
                            </Left>
                            <Body>
                                <Title style={styles.headerText}>Hellobox</Title>
                            </Body>
                            <Right>
                            </Right>
                        </Header> 
                        <Content>
                            <View style={styles.locationContainter}>
                                <Text style={styles.title}>Location</Text>
                                <View style={styles.timeContainer}>
                                    <Icon style={styles.timeIcon} name="clock-o" />
                                    <View style={styles.locationValueContainer}>
                                        <Text style={styles.locationTime}>{this.props.pickUpDateTime}</Text>
                                    </View>
                                </View>
                                <View style={styles.pickUpContainer}>
                                    <Icon style={styles.fromIcon} name="map-marker" />
                                    <View style={styles.locationValueContainer}>
                                        <Text style={styles.locationPickup}>{selectedPickUp.address}</Text>
                                    </View>
                                </View>
                                <View style={styles.ellipsisContainer}>
                                    <Icon style={styles.ellipsisIcon} name="ellipsis-v" />
                                </View>
                                <View style={styles.dropOffContainer}>
                                    <Icon style={styles.destinationIcon} name="location-arrow" />
                                    <View style={styles.locationValueContainer}>
                                        <Text style={styles.locationDropOff}>{selectedDropOff.address}</Text>
                                    </View>
                                </View>
                            </View>

                            { (this.props.additionalServices.length > 0) && 
                                <View style={styles.additionalContainer}>
                                    <Text style={styles.title}>Additional:</Text>
                                    <List dataArray={this.props.additionalServices}
                                        renderRow={(item) =>
                                        <View style={styles.additionalListContainer}>
                                            <Icon style={styles.additionalIcon} name="plus" />
                                            <View style={styles.additionalValueContainer}>
                                                <Text style={styles.additionalText}>{item.value}</Text>
                                            </View>
                                        </View>
                                        }>
                                    </List>
                                </View>
                            }
                            { (this.props.bookingNote !== "") &&
                                <View style={styles.noteContainter}>
                                    <Text style={styles.title}>Note</Text>
                                    <View style={styles.timeContainer}>
                                        <Icon style={styles.noteIcon} name="sticky-note" />
                                        <View style={styles.locationValueContainer}>
                                            <Text style={styles.locationTime}>{this.props.bookingNote}</Text>
                                        </View>
                                    </View>
                                </View>
                            }
                            <View style={styles.priceContainter}>
                                <Text style={styles.priceValue}>Fare: P {this.props.fare}</Text>
                            </View>
                            <View style={styles.additionalPriceContainter}>
                                <Text style={styles.additionalPriceValue}>Additional Price: P {this.props.additionalPrice}</Text>
                            </View>
                        </Content> 
                    
                        <BookingFooter
                            onPressAction={() => this.props.bookCar()}
                            fare={this.props.fare}
                        />
                    </View>

                ||

                <FindDriver selectedAddress={this.props.selectedAddress}
                        updateBookingStatus={this.props.updateBookingStatus}/>

                }
            </Container>
        )
    }
}


const styles = StyleSheet.create({
    headerColor: {
        backgroundColor: "#E90000"
    },
    title: {
        color: "#808080",
        fontSize: 14,
        marginBottom: 10
    },
    headerText:{
		color:"#fff",
		fontSize:18
    },
    menu: {
		color: "#fff",
		fontSize: 20
    },
    driverContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 10
    },
    driverDetailsContainer: {
        flex: 1,
        paddingLeft: 10
    },
    driverName: {
        fontSize: 14,
        fontWeight: "bold"
    },
    driverVehicle: {
        fontSize: 12,
    },
    statusContainter: {
        flex: 1,
        backgroundColor: "#F4F6F6",
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    statusValue: {
        fontSize: 12,
        fontWeight: "bold"
    },
    priceContainter: {
        flex: 1,
        backgroundColor: "#CCD1D1",
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    priceValue: {
        fontSize: 16,
        fontWeight: "bold"
    },
    additionalPriceContainter: {
        flex: 1,
        backgroundColor: "#E5E8E8",
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    additionalPriceValue: {
        fontSize: 16,
        fontWeight: "bold"
    },
    locationContainter: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        flexDirection: 'column',
        paddingLeft: 10,
        paddingTop: 15,
        paddingBottom: 15
    },
    noteContainter: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        flexDirection: 'column',
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 15
    },
    locationTime: {
        fontSize: 13,
    },
    locationPickup: {
        fontSize: 13,
    },
    locationDropOff: {
        fontSize: 13,
    },
    locationValueContainer: {
        flex: 1,
        paddingLeft: 10
    },
    additionalValueContainer: {
        flex: 1,
        paddingLeft: 10
    },
    pickUpContainer: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 2
    },
    timeContainer: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 11
    },
    ellipsisContainer: {
        flex: 1,
        paddingLeft: 5
    },
    dropOffContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    timeIcon:{
        fontSize:20,
        color:"#00FF00",
    },
    noteIcon:{
        fontSize:20,
        color:"#999999",
	},
    fromIcon:{
        fontSize:20,
        color:"#E90000",
	},
	destinationIcon:{
        fontSize:20,
        color:"#999999",
    },
    additionalIcon:{
        fontSize:15,
        color:"#E90000",
	},
    ellipsisIcon: {
        fontSize:10,
        color:"#3498DB",
    },
    historyIcon:{
        fontSize:20,
        color:"#E90000",
	},
    additionalContainer: {
        flex: 1,
        backgroundColor: "#FBFCFC",
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 10
    },
    additionalText: {
        flex: 1,
        fontSize: 13,
    },
    additionalHeader: {
        fontSize: 13,
        fontWeight: "bold",
        marginBottom: 10
    },
    additionalListContainer: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 11
    },
    historyContainer: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10
    },
    historyText: {
        flex: 1,
        fontSize: 13,
    },
    historyTimeText: {
        flex: 1,
        fontSize: 10,
        textAlign: 'right'
    },
    historyHeader: {
        fontSize: 13,
        fontWeight: "bold",
        marginBottom: 15
    },
    historyListContainer: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 11
    },
    historyValueContainer: {
        flex: 1,
        paddingLeft: 10
    },
    historyTimeContainer: {
        flex: 1,
        paddingRight: 10
    },
    footerContainer:{
        // paddingTop: 10,
		backgroundColor:"#424949",
    },
    button: {
		margin: 5,
		height: 40
	},
	subText:{
		fontSize:14,
		fontWeight: "bold",
		color: "#FFFF"
    },
    ratingContainer: {
        flex: 1,
        marginTop: 20,
        marginBottom: 30,
        marginLeft: 80,
        marginRight: 80
    },
    ratingHeader: {
        fontSize: 13,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center"
    },
    startContainer: {
        paddingLeft: 30,
        paddingRight: 30
    },
    starRating: {
        textAlign: "center"
    },
    spinner: {
        top: 200,
        color: "#E90000",
        alignSelf: "center"
    },
    floatView: {
        justifyContent: 'center',
        alignItems: 'center',
    }
  });

export default ReviewOrder;