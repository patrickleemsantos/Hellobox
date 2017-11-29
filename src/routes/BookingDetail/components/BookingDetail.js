import React from "react";
import { View, Alert, AsyncStorage, StyleSheet } from "react-native";
import { Spinner, Container, Content, Body, Left, Right, Text, Header, Button, Title, Footer, FooterTab, Thumbnail, List, ListItem } from "native-base";
import { Actions } from "react-native-router-flux";
import StarRating from 'react-native-star-rating';
import Icon from "react-native-vector-icons/FontAwesome";
import RatingModal from "./RatingModal";
import MapTrack from "./MapTrack";

const carMarker = require("../../../assets/images/carMarker.png");

class BookingDetail extends React.Component {
    
    componentDidMount() {
        this.props.setCurrentBooking(this.props.booking);
        this.props.getBookingHistory(this.props.booking.booking_id);
        if (this.props.booking.status === "JOB COMPLETED" && parseInt(this.props.booking.rating) === 0) {
            this.props.setShowRatingModal(true);
        }  
    }

    componentDidUpdate(prevProps, prevState) {
        { this.props.currentBooking &&
            AsyncStorage.getItem('account', (err, result) => {
                let account = JSON.parse(result);
                if (account.account_id === this.props.currentBooking.account.account_id) {   
                    if (prevProps.currentBooking !== this.props.currentBooking){
                        if (this.props.currentBooking.status === "JOB COMPLETED"){ 
                            if (this.props.currentBooking.status === "JOB COMPLETED" && parseInt(this.props.currentBooking.rating) === 0) {
                                this.props.setShowRatingModal(true);
                            }
                        }
                    }

                    if (prevProps.showMapTrackModal !== this.props.showMapTrackModal) {
                        var rx = this;
                        var trackTimer;
                        if (this.props.showMapTrackModal === true) {
                            trackTimer = setInterval(function(){
                                rx.props.trackDriver();
                            }, 5000);
                            this.props.setTrackTimer(trackTimer);
                            console.log("trackTimer true: " + this.props.trackTimer);
                        } else {
                            console.log("trackTimer false: " + this.props.trackTimer);
                            clearInterval(this.props.trackTimer);
                        }
                    }
                }
            });
        } 
    }

    render () {    
        handleBookingUpdate = (value) => {
            if (this.props.currentBooking.status != "APPROVED") {
                Alert.alert('Hellobox', 'The status of your booking is already ' + this.props.currentBooking.status);
            } else {
                Alert.alert(
                    'Hellobox',
                    'Are you sure you want to cancel your booking?',
                    [
                        {text: 'Cancel', style: 'cancel'},
                        {text: 'OK', onPress: () => this.props.updateBookingStatus(value)},
                    ],
                    { cancelable: false }
                )
            }
        }

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
                                        <Text style={styles.locationTime}>{this.props.currentBooking.pick_up_date}</Text>
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

                            { (this.props.currentBooking.note || this.props.currentBooking.note !== "") && 
                                <View style={styles.noteContainer}>
                                    <Text style={styles.additionalHeader}>Note:</Text>
                                    <View style={styles.additionalListContainer}>
                                        <Icon style={styles.additionalIcon} name="sticky-note" />
                                        <View style={styles.additionalValueContainer}>
                                            <Text style={styles.additionalText}>{this.props.currentBooking.note}</Text>
                                        </View>
                                    </View>
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

                            { (this.props.currentBooking.status == "JOB COMPLETED") && 
                                <View style={styles.ratingContainer}>
                                    <Text style={styles.ratingHeader}>You rated</Text>
                                    <View stye={styles.startContainer}>
                                        <StarRating
                                            style={styles.starRating}                                            
                                            disabled={true}
                                            maxStars={5}
                                            rating={parseInt(this.props.currentBooking.rating)}
                                            selectedStar={(rating) => this.onStarRatingPress(rating)}
                                            starColor={'red'}
                                        />
                                    </View>
                                </View>
                            }
                        </Content> 
                        { (this.props.currentBooking.status != "JOB COMPLETED" && this.props.currentBooking.status != "CANCELLED") && 
                            <Footer>
                                <FooterTab style={styles.footerContainer}>
                                    <Button info disabled={((this.props.currentBooking.status !== "APPROVED" && this.props.currentBooking.status !== "CANCELLED") ? false : true)} style={styles.button} onPress={() => this.props.setShowMapTrackModal(true)}>
                                        <Text style={styles.subText}>LIVE TRACK</Text>
                                    </Button>
                                    <Button danger disabled={(this.props.currentBooking.status === "CANCELLED" ? true : false)} style={styles.button} onPress={() => handleBookingUpdate("CANCELLED")}>
                                        <Text style={styles.subText}>CANCEL</Text>
                                    </Button>
                                </FooterTab>
                            </Footer>
                        }
                    </View>
            
                    ||
                    
                    <View style={styles.floatView}>
                        <Spinner color='red' />
                    </View>
                }    

                <RatingModal 
                    showRatingModal={this.props.showRatingModal}
                    booking={this.props.booking}
                    selectedStar={this.props.selectedStar}
                    setSelectedStar={this.props.setSelectedStar}
                    getComment={this.props.getComment}  
                    comment={this.props.comment}
                    saveComment={this.props.saveComment}
                />
                
                { (this.props.currentBooking && this.props.currentDriverLocation) &&     
                    <MapTrack
                        showMapTrackModal={this.props.showMapTrackModal}
                        setShowMapTrackModal={this.props.setShowMapTrackModal}
                        region={this.props.region}
                        carMarker={carMarker}
                        currentDriverLocation={this.props.currentDriverLocation}
                        dropOff={this.props.currentBooking.drop_off}
                        pickUp={this.props.currentBooking.pick_up}
                        driverInfo={this.props.currentBooking.driver}
                        trackDriver={this.props.trackDriver}
                    />
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
    noteContainer: {
        flex: 1,
        backgroundColor: "#F4F6F6",
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
    footerContainer:{
        // paddingTop: 10,
		backgroundColor:"#fff",
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

export default BookingDetail;