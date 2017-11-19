import React from "react";
import { View, Alert, AsyncStorage, StyleSheet } from "react-native";
import { Container, Content, Body, Left, Right, Text, Header, Button, Title, Footer, FooterTab, Thumbnail, List, ListItem } from "native-base";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/FontAwesome";

var Spinner = require("react-native-spinkit");

class BookingDetail extends React.Component {
    
    componentDidMount() {
        this.props.setCurrentBooking(this.props.booking);
        this.props.getBookingHistory(this.props.booking.booking_id);
    }

    componentDidUpdate(prevProps, prevState) {
        // if (prevProps.currentBooking !== this.props.currentBooking) {
        //     if (this.props.currentBooking.status === "approved") {
        //         AsyncStorage.getItem('driver', (err, result) => {
        //             let driver = JSON.parse(result);
        //             if (driver.driver_id === this.props.currentBooking.driver_id) {                    
        //                 this.props.updateBookingModal(true);
        //             }
        //         });
        //     }
        // }
    }

    render () {    
        // const { status } = this.props.currentBooking;
        
        // updateBookingStatus = () => {
        //     if (status === "PENDING") {
        //         this.props.updateBookingStatus("APPROVED");
        //     }
            
        //     if (status === "APPROVED") {
        //         this.props.updateBookingStatus("ON MY WAY");
        //     }

        //     if (status === "ON MY WAY") {
        //         this.props.updateBookingStatus("LOADED AND DELIVERY STARTED");
        //     }

        //     if (status === "LOADED AND DELIVERY STARTED") {
        //         this.props.updateBookingStatus("ARRIVED AT DELIVERY LOCATION");
        //     }

        //     if (status === "ARRIVED AT DELIVERY LOCATION") {
        //         this.props.updateBookingStatus("JOB COMPLETED");
        //     }
        // }

        return (
            <Container>
                { this.props.currentBooking &&
                    <View style={{flex:1}}>
                        <Header style={styles.headerColor} iosBarStyle="light-content" androidStatusBarColor="#E90000">
                            <Left>
                                <Button transparent onPress={() => Actions.pop()}>
                                    <Icon name="arrow-left" style={styles.menu} /> 
                                </Button>
                            </Left>
                            <Body>
                                <Title style={styles.job}>JOB ID: {this.props.currentBooking.booking_id}</Title>
                            </Body>
                            <Right>
                                <Button transparent>
                                    {/* <Text>Live Track</Text>  */}
                                </Button>
                            </Right>
                        </Header> 
                        <Content>
                            <View style={styles.driverContainer}>
                                <Thumbnail source={{uri: this.props.currentBooking.driver.profile_picture}} />
                                <View style={styles.driverDetailsContainer}>
                                    <Text style={styles.driverName}>{this.props.currentBooking.driver.first_name + " " + this.props.currentBooking.driver.last_name}</Text>
                                    <Text style={styles.driverVehicle}>{this.props.currentBooking.driver.vehicle.body_type + " " + this.props.currentBooking.driver.vehicle.model + " " + this.props.currentBooking.driver.vehicle.plate_number}</Text>
                                </View>
                            </View>
                            <View style={styles.statusContainter}>
                                <Text style={styles.statusValue}>Status: {this.props.currentBooking.status}</Text>
                            </View>
                            <View style={styles.priceContainter}>
                                <Text style={styles.priceValue}>Fare: P {this.props.currentBooking.fare}</Text>
                            </View>
                            <View style={styles.additionalPriceContainter}>
                                <Text style={styles.additionalPriceValue}>Additional Price: P {this.props.currentBooking.additional_price}</Text>
                            </View>
                            <View style={styles.locationContainter}>
                                <View style={styles.timeContainer}>
                                    <Icon style={styles.timeIcon} name="clock-o" />
                                    <View style={styles.locationValueContainer}>
                                        <Text style={styles.locationTime}>{this.props.currentBooking.timestamp}</Text>
                                    </View>
                                </View>
                                <View style={styles.pickUpContainer}>
                                    <Icon style={styles.fromIcon} name="map-marker" />
                                    <View style={styles.locationValueContainer}>
                                        <Text style={styles.locationPickup}>{this.props.currentBooking.pick_up.address}</Text>
                                    </View>
                                </View>
                                <View style={styles.ellipsisContainer}>
                                    <Icon style={styles.ellipsisIcon} name="ellipsis-v" />
                                </View>
                                <View style={styles.dropOffContainer}>
                                    <Icon style={styles.destinationIcon} name="location-arrow" />
                                    <View style={styles.locationValueContainer}>
                                        <Text style={styles.locationDropOff}>{this.props.currentBooking.drop_off.address}</Text>
                                    </View>
                                </View>
                            </View>
                            { this.props.currentBooking.additional_services && 
                                <View style={styles.additionalContainer}>
                                    <Text style={styles.additionalHeader}>Additional:</Text>
                                    <List dataArray={this.props.currentBooking.additional_services.value}
                                        renderRow={(item) =>
                                        <View style={styles.additionalListContainer}>
                                            <Icon style={styles.additionalIcon} name="plus" />
                                            <View style={styles.additionalValueContainer}>
                                                <Text style={styles.additionalText}>{item}</Text>
                                            </View>
                                        </View>
                                        }>
                                    </List>
                                </View>
                            }
                            { this.props.bookingHistory && 
                                <View style={styles.historyContainer}>
                                    <Text style={styles.historyHeader}>History:</Text>
                                    <List dataArray={this.props.bookingHistory}
                                        renderRow={(item) =>
                                        <View style={styles.historyListContainer}>
                                            <Icon style={styles.historyIcon} name="history" />
                                            <View style={styles.historyValueContainer}>
                                                <Text style={styles.historyText}>{item.status}</Text>
                                            </View>
                                            <View style={styles.historyTimeContainer}>
                                                <Text style={styles.historyTimeText}>{item.timestamp}</Text>
                                            </View>
                                        </View>
                                        }>
                                    </List>
                                </View>
                            }
                        </Content>  
                    </View>
                    ||
                    <View style={styles.floatView}>
                        <Spinner style={styles.spinner} isVisible={true} size={40} type="Wave" color="#ffffff"/>
                    </View>
                }             
            </Container>
        )
    }
}


const styles = StyleSheet.create({
    headerColor: {
        backgroundColor: "#E90000"
    },
    job: {
        fontWeight: "bold",
        fontSize: 15,
        color: "#FFFFFF"
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
        fontSize: 12,
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
        fontSize: 12,
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
        paddingTop: 10,
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
    spinner: {
        color: "#E90000",
        alignSelf: "center"
    },
    floatView: {
        position: 'absolute',
        width: 100,
        height: 100,
        top: 200,
        alignSelf: "center"
    }
  });

export default BookingDetail;