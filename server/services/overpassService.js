const axios = require('axios');

// Query Overpass API for amenities around a GPS location
async function getAmenities(lat, lon, radius = 100) {
    const query = `
    [out:json];
    (
      node["amenity"](around:${radius},${lat},${lon});
      way["amenity"](around:${radius},${lat},${lon});
      relation["amenity"](around:${radius},${lat},${lon});
    );
    out center;`;

    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
    
    try {
        const response = await axios.get(url);
        return response.data.elements.map(el => ({
            id: el.id,
            amenity: el.tags.amenity,
            lat: el.lat || el.center.lat,
            lon: el.lon || el.center.lon
        }));
    } catch (error) {
        console.error('Error fetching amenities:', error);
        return [];
    }
}

module.exports = {
    getAmenities
};