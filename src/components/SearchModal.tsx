import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const apiUrl = 'https://evat.vt2.app/api/navigation/getchargers';

type SearchModalProps = {
  visible: boolean;
  onClose: () => void;
  onResults: (results: any[]) => void;
};

const SearchModal: React.FC<SearchModalProps> = ({ visible, onClose, onResults }) => {
  const [name, setName] = React.useState('');
  const [location, setLocation] = React.useState('');
  const [distance, setDistance] = React.useState('');
  const [connector, setConnector] = React.useState('');
  const [current, setCurrent] = React.useState('');
  const [operator, setOperator] = React.useState('');

  const handleSearch = async () => {
    try {
      const params = new URLSearchParams();
      if (name) params.append('name', name);
      if (location) params.append('location', location);
      if (distance) params.append('distance', Number(distance).toString());
      if (connector) params.append('connectorType', connector);
      if (current) params.append('current', current);
      if (operator) params.append('operator', operator);

      const response = await fetch(`${apiUrl}?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log("Search API response:", data);

      if (response.ok) {
        if (!data.data || !Array.isArray(data.data)) {
          Alert.alert("No results found");
          onResults([]);
        } else {
          onResults(data.data);
        }
      } else {
        Alert.alert("Search failed", data.message || "Unexpected error");
        onResults([]);
      }
    } catch (err) {
      console.error('Search request failed:', err);
      Alert.alert("Network error", "Could not fetch chargers.");
      onResults([]);
    } finally {
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Search Chargers</Text>

        <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Location" value={location} onChangeText={setLocation} />
        <TextInput style={styles.input} placeholder="Distance (km)" value={distance} onChangeText={setDistance} keyboardType="numeric" />

        <Picker selectedValue={connector} onValueChange={setConnector} style={pickerSelectStyles.inputAndroid}>
          <Picker.Item label="Select Connector" value="" />
          <Picker.Item label="Type 1" value="type1" />
          <Picker.Item label="Type 2" value="type2" />
        </Picker>

        <Picker selectedValue={current} onValueChange={setCurrent} style={pickerSelectStyles.inputAndroid}>
          <Picker.Item label="Select Current" value="" />
          <Picker.Item label="AC" value="ac" />
          <Picker.Item label="DC" value="dc" />
        </Picker>

        <TextInput style={styles.input} placeholder="Operator" value={operator} onChangeText={setOperator} />

        <View style={styles.buttonContainer}>
          <Button title="Search" onPress={handleSearch} color="lightgreen" />
          <Button title="Cancel" onPress={onClose} color="lightgreen" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    marginTop: '25%',
    marginHorizontal: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    padding: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    paddingHorizontal: 8,
  },
});

export default SearchModal;
