import React from "react";
import { View, Text, StyleSheet, AsyncStorage } from "react-native";
import { Container, Content, Drawer, Footer, FooterTab, Button } from "native-base";
import { Actions } from "react-native-router-flux";
import MapContainer from "./MapContainer";
import HeaderComponent from "../../../components/HeaderComponent";
import SelectVehicle from "./SelectVehicle";
import Fare from "./Fare";
import Fab from "./Fab";
import SideBar from '../../../components/SideBar';
var Spinner = require("react-native-spinkit");

const justBoxLogo = require("../../../assets/images/logo.png");
const carMarker = require("../../../assets/images/carMarker.png");

class Home extends React.Component {

    componentDidMount() {
        var rx = this;
		this.props.getCurrentLocation();
		setTimeout(function(){
			rx.props.getNearByDrivers();
		}, 1000);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.booking.booking_id === this.props.booking.booking_id){
            if (this.props.booking.status === "APPROVED" ){ 
                AsyncStorage.getItem('account', (err, result) => {
                    let account = JSON.parse(result);
                    if (account.account_id === this.props.booking.account.account_id) {         
                        Actions.bookingDetail({booking: this.props.booking});
                        this.props.removeBooking();
                    }
                });
            }
        }
    }

    render() {
        closeDrawer = () => {
            this.drawer._root.close()
        };
        
        openDrawer = () => {
            this.drawer._root.open()
        }; 

        const { status } = this.props.booking;
        
        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={<SideBar navigator={this.navigator} account={this.props.account} />}
                onClose={() => closeDrawer()} >
                <Container>
                        <View style={{flex:1}}>
                            <HeaderComponent 
                                    logo={justBoxLogo}
                                    showAdditionalModal={this.props.showAdditionalModal} /> 
                                <View style={styles.floatView}>
                                    <Spinner style={styles.spinner} isVisible={ (this.props.isMapReady == false ? true : false ) } size={40} type="Wave" color="#ffffff"/>
                                </View>
                                { (this.props.isMapReady === true) &&
                                    <MapContainer 
                                        region={this.props.region} 
                                        getInputData={this.props.getInputData} 
                                        toggleSearchResultmodal={this.props.toggleSearchResultmodal}
                                        getAddressPredictions={this.props.getAddressPredictions}
                                        resultTypes={this.props.resultTypes}
                                        predictions={this.props.predictions}
                                        getSelectedAddress={this.props.getSelectedAddress}
                                        selectedAddress={this.props.selectedAddress}
                                        carMarker={carMarker}
                                        nearByDrivers={this.props.nearByDrivers}
                                        isSearchAddressLoading={this.props.isSearchAddressLoading}
                                        closeResultType={this.props.closeResultType}
                                        // directions={this.props.directions}
                                    />
                                    ||
                                    <Content />
                                }

                                {/* <Fab onPressAction={() => this.props.bookCar()}/> */}

                            { this.props.fare &&
                                <Fare 
                                    fare={this.props.fare}
                                    additionalPrice={this.props.additionalPrice}
                                />
                            }
                            <SelectVehicle 
                                getSelectedVehicle={this.props.getSelectedVehicle}
                                selectedVehicle={this.props.selectedVehicle} 
                            />
                            { this.props.fare &&
                                <Footer>
                                    <FooterTab style={styles.btnFooterContainer} iosBarStyle="light-content" androidStatusBarColor="#E90000">
                                        <Button success style={styles.button} onPress={() => Actions.additionalServices()}>
                                            <Text style={styles.subText}>Next</Text>
                                        </Button>
                                    </FooterTab>
                                </Footer>
                            }
                        </View>
                </Container>
            </Drawer>
        );
    }
}

const styles = StyleSheet.create({    
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
    btnFooterContainer:{
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
	}
});
export default Home; 