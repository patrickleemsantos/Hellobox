import React from "react";
import { View, Alert, AsyncStorage, StyleSheet, TouchableOpacity } from "react-native";
import { Container, Content, Card, CardItem, Body, List, Left, Right, Text, Header, Button, Title } from "native-base";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/FontAwesome";
var Spinner = require("react-native-spinkit");

class Bookings extends React.Component{

	componentDidMount() {
		AsyncStorage.getItem('account', (err, result) => {
            let account = JSON.parse(result);           
            this.props.getBookings(account.account_id);
        });
    }
    
	componentWillReceiveProps(nextProps) {
		
	} 

	render () {
        return (
            <Container>
				<View style={{flex:1}}>
					<Header style={styles.headerColor} iosBarStyle="light-content" androidStatusBarColor="#E90000">
						<Left>
							<Button transparent onPress={() => Actions.pop()}>
								<Icon name="arrow-left" style={styles.menu} /> 
							</Button>
						</Left>
						<Body>
							<Title style={styles.title}>Bookings</Title>
						</Body>
						<Right>
						</Right>
					</Header>
					<Content>
						<View style={styles.floatView}>
							<Spinner style={styles.spinner} isVisible={this.props.showBookingLoader} size={40} type="Wave" color="#ffffff"/>
						</View>
						{ this.props.bookings && 
							<List dataArray={this.props.bookings}
								renderRow={(booking) =>
								<TouchableOpacity
									// onPress={() => Actions.bookingDetail({booking: booking})}
									activeOpacity={1}>
									<Card>
										<CardItem header>
											<Left style={styles.leftContainer}>
												<Icon style={styles.bookingIcon} name="truck" />
												<Body>
													<Text style={ styles.job }>JOB ID: {booking.booking_id}</Text>
													<Text style={ styles.note }>{booking.account.first_name.toUpperCase() + " " + booking.account.last_name.toUpperCase()}</Text>
												</Body>
											</Left>
											<Body></Body>
											<Right>
												<Text style={ styles.status }>{booking.status.toUpperCase()}</Text>
											</Right>
										</CardItem>
										<CardItem>
											<Left style={styles.leftContainer}>
												<Icon style={styles.fromIcon} name="clock-o" />
												<Body>
													<Text style={ styles.pickUp }>TIME: {booking.timestamp}</Text>
												</Body>
											</Left>
										</CardItem>
										<CardItem>
											<Left style={styles.leftContainer}>
												<Icon style={styles.fromIcon} name="map-marker" />
												<Body>
													<Text style={ styles.pickUp }>PICK UP: {booking.pick_up.address}</Text>
												</Body>
											</Left>
										</CardItem>
										<CardItem>
											<Left style={styles.leftContainer}>
												<Icon style={styles.destinationIcon} name="location-arrow" />
												<Body>
													<Text style={ styles.dropOff }>DROP OFF: {booking.drop_off.address}</Text>
												</Body>
											</Left>
										</CardItem>
									</Card>
								</TouchableOpacity>
								}>
							</List>
						}
					</Content>  
				</View>
                  
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
        fontSize: 14
	},
	title: {
		color: "#FFFFFF",
	},
	menu: {
		color: "#fff",
		fontSize: 20
    },
    pickUp: {
        fontSize: 13
    },
    dropOff: {
        fontSize: 13
	},
	status: {
		fontSize: 12,
		color: "#1589FF"
    },
    bookingIcon:{
        fontSize:20,
        color:"#E90000",
	},
	fromIcon:{
        fontSize:20,
        color:"#E90000",
	},
	destinationIcon:{
        fontSize:20,
        color:"#999999",
	},
	note: {
		marginTop: 5,
		fontSize:  13,
		color: "#999999"
	},
	spinner: {
        color: "#E90000",
        // marginTop: 100,
        alignSelf: "center"
    },
    floatView: {
        position: 'absolute',
        width: 100,
        height: 100,
        top: 200,
        alignSelf: "center"
    },
  });

export default Bookings;