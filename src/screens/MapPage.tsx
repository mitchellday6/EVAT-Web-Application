import GetLocation from 'react-native-get-location';
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Alert,
  Dimensions,
  ActivityIndicator
} from 'react-native';

import MapView, { Region } from 'react-native-maps';
import ChargerMarker from '../components/ChargerInfo';
import NavBar from '../components/Navbar';
import SearchModal from '../components/SearchModal';

const url = `https://evat.vt2.app/api/navigation/getchargers`;

const MapPage = () => {
  const [region, setRegion] = useState<Region | null>(null);
  const [chargers, setChargers] = useState<any[]>([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

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
    setLoading(true);
    try {
      const response = await fetch(`${url}?lat=${location.latitude}&lon=${location.longitude}&distance=${distance}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      if (Array.isArray(data.data)) {
        console.log("Chargers fetched:", data.data.length);
        setChargers(data.data);
      } else {
        console.warn("Invalid charger data:", data);
        setChargers([]);
      }
    } catch (error) {
      console.log("Error with getChargers:", error);
      Alert.alert("Error", "Failed to fetch chargers.");
      setChargers([]);
    } finally {
      setLoading(false);
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
      Alert.alert("Location Error", "Unable to get current location.");
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
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2e9963" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={true}
      >
        {Array.isArray(chargers) &&
          chargers.map((charger, index) => (
            <ChargerMarker key={charger.id || `charger-${index}`} charger={charger} />
        ))}
      </MapView>

      <NavBar
        searchFunction={() => setSearchVisible(true)}
        settingsFunction={() => Alert.alert("Settings clicked")}
      />

      <SearchModal
        visible={searchVisible}
        onClose={() => setSearchVisible(false)}
        onResults={(results: any[]) => setChargers(results ?? [])}
      />

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="green" />
        </View>
      )}
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingOverlay: {
    position: 'absolute',
    top: '50%',
    left: '45%',
    transform: [{ translateX: -25 }],
    zIndex: 10,
  },
});

export default MapPage;
