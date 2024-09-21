const { kmeans } = require('ml-kmeans');
const overpassService = require('./overpassService');

// Function to cluster charging stations based on latitude and longitude
function clusterStations(stations, nClusters = 25) {
    const coords = stations.map(station => [station.latitude, station.longitude]);
    const kmeansResult = kmeans(coords, nClusters);

    stations.forEach((station, index) => {
        station.cluster = kmeansResult.clusters[index];  // Assign cluster index
    });

    return {
        clusteredStations: stations,
        clusterCenters: kmeansResult.centroids  // Cluster center coordinates
    };
}


// Function to filter charging stations based on user preferences
async function filterStations(stations, userPrefs) {
    return await Promise.all(stations.map(async station => {
        let matches = true;

        if (userPrefs.ispayatlocation !== undefined) {
            matches &= station.pay_at_location === userPrefs.ispayatlocation;
        }

        if (userPrefs.chargerType) {
            matches &= station.connection_type === userPrefs.chargerType;
        }

        if (userPrefs.power) {
            matches &= station.power_output >= userPrefs.power;
        }

        if (userPrefs.numberofpoints) {
            matches &= station.charging_points >= userPrefs.numberofpoints;
        }

        if (userPrefs.amenities) {
            const amenitiesNearby = await overpassService.getAmenities(station.latitude, station.longitude);
            const foundAmenities = amenitiesNearby.map(a => a.amenity);
            matches &= userPrefs.amenities.every(amenity => foundAmenities.includes(amenity));
        }

        return matches ? station : null;
    })).then(filtered => filtered.filter(station => station !== null));
}

// Function to find the nearest station
function findNearestStation(userLocation, stations, clusterCenters) {
    const [userLat, userLon] = userLocation;

    // Find the nearest cluster
    const distancesToCenters = clusterCenters.map(center => {
        return Math.sqrt((userLat - center[0]) * 2 + (userLon - center[1]) * 2);
    });
    const nearestClusterIdx = distancesToCenters.indexOf(Math.min(...distancesToCenters));

    // Filter stations that are part of the nearest cluster
    const stationsInCluster = stations.filter(station => station.cluster === nearestClusterIdx);

    // Find the nearest station within the cluster
    const nearestStation = stationsInCluster.reduce((nearest, station) => {
        const distance = Math.sqrt((userLat - station.latitude) * 2 + (userLon - station.longitude) * 2);
        return distance < nearest.distance ? { station, distance } : nearest;
    }, { station: null, distance: Infinity });

    return nearestStation.station;
}

module.exports = {
    filterStations,
    clusterStations,
    findNearestStation
};