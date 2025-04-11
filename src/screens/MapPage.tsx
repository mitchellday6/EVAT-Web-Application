// declare const navigator: any;
import GetLocation from 'react-native-get-location';
import React, { useEffect, useState } from 'react';
import FakeChargers from '../data/test_amenitites_local.json';
import {
  Text,
  View,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Modal,
  Alert,
  Dimensions,
  Image,
  Button
} from 'react-native';

import MapView, { Marker, Region } from 'react-native-maps';
import ChargerMarker from '../components/ChargerInfo';
import { ConfigData } from '../data/config';
import NavBar from '../components/Navbar';
import SearchModal from '../components/SearchModal';

const config = ConfigData();
const url = `https://evat.vt2.app/api/navigation/getchargersnode`;

const MapPage = () => {
  const [region, setRegion] = useState<Region | null>(null);
  const [chargers, setChargers] = useState<any[]>([]);
  const [searchVisible, setSearchVisible] = useState(false);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await locateUser();
      }
    } else {
      await locateUser();
    }
  };

  const getChargers = async (location: any, distance: number) => {
    try {
      const response = await fetch(`${url}?lat=${location.latitude}&lon=${location.longitude}&distance=${distance}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      if (response.ok) {
        setChargers(data.data);
      } else {
        console.log("Response not ok");
      }
    } catch (error) {
      console.log("Error with get chargers", error);
    }
  };

  const locateUser = async () => {
    try {
      const location = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      });

      const { latitude, longitude } = location;

      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } catch (error) {
      console.log("Error locating user:", error);
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (region) {
      getChargers(region, 30000);
    }
  }, [region]);

  if (!region) {
    console.log("Region Null");
    return null;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={true}
      >
        {region && chargers && chargers.map(charger => (
          <ChargerMarker key={`${charger.id}`} charger={charger} />
        ))}
      </MapView>

      <NavBar
        searchFunction={() => setSearchVisible(true)}
        settingsFunction={() => Alert.alert("Settings clicked")}
      />

      <SearchModal
        visible={searchVisible}
        onClose={() => setSearchVisible(false)}
        onResults={(results: any[]) => setChargers(results)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  marker: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

export default MapPage;
