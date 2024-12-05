"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function calculateGeographicalRelevance(data, userData) {
    if (!data.length)
        return [];
    if (!userData.latitude || !userData.longitude)
        return "Invalid latitude or longitude values";
    //calculate the distance 
    data.map(geolocation => {
        //mxDistance can be 1000-2000 for small area like with in the country or near by countries
        //but data we are dealing with here has different continents as well
        //10000 is reasonable for this case
        const maxDistance = 10000;
        const confidence = calculateConfidenceScore(userData.latitude, userData.longitude, geolocation.latitude, geolocation.longitude, maxDistance);
        const score = confidence.toFixed(2);
        geolocation["score"] = score;
        //console.log("score3 is", score)
    });
    //sort the data based on the score and donot show the results with score=0.00
    let result = data.sort(compare).filter((loc) => loc["score"] > 0.00);
    return result;
}
//function to calculate distance using haversine formula
function getDistance(userLat, userLon, geoLat, geoLon) {
    const avgEarthRad = 6371; //in km
    function toRad(deg) {
        return deg * Math.PI / 180;
    }
    //convert lat, lon to radian
    const userLatR = toRad(userLat);
    const userLonR = toRad(userLon);
    const geoLatR = toRad(geoLat);
    const geoLonR = toRad(geoLon);
    //difference between two lat and lon values
    const diffLat = geoLatR - userLatR;
    const diffLon = geoLonR - userLonR;
    const a = Math.sin(diffLat / 2) * Math.sin(diffLat / 2)
        + Math.cos(userLatR) * Math.cos(geoLatR)
            * Math.sin(diffLon / 2) * Math.sin(diffLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const dis = avgEarthRad * c;
    return dis;
}
//calculate confidence score
function calculateConfidenceScore(lat1, lon1, lat2, lon2, maxDistance) {
    const distance = getDistance(lat1, lon1, lat2, lon2);
    //confidence score is inversely proportional to the distance
    let confidence = 1 - (distance / maxDistance);
    //console.log("Distance in kms is ",distance, confidence)
    return Math.max(0, confidence); //confidence should be in the range [0,1]
}
//sort the results of score desc order
function compare(a, b) {
    if (a.score < b.score) {
        return 1;
    }
    if (a.score > b.score) {
        return -1;
    }
    return 0;
}
//calculateGeographicalRelevance();
exports.default = calculateGeographicalRelevance;
