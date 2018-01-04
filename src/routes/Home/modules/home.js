import update from "react-addons-update";
import constants from "./actionConstants";
import { Dimensions, NetInfo, Platform, Alert } from "react-native";
import RNGooglePlaces from "react-native-google-places";
// import Polyline from '@mapbox/polyline';
import request from "../../../util/request";
import calculateFare from "../../../util/fareCalculator";

//------------------------
//Constants
//------------------------
const { GET_CURRENT_LOCATION, 
		GET_INPUT, 
		TOGGLE_SEARCH_RESULT,
		GET_ADDRESS_PREDICTIONS,
		GET_SELECTED_ADDRESS,
		GET_DISTANCE_MATRIX,
		GET_FARE,
		GET_SELECTED_VEHICLE,
		GET_NEARBY_DRIVERS,
		UPDATE_SEARCH_ADDRESS_LOADING_STATUS,
		CLOSE_RESULT_TYPE,
		GET_DIRECTIONS,
		IS_MAP_READY,
		RESET_BOOKING,
		SHOW_EXTRA_DROP_OFF,
		HIDE_EXTRA_DROP_OFF,
		SET_LOADING_FARE
	} = constants;

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;

//------------------------
//Actions
//------------------------
export function resetBooking(payload) {
	return {
		type: RESET_BOOKING,
		payload
	}
}

export function showExtraDropOff(payload) {
	return {
		type: SHOW_EXTRA_DROP_OFF,
		payload
	}
}

export function hideExtraDropOff(payload) {
	return {
		type: HIDE_EXTRA_DROP_OFF,
		payload
	}
}

export function updatePushNotificationID(payload) {
	return(dispatch, store) => {
		if (Platform.OS === 'ios') {
			request.put("http://52.220.212.6:3121/api/updatePushNotificationID")
			.send({
				account_id: store().login.account.account_id,
				notification_id: payload
			})
			.finish((error, res)=>{
				console.log(res);
			});
		} else {
			NetInfo.isConnected.fetch().then(isConnected => {
				if(isConnected) {
					request.put("http://52.220.212.6:3121/api/updatePushNotificationID")
					.send({
						account_id: store().login.account.account_id,
						notification_id: payload
					})
					.finish((error, res)=>{
						console.log(res);
					});
				} else {
					Alert.alert('Unable to update notification ID', "Please connect to the internet");
				}
			});
		}
	}
}

export function closeResultType(payload) {
	return(dispatch, store) => {
		dispatch({
				type: CLOSE_RESULT_TYPE,
				payload
			}
		)
	}
}

export function updateSearchAddressLoadingStatus() {
	return (dispatch) => {
		type: UPDATE_SEARCH_ADDRESS_LOADING_STATUS,
		payload
	}
}

export function getCurrentLocation(){
	return(dispatch) => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				dispatch({
					type: GET_CURRENT_LOCATION,
					payload: position
				});

				dispatch({
					type: IS_MAP_READY,
					payload: true
				});
			},
			(error) => console.log(error.message),
			{enableHighAccuracy: false, timeout: 20000, maximumAge:1000}
		);
	}
}

//Get user input
export function getInputData(payload) {
	return{
		type: GET_INPUT,
		payload
	}
}

//Toggle search result modal
export function toggleSearchResultmodal(payload) {
	return{
		type: TOGGLE_SEARCH_RESULT,
		payload
	}
}

//Get addresses from google place
export function getAddressPredictions() {
	return(dispatch, store) => {
		var userInput = "";

		if (store().home.resultTypes.pickUp) {
			userInput = store().home.inputData.pickUp;
		} else if (store().home.resultTypes.dropOff) {
			userInput = store().home.inputData.dropOff;
		} else if (store().home.resultTypes.extraDropOff1) {
			userInput = store().home.inputData.extraDropOff1;
		} else if (store().home.resultTypes.extraDropOff2) {
			userInput = store().home.inputData.extraDropOff2;
		} else if (store().home.resultTypes.extraDropOff3) {
			userInput = store().home.inputData.extraDropOff3;
		} else if (store().home.resultTypes.extraDropOff4) {
			userInput = store().home.inputData.extraDropOff4;
		}
		
		if (userInput != "") {
			dispatch({
				type: UPDATE_SEARCH_ADDRESS_LOADING_STATUS,
				payload: true
			})

			dispatch({
				type: GET_ADDRESS_PREDICTIONS,
				payload: {}
			})
			RNGooglePlaces.getAutocompletePredictions(userInput,
				{
					country: "PH"
				}
			)
			.then((results) =>
				dispatch({
							type: GET_ADDRESS_PREDICTIONS,
							payload: results
						}
					)
			)
			.then(() => dispatch({
				type: UPDATE_SEARCH_ADDRESS_LOADING_STATUS,
				payload: false
			}))
			.catch((error) => console.log(error.message))
		}
	};
}

//Get selected address
export function getSelectedAddress(payload) {
	return (dispatch, store) => {
		RNGooglePlaces.lookUpPlaceByID(payload)
		.then((results) => {
			dispatch({
				type: GET_SELECTED_ADDRESS,
				payload: results
			})
		})
		.then(() => {
			//Get the distance and time
			if(store().home.selectedAddress.selectedPickUp && store().home.selectedAddress.selectedDropOff){
				var isInternetConnected = false;

				// if (Platform.OS === 'ios') {
				// 	isInternetConnected = true;
				// } else {
				// 	NetInfo.isConnected.fetch().then(isConnected => {
				// 		if(isConnected) {
				// 			isInternetConnected = true;
				// 		}
				// 	});
				// }

				isInternetConnected = true;

				if (isInternetConnected) {
					dispatch({
						type: SET_LOADING_FARE,
						payload: true
					});
					request.get("https://maps.googleapis.com/maps/api/distancematrix/json")
					.query({
						origins:store().home.selectedAddress.selectedPickUp.latitude + "," + store().home.selectedAddress.selectedPickUp.longitude,
						destinations:store().home.selectedAddress.selectedDropOff.latitude + "," + store().home.selectedAddress.selectedDropOff.longitude,
						mode: "driving",
						key: "AIzaSyBNDEF41tmSDitm8r73vTGbUviVpKC1XiM"
					})
					.finish((error, res)=>{
						dispatch({
							type:GET_DISTANCE_MATRIX,
							payload:res.body
						});

						setTimeout(function() {
							if(store().home.selectedAddress.selectedPickUp && store().home.selectedAddress.selectedDropOff){
								const fare = calculateFare(
									store().home.distanceMatrix.rows[0].elements[0].duration.value,
									store().home.distanceMatrix.rows[0].elements[0].distance.value,
									store().home.selectedVehicle
								);

								// Start Calculate of extra drop off 1
								if (store().home.selectedAddress.selectedExtraDropOff1) {
									request.get("https://maps.googleapis.com/maps/api/distancematrix/json")
									.query({
										origins:store().home.selectedAddress.selectedDropOff.latitude + "," + store().home.selectedAddress.selectedDropOff.longitude,
										destinations:store().home.selectedAddress.selectedExtraDropOff1.latitude + "," + store().home.selectedAddress.selectedExtraDropOff1.longitude,
										mode: "driving",
										key: "AIzaSyBNDEF41tmSDitm8r73vTGbUviVpKC1XiM"
									})
									.finish((error, res)=>{
										dispatch({
											type:GET_DISTANCE_MATRIX,
											payload:res.body
										});

										setTimeout(function() {
											if(store().home.selectedAddress.selectedDropOff && store().home.selectedAddress.selectedExtraDropOff1){
												const fare1 = calculateFare(
													store().home.distanceMatrix.rows[0].elements[0].duration.value,
													store().home.distanceMatrix.rows[0].elements[0].distance.value,
													store().home.selectedVehicle
												);
			
												// Start Calculate of extra drop off 2
												if (store().home.selectedAddress.selectedExtraDropOff2) {
													request.get("https://maps.googleapis.com/maps/api/distancematrix/json")
													.query({
														origins:store().home.selectedAddress.selectedExtraDropOff1.latitude + "," + store().home.selectedAddress.selectedExtraDropOff1.longitude,
														destinations:store().home.selectedAddress.selectedExtraDropOff2.latitude + "," + store().home.selectedAddress.selectedExtraDropOff2.longitude,
														mode: "driving",
														key: "AIzaSyBNDEF41tmSDitm8r73vTGbUviVpKC1XiM"
													})
													.finish((error, res)=>{
														dispatch({
															type:GET_DISTANCE_MATRIX,
															payload:res.body
														});

														setTimeout(function() {
															if(store().home.selectedAddress.selectedExtraDropOff1){
																const fare2 = calculateFare(
																	store().home.distanceMatrix.rows[0].elements[0].duration.value,
																	store().home.distanceMatrix.rows[0].elements[0].distance.value,
																	store().home.selectedVehicle
																);
				
																// Start Calculate of extra drop off 3
																if (store().home.selectedAddress.selectedExtraDropOff3) {
																	request.get("https://maps.googleapis.com/maps/api/distancematrix/json")
																	.query({
																		origins:store().home.selectedAddress.selectedExtraDropOff2.latitude + "," + store().home.selectedAddress.selectedExtraDropOff2.longitude,
																		destinations:store().home.selectedAddress.selectedExtraDropOff3.latitude + "," + store().home.selectedAddress.selectedExtraDropOff3.longitude,
																		mode: "driving",
																		key: "AIzaSyBNDEF41tmSDitm8r73vTGbUviVpKC1XiM"
																	})
																	.finish((error, res)=>{
																		dispatch({
																			type:GET_DISTANCE_MATRIX,
																			payload:res.body
																		});

																		setTimeout(function() {
																			if(store().home.selectedAddress.selectedExtraDropOff2){
																				const fare3 = calculateFare(
																					store().home.distanceMatrix.rows[0].elements[0].duration.value,
																					store().home.distanceMatrix.rows[0].elements[0].distance.value,
																					store().home.selectedVehicle
																				);

																				// Start Calculate of extra drop off 4
																				if (store().home.selectedAddress.selectedExtraDropOff4) {
																					request.get("https://maps.googleapis.com/maps/api/distancematrix/json")
																					.query({
																						origins:store().home.selectedAddress.selectedExtraDropOff3.latitude + "," + store().home.selectedAddress.selectedExtraDropOff3.longitude,
																						destinations:store().home.selectedAddress.selectedExtraDropOff4.latitude + "," + store().home.selectedAddress.selectedExtraDropOff4.longitude,
																						mode: "driving",
																						key: "AIzaSyBNDEF41tmSDitm8r73vTGbUviVpKC1XiM"
																					})
																					.finish((error, res)=>{
																						dispatch({
																							type:GET_DISTANCE_MATRIX,
																							payload:res.body
																						});

																						setTimeout(function() {
																							if(store().home.selectedAddress.selectedExtraDropOff3){
																								const fare4 = calculateFare(
																									store().home.distanceMatrix.rows[0].elements[0].duration.value,
																									store().home.distanceMatrix.rows[0].elements[0].distance.value,
																									store().home.selectedVehicle
																								);
																
																								dispatch({
																									type: GET_FARE,
																									payload: fare + fare1 + fare2 + fare3 + fare4
																								})	

																								dispatch({
																									type: SET_LOADING_FARE,
																									payload: false
																								});
																							}
																						}, 2000)
																					})
																				} else {
																					dispatch({
																						type: GET_FARE,
																						payload: fare + fare1 + fare2 + fare3
																					})	

																					dispatch({
																						type: SET_LOADING_FARE,
																						payload: false
																					});
																				}
																				// End Calculate of extra drop off 4
																			}
																		}, 2000)
																	})
																} else {
																	dispatch({
																		type: GET_FARE,
																		payload: fare + fare1 + fare2
																	})	

																	dispatch({
																		type: SET_LOADING_FARE,
																		payload: false
																	});
																}
																// End Calculate of extra drop off 3
															}
														}, 2000)
													})
												} else {
													dispatch({
														type: GET_FARE,
														payload: fare + fare1
													})
				
													dispatch({
														type: SET_LOADING_FARE,
														payload: false
													});
												}
												// End Calculate of extra drop off 2
											}
										}, 2000)
									})
								} else {
									dispatch({
										type: GET_FARE,
										payload: fare
									})

									dispatch({
										type: SET_LOADING_FARE,
										payload: false
									});
								}
								// End Calculate of extra drop off 1
							}	
						}, 2000)
					})
				} else {
					Alert.alert('Error', "Please connect to the internet");
				}
			}
		})
		.catch((error) => console.log(error.message));
	}
}

export function reCalculateFare(payload) {
	return (dispatch, store) => {
		//Get the distance and time
		if(store().home.selectedAddress.selectedPickUp && store().home.selectedAddress.selectedDropOff){
			var isInternetConnected = false;

			isInternetConnected = true;

			if (isInternetConnected) {
				dispatch({
					type: SET_LOADING_FARE,
					payload: true
				});
				request.get("https://maps.googleapis.com/maps/api/distancematrix/json")
				.query({
					origins:store().home.selectedAddress.selectedPickUp.latitude + "," + store().home.selectedAddress.selectedPickUp.longitude,
					destinations:store().home.selectedAddress.selectedDropOff.latitude + "," + store().home.selectedAddress.selectedDropOff.longitude,
					mode: "driving",
					key: "AIzaSyBNDEF41tmSDitm8r73vTGbUviVpKC1XiM"
				})
				.finish((error, res)=>{
					dispatch({
						type:GET_DISTANCE_MATRIX,
						payload:res.body
					});

					setTimeout(function() {
						if(store().home.selectedAddress.selectedPickUp && store().home.selectedAddress.selectedDropOff){
							const fare = calculateFare(
								store().home.distanceMatrix.rows[0].elements[0].duration.value,
								store().home.distanceMatrix.rows[0].elements[0].distance.value,
								store().home.selectedVehicle
							);

							// Start Calculate of extra drop off 1
							if (store().home.selectedAddress.selectedExtraDropOff1) {
								request.get("https://maps.googleapis.com/maps/api/distancematrix/json")
								.query({
									origins:store().home.selectedAddress.selectedDropOff.latitude + "," + store().home.selectedAddress.selectedDropOff.longitude,
									destinations:store().home.selectedAddress.selectedExtraDropOff1.latitude + "," + store().home.selectedAddress.selectedExtraDropOff1.longitude,
									mode: "driving",
									key: "AIzaSyBNDEF41tmSDitm8r73vTGbUviVpKC1XiM"
								})
								.finish((error, res)=>{
									dispatch({
										type:GET_DISTANCE_MATRIX,
										payload:res.body
									});

									setTimeout(function() {
										if(store().home.selectedAddress.selectedDropOff && store().home.selectedAddress.selectedExtraDropOff1){
											const fare1 = calculateFare(
												store().home.distanceMatrix.rows[0].elements[0].duration.value,
												store().home.distanceMatrix.rows[0].elements[0].distance.value,
												store().home.selectedVehicle
											);
		
											// Start Calculate of extra drop off 2
											if (store().home.selectedAddress.selectedExtraDropOff2) {
												request.get("https://maps.googleapis.com/maps/api/distancematrix/json")
												.query({
													origins:store().home.selectedAddress.selectedExtraDropOff1.latitude + "," + store().home.selectedAddress.selectedExtraDropOff1.longitude,
													destinations:store().home.selectedAddress.selectedExtraDropOff2.latitude + "," + store().home.selectedAddress.selectedExtraDropOff2.longitude,
													mode: "driving",
													key: "AIzaSyBNDEF41tmSDitm8r73vTGbUviVpKC1XiM"
												})
												.finish((error, res)=>{
													dispatch({
														type:GET_DISTANCE_MATRIX,
														payload:res.body
													});

													setTimeout(function() {
														if(store().home.selectedAddress.selectedExtraDropOff1){
															const fare2 = calculateFare(
																store().home.distanceMatrix.rows[0].elements[0].duration.value,
																store().home.distanceMatrix.rows[0].elements[0].distance.value,
																store().home.selectedVehicle
															);
			
															// Start Calculate of extra drop off 3
															if (store().home.selectedAddress.selectedExtraDropOff3) {
																request.get("https://maps.googleapis.com/maps/api/distancematrix/json")
																.query({
																	origins:store().home.selectedAddress.selectedExtraDropOff2.latitude + "," + store().home.selectedAddress.selectedExtraDropOff2.longitude,
																	destinations:store().home.selectedAddress.selectedExtraDropOff3.latitude + "," + store().home.selectedAddress.selectedExtraDropOff3.longitude,
																	mode: "driving",
																	key: "AIzaSyBNDEF41tmSDitm8r73vTGbUviVpKC1XiM"
																})
																.finish((error, res)=>{
																	dispatch({
																		type:GET_DISTANCE_MATRIX,
																		payload:res.body
																	});

																	setTimeout(function() {
																		if(store().home.selectedAddress.selectedExtraDropOff2){
																			const fare3 = calculateFare(
																				store().home.distanceMatrix.rows[0].elements[0].duration.value,
																				store().home.distanceMatrix.rows[0].elements[0].distance.value,
																				store().home.selectedVehicle
																			);

																			// Start Calculate of extra drop off 4
																			if (store().home.selectedAddress.selectedExtraDropOff4) {
																				request.get("https://maps.googleapis.com/maps/api/distancematrix/json")
																				.query({
																					origins:store().home.selectedAddress.selectedExtraDropOff3.latitude + "," + store().home.selectedAddress.selectedExtraDropOff3.longitude,
																					destinations:store().home.selectedAddress.selectedExtraDropOff4.latitude + "," + store().home.selectedAddress.selectedExtraDropOff4.longitude,
																					mode: "driving",
																					key: "AIzaSyBNDEF41tmSDitm8r73vTGbUviVpKC1XiM"
																				})
																				.finish((error, res)=>{
																					dispatch({
																						type:GET_DISTANCE_MATRIX,
																						payload:res.body
																					});

																					setTimeout(function() {
																						if(store().home.selectedAddress.selectedExtraDropOff3){
																							const fare4 = calculateFare(
																								store().home.distanceMatrix.rows[0].elements[0].duration.value,
																								store().home.distanceMatrix.rows[0].elements[0].distance.value,
																								store().home.selectedVehicle
																							);
															
																							dispatch({
																								type: GET_FARE,
																								payload: fare + fare1 + fare2 + fare3 + fare4
																							})	

																							dispatch({
																								type: SET_LOADING_FARE,
																								payload: false
																							});
																						}
																					}, 2000)
																				})
																			} else {
																				dispatch({
																					type: GET_FARE,
																					payload: fare + fare1 + fare2 + fare3
																				})	

																				dispatch({
																					type: SET_LOADING_FARE,
																					payload: false
																				});
																			}
																			// End Calculate of extra drop off 4
																		}
																	}, 2000)
																})
															} else {
																dispatch({
																	type: GET_FARE,
																	payload: fare + fare1 + fare2
																})	

																dispatch({
																	type: SET_LOADING_FARE,
																	payload: false
																});
															}
															// End Calculate of extra drop off 3
														}
													}, 2000)
												})
											} else {
												dispatch({
													type: GET_FARE,
													payload: fare + fare1
												})
			
												dispatch({
													type: SET_LOADING_FARE,
													payload: false
												});
											}
											// End Calculate of extra drop off 2
										}
									}, 2000)
								})
							} else {
								dispatch({
									type: GET_FARE,
									payload: fare
								})

								dispatch({
									type: SET_LOADING_FARE,
									payload: false
								});
							}
							// End Calculate of extra drop off 1
						}	
					}, 2000)
				})
			} else {
				Alert.alert('Error', "Please connect to the internet");
			}
		}
	}
}

export function getSelectedVehicle(payload) {
	return(dispatch, store) => {
		dispatch({
			type: GET_SELECTED_VEHICLE,
			payload
		})

		//Get the distance and time
		if(store().home.selectedAddress.selectedPickUp && store().home.selectedAddress.selectedDropOff){
			var isInternetConnected = false;

			// if (Platform.OS === 'ios') {
			// 	isInternetConnected = true;
			// } else {
			// 	NetInfo.isConnected.fetch().then(isConnected => {
			// 		if(isConnected) {
			// 			isInternetConnected = true;
			// 		}
			// 	});
			// }

			isInternetConnected = true;

			if (isInternetConnected) {
				dispatch({
					type: SET_LOADING_FARE,
					payload: true
				});
				request.get("https://maps.googleapis.com/maps/api/distancematrix/json")
				.query({
					origins:store().home.selectedAddress.selectedPickUp.latitude + "," + store().home.selectedAddress.selectedPickUp.longitude,
					destinations:store().home.selectedAddress.selectedDropOff.latitude + "," + store().home.selectedAddress.selectedDropOff.longitude,
					mode: "driving",
					key: "AIzaSyBNDEF41tmSDitm8r73vTGbUviVpKC1XiM"
				})
				.finish((error, res)=>{
					dispatch({
						type:GET_DISTANCE_MATRIX,
						payload:res.body
					});

					setTimeout(function() {
						if(store().home.selectedAddress.selectedPickUp && store().home.selectedAddress.selectedDropOff){
							const fare = calculateFare(
								store().home.distanceMatrix.rows[0].elements[0].duration.value,
								store().home.distanceMatrix.rows[0].elements[0].distance.value,
								store().home.selectedVehicle
							);

							// Start Calculate of extra drop off 1
							if (store().home.selectedAddress.selectedExtraDropOff1) {
								request.get("https://maps.googleapis.com/maps/api/distancematrix/json")
								.query({
									origins:store().home.selectedAddress.selectedDropOff.latitude + "," + store().home.selectedAddress.selectedDropOff.longitude,
									destinations:store().home.selectedAddress.selectedExtraDropOff1.latitude + "," + store().home.selectedAddress.selectedExtraDropOff1.longitude,
									mode: "driving",
									key: "AIzaSyBNDEF41tmSDitm8r73vTGbUviVpKC1XiM"
								})
								.finish((error, res)=>{
									dispatch({
										type:GET_DISTANCE_MATRIX,
										payload:res.body
									});

									setTimeout(function() {
										if(store().home.selectedAddress.selectedDropOff && store().home.selectedAddress.selectedExtraDropOff1){
											const fare1 = calculateFare(
												store().home.distanceMatrix.rows[0].elements[0].duration.value,
												store().home.distanceMatrix.rows[0].elements[0].distance.value,
												store().home.selectedVehicle
											);
		
											// Start Calculate of extra drop off 2
											if (store().home.selectedAddress.selectedExtraDropOff2) {
												request.get("https://maps.googleapis.com/maps/api/distancematrix/json")
												.query({
													origins:store().home.selectedAddress.selectedExtraDropOff1.latitude + "," + store().home.selectedAddress.selectedExtraDropOff1.longitude,
													destinations:store().home.selectedAddress.selectedExtraDropOff2.latitude + "," + store().home.selectedAddress.selectedExtraDropOff2.longitude,
													mode: "driving",
													key: "AIzaSyBNDEF41tmSDitm8r73vTGbUviVpKC1XiM"
												})
												.finish((error, res)=>{
													dispatch({
														type:GET_DISTANCE_MATRIX,
														payload:res.body
													});

													setTimeout(function() {
														if(store().home.selectedAddress.selectedExtraDropOff1){
															const fare2 = calculateFare(
																store().home.distanceMatrix.rows[0].elements[0].duration.value,
																store().home.distanceMatrix.rows[0].elements[0].distance.value,
																store().home.selectedVehicle
															);
			
															// Start Calculate of extra drop off 3
															if (store().home.selectedAddress.selectedExtraDropOff3) {
																request.get("https://maps.googleapis.com/maps/api/distancematrix/json")
																.query({
																	origins:store().home.selectedAddress.selectedExtraDropOff2.latitude + "," + store().home.selectedAddress.selectedExtraDropOff2.longitude,
																	destinations:store().home.selectedAddress.selectedExtraDropOff3.latitude + "," + store().home.selectedAddress.selectedExtraDropOff3.longitude,
																	mode: "driving",
																	key: "AIzaSyBNDEF41tmSDitm8r73vTGbUviVpKC1XiM"
																})
																.finish((error, res)=>{
																	dispatch({
																		type:GET_DISTANCE_MATRIX,
																		payload:res.body
																	});

																	setTimeout(function() {
																		if(store().home.selectedAddress.selectedExtraDropOff2){
																			const fare3 = calculateFare(
																				store().home.distanceMatrix.rows[0].elements[0].duration.value,
																				store().home.distanceMatrix.rows[0].elements[0].distance.value,
																				store().home.selectedVehicle
																			);

																			// Start Calculate of extra drop off 4
																			if (store().home.selectedAddress.selectedExtraDropOff4) {
																				request.get("https://maps.googleapis.com/maps/api/distancematrix/json")
																				.query({
																					origins:store().home.selectedAddress.selectedExtraDropOff3.latitude + "," + store().home.selectedAddress.selectedExtraDropOff3.longitude,
																					destinations:store().home.selectedAddress.selectedExtraDropOff4.latitude + "," + store().home.selectedAddress.selectedExtraDropOff4.longitude,
																					mode: "driving",
																					key: "AIzaSyBNDEF41tmSDitm8r73vTGbUviVpKC1XiM"
																				})
																				.finish((error, res)=>{
																					dispatch({
																						type:GET_DISTANCE_MATRIX,
																						payload:res.body
																					});

																					setTimeout(function() {
																						if(store().home.selectedAddress.selectedExtraDropOff3){
																							const fare4 = calculateFare(
																								store().home.distanceMatrix.rows[0].elements[0].duration.value,
																								store().home.distanceMatrix.rows[0].elements[0].distance.value,
																								store().home.selectedVehicle
																							);
															
																							dispatch({
																								type: GET_FARE,
																								payload: fare + fare1 + fare2 + fare3 + fare4
																							})	

																							dispatch({
																								type: SET_LOADING_FARE,
																								payload: false
																							});
																						}
																					}, 2000)
																				})
																			} else {
																				dispatch({
																					type: GET_FARE,
																					payload: fare + fare1 + fare2 + fare3
																				})	

																				dispatch({
																					type: SET_LOADING_FARE,
																					payload: false
																				});
																			}
																			// End Calculate of extra drop off 4
																		}
																	}, 2000)
																})
															} else {
																dispatch({
																	type: GET_FARE,
																	payload: fare + fare1 + fare2
																})	

																dispatch({
																	type: SET_LOADING_FARE,
																	payload: false
																});
															}
															// End Calculate of extra drop off 3
														}
													}, 2000)
												})
											} else {
												dispatch({
													type: GET_FARE,
													payload: fare + fare1
												})
			
												dispatch({
													type: SET_LOADING_FARE,
													payload: false
												});
											}
											// End Calculate of extra drop off 2
										}
									}, 2000)
								})
							} else {
								dispatch({
									type: GET_FARE,
									payload: fare
								})

								dispatch({
									type: SET_LOADING_FARE,
									payload: false
								});
							}
							// End Calculate of extra drop off 1
						}	
					}, 2000)
				})
			} else {
				Alert.alert('Error', "Please connect to the internet");
			}
		}

		// if(store().home.selectedAddress.selectedPickUp && store().home.selectedAddress.selectedDropOff){
		// 	const fare = calculateFare(
		// 		store().home.distanceMatrix.rows[0].elements[0].duration.value,
		// 		store().home.distanceMatrix.rows[0].elements[0].distance.value,
		// 		store().home.selectedVehicle
		// 	);

		// 	dispatch({
		// 		type: GET_FARE,
		// 		payload: fare
		// 	})
		// }
	}
}

// Get nearby drivers
export function getNearByDrivers(){
	return(dispatch, store)=>{
		if (Platform.OS === 'ios') {
			// NetInfo.addEventListener('change',
			// 	(networkType)=> {
			// 		if (networkType == 'wifi' || networkType == 'cell') {
						request.get("http://52.220.212.6:3121/api/getNearByDrivers")
						.query({
							latitude:store().home.region.latitude,
							longitude:store().home.region.longitude,
							vehicle:store().home.selectedVehicle
						})
						.finish((error, res)=>{
							if(res){
								dispatch({
									type:GET_NEARBY_DRIVERS,
									payload:res.body
								});
							}
						});
					// } else {
					// 	Alert.alert('Error', "Please connect to the internet");
					// }
			// 	}
			// )
		} else {
			NetInfo.isConnected.fetch().then(isConnected => {
				if(isConnected) {
					request.get("http://52.220.212.6:3121/api/getNearByDrivers")
					.query({
						latitude:store().home.region.latitude,
						longitude:store().home.region.longitude,
						vehicle:store().home.selectedVehicle
					})
					.finish((error, res)=>{
						if(res){
							dispatch({
								type:GET_NEARBY_DRIVERS,
								payload:res.body
							});
						}
					});
				} else {
					Alert.alert('Error', "Please connect to the internet");
				}
			});
		}
	};
}

//------------------------
//Action Handlers
//------------------------
function handleGetDirections(state, action) {
	return update(state, {
		directions: {
			$set: action.payload
		}
	})
}

function handleCloseResultType(state, action) {
	return update(state, {
		resultTypes: {
			pickUp: {
				$set: false
			},
			dropOff: {
				$set: false
			},
			extraDropOff1: {
				$set: false
			},
			extraDropOff2: {
				$set: false
			},
			extraDropOff3: {
				$set: false
			},
			extraDropOff4: {
				$set: false
			}
		}
	})
}

function handleUpdateSearchAddressLoadingStatus(state, action) {
	return update(state, {
		isSearchAddressLoading:{
			$set: action.payload	
		}
	})
}

function handleGetCurrentLocation(state, action){
	return update(state, {
		region:{
			latitude:{
				$set: action.payload.coords.latitude
			},
			longitude:{
				$set: action.payload.coords.longitude
			},
			latitudeDelta:{
				$set: LATITUDE_DELTA
			},
			longitudeDelta:{
				$set: LONGITUDE_DELTA
			}
		}
	})
}

function handleGetInputData(state, action){
	const { key, value } = action.payload;
	return update(state, {
		inputData: {
			[key]: {
				$set:value
			}
		}
	});
}

function handleToggleSearchResult(state, action){
	if(action.payload === "pickUp") {
		return update(state, {
			resultTypes: {
				pickUp: {
					$set: true,
				},
				dropOff: {
					$set: false
				}
			},
			predictions: {
				$set: {}
			},
			selectedAddress: {
				selectedPickUp: {
					$set: null
				}
			},
			fare: {
				$set: null
			}
		})
	}

	if(action.payload === "dropOff") {
		return update(state, {
			resultTypes: {
				pickUp: {
					$set: false,
				},
				dropOff: {
					$set: true
				}
			},
			predictions: {
				$set: {}
			},
			selectedAddress: {
				selectedDropOff: {
					$set: null
				}
			},
			fare: {
				$set: null
			}
		})
	}

	if(action.payload === "extraDropOff1") {
		return update(state, {
			resultTypes: {
				extraDropOff1: {
					$set: true
				}
			},
			predictions: {
				$set: {}
			},
			selectedAddress: {
				selectedExtraDropOff1: {
					$set: null
				}
			}
		})
	}

	if(action.payload === "extraDropOff2") {
		return update(state, {
			resultTypes: {
				extraDropOff2: {
					$set: true
				}
			},
			predictions: {
				$set: {}
			},
			selectedAddress: {
				selectedExtraDropOff2: {
					$set: null
				}
			}
		})
	}

	if(action.payload === "extraDropOff3") {
		return update(state, {
			resultTypes: {
				extraDropOff3: {
					$set: true
				}
			},
			predictions: {
				$set: {}
			},
			selectedAddress: {
				selectedExtraDropOff3: {
					$set: null
				}
			}
		})
	}

	if(action.payload === "extraDropOff4") {
		return update(state, {
			resultTypes: {
				extraDropOff4: {
					$set: true
				}
			},
			predictions: {
				$set: {}
			},
			selectedAddress: {
				selectedExtraDropOff4: {
					$set: null
				}
			}
		})
	}
}

function handleGetAddressPredictions(state, action) {
	return update(state, {
		predictions: {
			$set: action.payload
		}
	})
}

function handleGetSelectedAddress(state, action) {
	// let selectedTitle = state.resultTypes.pickUp ? "selectedPickUp" : "selectedDropOff";
	var selectedTitle = "";

	if (state.resultTypes.pickUp) {
		selectedTitle = "selectedPickUp"
	} else if (state.resultTypes.dropOff) {
		selectedTitle = "selectedDropOff"
	} else if (state.resultTypes.extraDropOff1) {
		selectedTitle = "selectedExtraDropOff1"
	} else if (state.resultTypes.extraDropOff2) {
		selectedTitle = "selectedExtraDropOff2"
	} else if (state.resultTypes.extraDropOff3) {
		selectedTitle = "selectedExtraDropOff3"
	} else if (state.resultTypes.extraDropOff4) {
		selectedTitle = "selectedExtraDropOff4"
	}

	return update(state, {
		selectedAddress: {
			[selectedTitle]:{
				$set: action.payload
			}
		},
		resultTypes: {
			pickUp: {
				$set: false
			},
			dropOff: {
				$set: false
			},
			extraDropOff1: {
				$set: false
			},
			extraDropOff2: {
				$set: false
			},
			extraDropOff3: {
				$set: false
			},
			extraDropOff4: {
				$set: false
			}
		}
	})
}

function handleGetDistanceMatrix(state, action) {
	return update(state, {
		distanceMatrix: {
			$set: action.payload
		}
	})
}

function handleGetFare(state, action) {
	return update(state, {
		fare: {
			$set: action.payload
		}
	})
}

function handleGetSelectedVehicle(state, action) {
	return update(state, {
		selectedVehicle: {
			$set: action.payload
		}
	})
}

//Handle get nearby drivers
function handleGetNearbyDrivers(state, action){
	return update(state, {
		nearByDrivers:{
			$set:action.payload
		}
	});
}

function handleIsMapReady(state, action) {
	return update(state, {
		isMapReady:{
			$set:action.payload
		}
	});
}

function handleSetLoadingFare(state, action) {
	return update(state, {
		isFareLoading:{
			$set:action.payload
		}
	});
}

function handleResetBooking(state, action) {
	return update(state, {
		inputData:{
			$set: {}
		},
		resultTypes:{
			$set: {}
		},
		selectedAddress:{
			$set: {}
		},
		selectedVehicle:{
			$set: "motorcycle"
		},
		fare: {
			$set: null
		},
		showExtraDropOff1: {
			$set: false
		},
		showExtraDropOff2: {
			$set: false
		},
		showExtraDropOff3: {
			$set: false
		},
		showExtraDropOff4: {
			$set: false
		}
	});
}

function handleShowExtraDropOff(state, action) {
	if(action.payload === 1) {
		return update(state, {
			showExtraDropOff1: {
				$set: true
			},
			selectedAddress: {
				selectedExtraDropOff1: {
					$set: null
				}
			}
		})
	}

	if(action.payload === 2) {
		return update(state, {
			showExtraDropOff2: {
				$set: true
			},
			selectedAddress: {
				selectedExtraDropOff2: {
					$set: null
				}
			}
		})
	}

	if(action.payload === 3) {
		return update(state, {
			showExtraDropOff3: {
				$set: true
			},
			selectedAddress: {
				selectedExtraDropOff3: {
					$set: null
				}
			}
		})
	}

	if(action.payload === 4) {
		return update(state, {
			showExtraDropOff4: {
				$set: true
			},
			selectedAddress: {
				selectedExtraDropOff4: {
					$set: null
				}
			}
		})
	}
}

function handleHideExtraDropOff(state, action) {
	if(action.payload === 1) {
		return update(state, {
			showExtraDropOff1: {
				$set: false
			},

		})
	}

	if(action.payload === 2) {
		return update(state, {
			showExtraDropOff2: {
				$set: false
			}
		})
	}

	if(action.payload === 3) {
		return update(state, {
			showExtraDropOff3: {
				$set: false
			}
		})
	}

	if(action.payload === 4) {
		return update(state, {
			showExtraDropOff4: {
				$set: false
			}
		})
	}
}

const ACTION_HANDLERS = {
	GET_CURRENT_LOCATION: handleGetCurrentLocation,
	GET_INPUT: handleGetInputData,
	TOGGLE_SEARCH_RESULT: handleToggleSearchResult,
	GET_ADDRESS_PREDICTIONS: handleGetAddressPredictions,
	GET_SELECTED_ADDRESS: handleGetSelectedAddress,
	GET_DISTANCE_MATRIX: handleGetDistanceMatrix,
	GET_FARE: handleGetFare,
	GET_SELECTED_VEHICLE: handleGetSelectedVehicle,
	GET_NEARBY_DRIVERS:handleGetNearbyDrivers,
	UPDATE_SEARCH_ADDRESS_LOADING_STATUS:handleUpdateSearchAddressLoadingStatus,
	CLOSE_RESULT_TYPE:handleCloseResultType,
	GET_DIRECTIONS:handleGetDirections,
	IS_MAP_READY: handleIsMapReady,
	RESET_BOOKING: handleResetBooking,
	SHOW_EXTRA_DROP_OFF: handleShowExtraDropOff,
	HIDE_EXTRA_DROP_OFF: handleHideExtraDropOff,
	SET_LOADING_FARE: handleSetLoadingFare
}

const initialState = {
	region: {},
	inputData: {},
	resultTypes: {},
	selectedAddress: {},
	selectedVehicle: "motorcycle",
	isSearchAddressLoading: false,
	isMapReady: false
};

export function HomeReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
