import React from "react";
import { View, Text } from "react-native";
import { Container } from "native-base";
import MapContainer from "./MapContainer";
import HeaderComponent from "../../../components/HeaderComponent";
import SelectVehicle from "./SelectVehicle";
import Fare from "./Fare";
import AdditionalModal from "./AdditionalModal";
import Fab from "./Fab";
import FindDriver from "./FindDriver";

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

    render() {
        const region = {
            latitude: 14.574036,
            longitude: 121.002582,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        }
        const { status } = this.props.booking;
        return (
            <Container>
                { (status !== "pending") &&
                    <View style={{flex:1}}>
                        <HeaderComponent 
                                logo={justBoxLogo}
                                showAdditionalModal={this.props.showAdditionalModal}
                            />

                        {this.props.region.latitude &&
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
                                directions={this.props.directions}
                            />
                        }

                        <Fab onPressAction={() => this.props.bookCar()}/>

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
                    <FindDriver selectedAddress={this.props.selectedAddress}/>
                }
            </Container>
        );
    }
}

export default Home;