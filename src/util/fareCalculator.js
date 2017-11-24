// Cost for deliveries:

// a. Van only P 450.00 @ 1st km
// b. Van with helper P 690.00 @ 1st km
// c. Truck P2,700.00 @ 1st km

// Additional P 18.00/km & P 2.0/min

// const calculateFare = (baseFare, timeRate, time,  distanceRate, distance, surge, vehicle)=>{
	// const distanceInKm = distance * 0.001;
	// const timeInMin = time * 0.0166667;
	// const pricePerKm = timeRate * timeInMin;
	// const pricePerMinute = distanceRate * distanceInKm;
	// let totalFare = (baseFare + pricePerKm + pricePerMinute) * surge;
	
	// if (vehicle == 'motorcycle') {
	// 	totalFare = totalFare + 10;
	// } else if (vehicle == 'van') {
	// 	totalFare = totalFare + 20;
	// } else if (vehicle == 'l300') {
	// 	totalFare = totalFare + 30;
	// }

const calculateFare = (time,  distance, vehicle)=>{
	const distanceInKm = distance * 0.001;
	const timeInMin = time * 0.0166667;
	const pricePerExceededKm = 18;
	const pricePerExceededMinute = 2;

	let baseFare = 0;
	let totalPricePerExceededKm = 0;
	let totalPricePerExceededMinute = 0;

	if (vehicle == 'van') {
		baseFare = 450;
	} else if (vehicle == 'van-helper') {
		baseFare = 690;
	} else if (vehicle == 'truck') {
		baseFare = 2700;
	}

	if (distanceInKm > 1) {	
		let exceededKm = distanceInKm - 1;

		totalPricePerExceededKm = exceededKm * pricePerExceededKm;
		totalPricePerExceededMinute = timeInMin * pricePerExceededMinute;
	} 

	let totalFare = baseFare + totalPricePerExceededKm + totalPricePerExceededMinute;

	// console.log ("Base Fare: " + baseFare + " Exceed: " + totalPricePerExceededKm + " Minute: " + totalPricePerExceededMinute);

	return Math.round(totalFare);
};

export default calculateFare;