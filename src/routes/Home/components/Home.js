import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Container, Content, Drawer } from "native-base";
import { Actions } from "react-native-router-flux";
import MapContainer from "./MapContainer";
import HeaderComponent from "../../../components/HeaderComponent";
import SelectVehicle from "./SelectVehicle";
import Fare from "./Fare";
import AdditionalModal from "./AdditionalModal";
import Fab from "./Fab";
import FindDriver from "./FindDriver";
import { BookingFooter } from "./BookingFooter/index";
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
        if (this.props.booking.status === "CONFIRMED" ){ 
            AsyncStorage.getItem('account', (err, result) => {
                let account = JSON.parse(result);
                if (account.account_id === this.props.bookingRequest.account.account_id) {                    
                    // Actions.trackDriver({type: "reset"});
                    Actions.bookings();
                }
            });
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
                    { (status !== "PENDING") &&
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
                                <BookingFooter
                                        onPressAction={() => this.props.bookCar()}
                                        fare={this.props.fare}
                                    />
                            }
                            <AdditionalModal 
                                fare={this.props.fare}
                                additionalPrice={this.props.additionalPrice}
                                isAdditionalModalVisible={this.props.isAdditionalModalVisible}
                                showAdditionalModal={this.props.showAdditionalModal}
                                addAdditionalServices={this.props.addAdditionalServices}
                                removeAdditionalServices={this.props.removeAdditionalServices}
                                addAdditionalPrice={this.props.addAdditionalPrice}
                                removeAdditionalPrice={this.props.removeAdditionalPrice}
                                additionalService1={this.props.additionalService1}
                                additionalService2={this.props.additionalService2}
                                additionalService3={this.props.additionalService3}
                                additionalService4={this.props.additionalService4}
                                additionalService5={this.props.additionalService5}
                                additionalService6={this.props.additionalService6}
                                updateAdditionalService={this.props.updateAdditionalService}
                            />
                        </View>
                        ||
                        <FindDriver selectedAddress={this.props.selectedAddress}
                                    updateBookingStatus={this.props.updateBookingStatus}/>
                    }
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
});
export default Home; 