import React from "react";
import { View, Header, Left, Right, Button, Body, Title } from "native-base";
import MapView from "react-native-maps";
import Modal from 'react-native-modalbox';
import DriverFooterProfile from "../DriverFooterProfile";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./MapTrackStyles.js";

export const MapTrack = ({ 
		region,
		currentDriverLocation,
		dropOff,
		pickUp,
		carMarker,
		showMapTrackModal,
		trackDriver,
		driverInfo,
		setShowMapTrackModal
	})=>{

	if (showMapTrackModal === true) {
		setTimeout(function(){
			trackDriver();
		}, 2000);
	}

	return(
		<Modal 
			style={styles.modal}
			coverScreen={true}
			position={"center"} 
			isOpen={showMapTrackModal}
			swipeToClose={false}
			backdropPressToClose={false}
			backButtonClose={true}>
			<Header style={styles.headerColor} iosBarStyle="light-content" androidStatusBarColor="#E90000">
				<Left>
					<Button transparent onPress={() => setShowMapTrackModal(false)}>
						<Icon name="arrow-left" style={styles.menu} /> 
					</Button>
				</Left>
				<Body>
					<Title style={styles.title}>Track Driver</Title>
				</Body>
				<Right>
				</Right>
			</Header>
			<View style={styles.container}>
				<MapView
					provider={MapView.PROVIDER_GOOGLE}
					style={styles.map}
					region={region}
					>

					<MapView.Marker
						coordinate={{latitude: parseFloat(pickUp.latitude), longitude:parseFloat(pickUp.longitude)}}
						pinColor="green"
					/>	

					<MapView.Marker
						coordinate={{latitude:parseFloat(dropOff.latitude), longitude:parseFloat(dropOff.longitude)}}
						pinColor="blue"
					/>	

					<MapView.Marker
						coordinate={{latitude:currentDriverLocation.coordinate.coordinates[1], longitude:currentDriverLocation.coordinate.coordinates[0]}}
						image={carMarker}

					/>	

				</MapView>
			</View>
			<DriverFooterProfile
				driverInfo={driverInfo}
			/>
		</Modal>
	)
}

export default MapTrack;