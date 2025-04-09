// declare const navigator: any;
import GetLocation from 'react-native-get-location'
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/user.context';
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

import MapView, { Region } from 'react-native-maps';
import ChargerMarker from '../components/ChargerInfo';
import { ConfigData } from '../data/config';
import NavBar from '../components/Navbar';

const config = ConfigData();
const url = `https://evat.vt2.app/api/navigation/getchargersnode`

type GeolocationPosition = {
  coords: {
    latitude: number;
    longitude: number;
    accuracy: number;
    altitude?: number | null;
    altitudeAccuracy?: number | null;
    heading?: number | null;
    speed?: number | null;
  };
  timestamp: number;
};

type GeolocationPositionError = {
  code: number;
  message: string;
};




const MapPage = () => {
  const [region, setRegion] = useState<Region | null>(null);
  const [error, setError] = useState<boolean | null>(null);
  const [chargers, setChargers] = useState<Object | null>(null);
  const { user, setUser } = useContext(UserContext);

  // Alert.alert(`Welcome ${user?.fullName}`, `Click on any Charger icon to get see its details.`, [{text: 'Ok',}]);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await locateUser();
      }
    } else {
      //handle position granted
    }
  };

  const getChargers = async (location: {}, distance: number) => {
    try {
      const response = await fetch(`${url}?lat=${location.latitude}&lon=${location.longitude}&distance=10000`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      if (response.ok) {
        // Handle successful get of chargers
        setChargers(data.data);
        //populate map with icons

      } else {
        // Handle get chargers error
        console.log("Response not ok")
      }
    } catch (error) {
      console.log("Error with get chargers")
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

  useEffect(() => { requestLocationPermission() }, []);

  useEffect(() => {
    if (region) {
      console.log(region)
      getChargers(region, 30000);
    }
  }, [region]);

  if (!region) {
    console.log("Region Null")
    return null;
  }


  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={true}>
        {region && chargers && chargers.map((charger, idx) => <ChargerMarker key={`${idx}`} charger={charger} />)}
      </MapView>
      <NavBar />
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
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
  navbar: {
    width: Dimensions.get('window').width,
    height: 40,
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 0,
  },
  // chargerButton: {
  //   width: 100,
  //   height: 50,
  //   borderRadius: 5,
  //   backgroundColor: 'red',
  // },
});

export default MapPage;
