// declare const navigator: any;
import GetLocation from 'react-native-get-location'
import React, { useEffect, useState, useContext, useLayoutEffect } from 'react';
import { UserContext } from '../context/user.context';
import { useNavigation } from '@react-navigation/native'
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
import SearchModal from '../components/SearchModal';

const config = ConfigData();

//testing
const url = `https://evat.vt2.app/api/navigation/getchargersnode`;
config.backend.ipAddress = "http://localhost";
config.backend.port = 8080;
const url2 = `${config.backend.ipAddress}:${config.backend.port}/api/altChargers/nearby`
console.log(url2);

const MapPage = () => {
  const [region, setRegion] = useState<Region | null>(null);
  const [error, setError] = useState<boolean | null>(null);
  const [chargers, setChargers] = useState<Object | null>(null);
  const [searchWindow, setSearchWindow] = useState<Boolean | false>(false);
  const { user, setUser } = useContext(UserContext);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text style={{ color: 'white', marginRight: 15 }} onPress={() => Alert.alert("User Information", `User: ${user?.fullName}\nEmail: ${user?.email}\nRole: ${user?.role}`)}>
          {user.fullName}
        </Text>
      ),
    });
  }, [navigation]);


  const searchFunction = () => {
    console.log('Search Function Called');
    setSearchWindow(true);
  }

  const settingsFunction = () => {
    console.log('Settings Function Called');
  }

  // Alert.alert(`Welcome ${user?.fullName}`, `Click on any Charger icon to get see its details.`, [{text: 'Ok',}]);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await locateUser();
      }
    } else {
      //handle position granted
    }
  };

  const getChargers = async (location: any, distance: number) => {
    try {
      const response = await fetch(`${url}?lat=${location.latitude}&lon=${location.longitude}&distance=${distance}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
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

  //Sends request to backend to get chargers
  const searchChargers = async (data) => {
    console.log("Search Data", data);
    try {
      const params = new URLSearchParams();
      if (data.name) params.append('name', data.name);
      if (data.latitude) params.append('lat', data.latitude);
      if (data.longitude) params.append('lon', data.longitude);
      if (data.distance) params.append('distance', data.distance);
      if (data.connector) params.append('connectorType', data.connector);
      if (data.current) params.append('current', data.current);
      if (data.operator) params.append('operator', data.operator);

      console.log("Search Params", params.toString());

      const response = await fetch(url2, {
        method: 'POST',
        body: JSON.stringify({...data}),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token.accessToken}`
        }
      });

      const result = await response.json();
      console.log("Search Result", result);
      if (response.ok) {
        setChargers(result.data);
        setSearchWindow(false);
      } else {
        console.log(response)
        console.log("Response not ok");
      }
    } catch (error) {
      console.log("Error with search chargers", error);
    }
  }

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
      <SearchModal dataIn={region} onResults={searchChargers} visible={searchWindow} onClose={() => setSearchWindow(false)} />
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={true}
      >
        {region && chargers && chargers.map((charger, i) => (
          <ChargerMarker key={`${i}`} charger={charger} />
        ))}
      </MapView>
      <NavBar searchFunction={searchFunction} settingsFunction={settingsFunction} />
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
});

export default MapPage;
