const calculateFare = (baseFare, timeRate, time,  distanceRate, distance, surge, vehicle)=>{
	const distanceInKm = distance * 0.001;
	const timeInMin = time * 0.0166667;
	const pricePerKm = timeRate * timeInMin;
	const pricePerMinute = distanceRate * distanceInKm;
	let totalFare = (baseFare + pricePerKm + pricePerMinute) * surge;
	
	if (vehicle == 'motorcycle') {
		totalFare = totalFare + 10;
	} else if (vehicle == 'van') {
		totalFare = totalFare + 20;
	} else if (vehicle == 'l300') {
		totalFare = totalFare + 30;
	}

	return Math.round(totalFare);
};

export default calculateFare;