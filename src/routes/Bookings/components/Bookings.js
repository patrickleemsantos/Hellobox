import React from "react";
import { View, Alert, AsyncStorage, StyleSheet, TouchableOpacity } from "react-native";
import { Container, Content, Card, CardItem, Body, List, Left, Right, Text, Header, Button, Title } from "native-base";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/FontAwesome";
var Spinner = require("react-native-spinkit");

class Bookings extends React.Component {

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
						{ this.props.bookings && 
							<List dataArray={this.props.bookings}
								renderRow={(booking) =>
								<TouchableOpacity
									onPress={() => Actions.bookingDetail({booking: booking, showDriverValue: false})}
									activeOpacity={1}>
									<Card>
										<CardItem>
											<View style={{flex: 1, flexDirection: 'column'}}>
												<View style={styles.headerContainer}>
													<Icon style={styles.bookingIcon} name="truck" />
													<View style={styles.jobContainer}>
														<Text style={styles.job}>JOB ID: {booking.booking_id}</Text>
														<Text style={styles.note}>DRIVER: {booking.driver.first_name.toUpperCase() + " " + booking.driver.last_name.toUpperCase()}</Text>
													</View>
													<View style={styles.statusContainer}>
														<Text style={ styles.status }>{booking.status}</Text>
													</View>
												</View>
												<View style={styles.locationContainter}>
													<View style={styles.timeContainer}>
														<Icon style={styles.timeIcon} name="clock-o" />
														<View style={styles.locationValueContainer}>
															<Text style={styles.locationTime}>{booking.timestamp}</Text>
														</View>
													</View>
													<View style={styles.pickUpContainer}>
														<Icon style={styles.fromIcon} name="map-marker" />
														<View style={styles.locationValueContainer}>
															<Text style={styles.locationPickup}>{booking.pick_up.address}</Text>
														</View>
													</View>
													<View style={styles.ellipsisContainer}>
														<Icon style={styles.ellipsisIcon} name="ellipsis-v" />
													</View>
													<View style={styles.dropOffContainer}>
														<Icon style={styles.destinationIcon} name="location-arrow" />
														<View style={styles.locationValueContainer}>
															<Text style={styles.locationDropOff}>{booking.drop_off.address}</Text>
														</View>
													</View>
												</View>
											</View>
										</CardItem>
									</Card>
								</TouchableOpacity>
								}>
							</List>
							||
							<Spinner style={styles.spinner} isVisible={true} size={40} type="Wave" color="#ffffff"/>
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
	headerContainer: {
		flex: 1,
		flexDirection: 'row'
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
		textAlign: 'right',
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
	ellipsisIcon: {
        fontSize:10,
        color:"#3498DB",
    },
	note: {
		marginTop: 5,
		fontSize:  13,
		color: "#999999"
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
	jobContainer: {
        flex: 1,
        paddingLeft: 10
	},
	statusContainer: {
		flex: 1
	},
	timeIcon:{
        fontSize:20,
        color:"#00FF00",
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
	spinner: {
        color: "#E90000",
        marginTop: 100,
        alignSelf: "center"
    },
  });

export default Bookings;