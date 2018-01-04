import React from "react";
import {Text} from "react-native";
import { View, Button, Col, Row, Grid} from "native-base";
var Spinner = require("react-native-spinkit");

import styles from "./FareStyles.js";

export const Fare = ({fare, isFareLoading})=>{
	return (
		<View style={styles.fareContainer}>
			<Grid>
				<Col style={styles.colFare}>
					<Text style={styles.fareText}> Price: ₱</Text><Text style={styles.amountText}>{fare.toLocaleString('en')}</Text>
				</Col>
				<Col style={styles.colBreakdown}>
					{/* <Button style={styles.btnBreakdown} transparent>
						<Text style={styles.showBreakdownText}>Show Breakdown</Text>
					</Button> */}
					<Spinner style={styles.spinner} isVisible={ (isFareLoading == false ? false : true ) } size={40} type="ThreeBounce"/>
				</Col>
			</Grid>
		</View>

	);
}

export default  Fare;