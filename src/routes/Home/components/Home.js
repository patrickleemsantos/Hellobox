import React from "react";
import { ToastAndroid, Platform, View, Text, StyleSheet, AsyncStorage, BackHandler } from "react-native";
import { Container, Content, Drawer, Footer, FooterTab, Button } from "native-base";
import { Actions } from "react-native-router-flux";
import MapContainer from "./MapContainer";
import HeaderComponent from "../../../components/HeaderComponent";
import SelectVehicle from "./SelectVehicle";
import Fare from "./Fare";
import Fab from "./Fab";
import SideBar from '../../../components/SideBar';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import OneSignal from 'react-native-onesignal';

var deepEqual = require('fast-deep-equal');
var Spinner = require("react-native-spinkit");

const justBoxLogo = require("../../../assets/images/logo.png");
const carMarker = require("../../../assets/images/carMarker.png");

class Home extends React.Component {

    componentDidMount() {
        if (Platform.OS === 'android') {
            // Check location service for Android
            LocationServicesDialogBox.checkLocationServicesIsEnabled({
                message: "<h2>Use Location?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
                ok: "YES",
                cancel: "NO",
                enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => ONLY GPS PROVIDER
                showDialog: true, // false => Opens the Location access page directly
                openLocationServices: true // false => Directly catch method is called if location services are turned off
            }).then(function(success) {
                var rx = this;
                setInterval(function(){
                    rx.props.getCurrentLocation();
                    rx.props.getNearByDrivers();
                }, 5000);

            }.bind(this)
            ).catch((error) => {
                console.log(error.message);
            });
            
            // Handle back press for Android
            BackHandler.addEventListener('hardwareBackPress', () => {
                LocationServicesDialogBox.forceCloseDialog();
            });
        } else {
            var rx = this;
            setInterval(function(){
                rx.props.getCurrentLocation();
                rx.props.getNearByDrivers();
            }, 5000);
        }

        // Initialize One Signal
        OneSignal.configure({});
        OneSignal.enableSound(true);
        OneSignal.enableVibrate(true);
        OneSignal.getPermissionSubscriptionState((status) => {
          this.props.updatePushNotificationID(status.userId);
        });

        if (this.props.reset) {
            this.props.resetBooking(); 
        }
    }

    shouldComponentUpdate(nextProps) {
        return !deepEqual(this.props, nextProps);
    }

    render() {
        const initialRegion = this.props.region;

        closeDrawer = () => {
            this.drawer._root.close()
        };
        
        openDrawer = () => {
            this.drawer._root.open()
        }; 
        
        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={<SideBar 
                                navigator={this.navigator} 
                                account={this.props.account} 
                                clearState={this.props.clearState} 
                            />}
                onClose={() => closeDrawer()} >
                <Container>
                    <View style={{flex:1}}>
                        <HeaderComponent 
                                logo={justBoxLogo}
                                showAdditionalModal={this.props.showAdditionalModal}
                                resetBooking={this.props.resetBooking} 
                                resultTypes={this.props.resultTypes}
                                closeResultType={this.props.closeResultType} /> 
                            <View style={styles.floatView}>
                                <Spinner style={styles.spinner} isVisible={ (this.props.isMapReady == false ? true : false ) } size={40} type="Wave" color="#ffffff"/>
                            </View>
                            { (this.props.isMapReady === true) &&
                                <MapContainer 
                                    initialRegion={initialRegion}
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
                                    showExtraDropOff={this.props.showExtraDropOff}
                                    hideExtraDropOff={this.props.hideExtraDropOff}
                                    showExtraDropOff1={this.props.showExtraDropOff1}
                                    showExtraDropOff2={this.props.showExtraDropOff2}
                                    showExtraDropOff3={this.props.showExtraDropOff3}
                                    showExtraDropOff4={this.props.showExtraDropOff4}
                                    fare={this.props.fare}
                                    reCalculateFare={this.props.reCalculateFare}
                                    // directions={this.props.directions}
                                />
                                ||
                                <Content />
                            }

                        { this.props.fare &&
                            <Fare 
                                fare={this.props.fare}
                                additionalPrice={this.props.additionalPrice}
                                isFareLoading={this.props.isFareLoading}
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
                                        <Text style={styles.subText}>PROCEED</Text>
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
		backgroundColor:"#ECF0F1",
	},
	button: {
		margin: 5,
        height: 40,
        backgroundColor: "#E90000"
	},
	subText:{
		fontSize:14,
		fontWeight: "bold",
		color: "#FFFF"
	}
});
export default Home; 