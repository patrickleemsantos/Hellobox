import React from "react";
import {Text, Image} from "react-native";
import { View, Button } from "native-base";

import styles from "./DriverFoundStyles.js";

export const DriverFound = ({ driverInfo, setShowDriver })=>{
	const { profilePic } = driverInfo || "";
	const { vehicle } = driverInfo || {};
	return (
		<View style={styles.findDriverContainer}>
			<View style={styles.content}>
				<Text>YAY Driver Found!</Text>
				<Image resizemode="contain" style={styles.driverPic} source={{uri:driverInfo.profile_picture}} />
				<View style={styles.driverInfo}>
					<Text style={styles.quotationMarkLeft}>""</Text>
					<View style={styles.driverBio}>
						<Text style={styles.bioText}>
							Hi my name is
						</Text>
						<Text style={styles.nameText}>
							{driverInfo.first_name} {driverInfo.last_name}
						</Text>
						<Text style={styles.bioText}>
							and I am 0.2km away.
						</Text>
					</View>
					<Text style={styles.quotationMarkRight}>""</Text>
				</View>
				<View style={styles.vehicleDetails}>
					<Text style={styles.vehicleText}>Vehicle Plate number:</Text>
					<Text style={styles.vehicleNumber}> {vehicle && vehicle.plate_number}</Text>
					<Button  style={styles.nextBtn} onPress={() => setShowDriver(false)}>
						<Text style={styles.nextBtnText}>Next</Text>
					</Button>
				</View>
			</View>
			
		</View>

	);
}

export default  DriverFound;