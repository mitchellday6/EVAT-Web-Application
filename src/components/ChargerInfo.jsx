import React from 'react';
import { StyleSheet, View, Image, Alert, Text } from 'react-native';
import { Marker, Callout } from 'react-native-maps';

function ChargerMarker(props) {
  const { charger } = props;

  const title = charger.title?.toString() || charger.name?.toString() || charger.brand?.toString() || "Charger";

  const location = {
    latitude: charger.geometry?.location?.lat ?? charger.lat ?? 0,
    longitude: charger.geometry?.location?.lng ?? charger.lon ?? 0
  };

  const description = charger?.description ?? charger.vicinity ?? 'EV Charger';

  const rating = charger.rating ?? "No rating";

  const createRatingStars = () => {
    if (rating === "No rating" || rating === 0) return "☆☆☆☆☆";
    if (rating >= 5) return "★★★★★";
    const floor = Math.floor(rating);
    const half = rating - floor > 0.5 ? 1 : 0;
    return "★".repeat(floor + half) + "☆".repeat(5 - (floor + half));
  };

  const createChargerAlert = () => {
    const info = `Charger Name: ${charger.name}\nCharger Vicinity: ${charger.vicinity}\nCharger Type: ${charger.type}\nCharger Status: ${charger.status}\nRating: ${createRatingStars()} (${charger.rating ?? "N/A"})`;

    Alert.alert(title, info, [
      { text: 'Go To Charger', onPress: () => console.log('Go') },
      { text: 'Exit', style: 'cancel' }
    ]);
  };

  return (
    <Marker coordinate={location}>
      <Image source={require('../data/ev_charger_symbol.webp')} style={styles.marker} />
      <Callout onPress={createChargerAlert}>
        <Text>{title + "\n" + createRatingStars()}</Text>
      </Callout>
    </Marker>
  );
}

export default ChargerMarker;

const styles = StyleSheet.create({
  marker: {
    width: 40,
    height: 40,
    resizeMode: 'contain'
  }
});
