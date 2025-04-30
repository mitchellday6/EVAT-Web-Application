import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';

const apiUrl = 'https://evat.vt2.app/api/navigation/getchargersnode';

type SearchModalProps = {
  visible: boolean;
  onClose: () => void;
  onResults: (results: any[]) => void;
  dataIn: {
    name?: string;
    latitude?: string;
    longitude?: string;
    distance?: string;
    connector?: string;
    current?: string;
    operator?: string;
  }
};

const SearchModal: React.FC<SearchModalProps> = ({ visible, onClose, onResults, dataIn }) => {
  const [name, setName] = React.useState(dataIn?.name);
  const [latitude, setLatitude] = React.useState(dataIn?.latitude);
  const [longitude, setLongitude] = React.useState(dataIn?.longitude);
  const [distance, setDistance] = React.useState(dataIn?.distance);
  const [connector, setConnector] = React.useState(dataIn?.connector);
  const [current, setCurrent] = React.useState(dataIn?.current);
  const [operator, setOperator] = React.useState(dataIn?.operator);
  // setLatitude(position?.latitude);
  // setLongitude(position?.longitude);

  const handleSearch = async () => {
    //   try {
    //     const params = new URLSearchParams();
    //     if (name) params.append('name', name);
    //     if (longitude) params.append('lon', longitude);
    //     if (latitude) params.append('lat', longitude);
    //     if (distance) params.append('distance', distance);
    //     if (connector) params.append('connectorType', connector);
    //     if (current) params.append('current', current);
    //     if (operator) params.append('operator', operator);

    //     const response = await fetch(`${apiUrl}?${params.toString()}`, {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //     }});

    //     const data = await response.json();
    //     if (response.ok) {
    //       onResults(data.data);
    //     } else {
    //       console.error('Search API error:', data);
    //       onResults([]);
    //     }
    //   } catch (err) {
    //     console.error('Search request failed:', err);
    //     onResults([]);
    //   } finally {
    //     onClose();
    //   }

    onResults({ latitude, longitude, distance, connector, current, operator });
  };

  return (
    <Modal key={18} visible={visible} transparent animationType="slide">
      <View key={16} style={styles.modalContainer}>
        <Text key={1} style={styles.title}>Search Chargers</Text>

        <TextInput key={2} style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
        <TextInput key={3} style={styles.input} placeholder="Latitude" value={latitude} onChangeText={setLatitude} />
        <TextInput key={19} style={styles.input} placeholder="Longitude" value={longitude} onChangeText={setLongitude} />
        <TextInput key={4} style={styles.input} placeholder="Distance (km)" value={distance} onChangeText={setDistance} keyboardType="numeric" />

        <Picker key={5} selectedValue={connector} onValueChange={setConnector} style={pickerSelectStyles.inputAndroid}>
          <Picker.Item key={6} label="Select Connector" value="" />
          <Picker.Item key={7} label="Type 1" value="type1" />
          <Picker.Item key={8} label="Type 2" value="type2" />
        </Picker>

        <Picker key={9} selectedValue={current} onValueChange={setCurrent} style={pickerSelectStyles.inputAndroid}>
          <Picker.Item key={10} label="Select Current" value="" />
          <Picker.Item key={11} label="AC" value="ac" />
          <Picker.Item key={12} label="DC" value="dc" />
        </Picker>

        <TextInput key={13} style={styles.input} placeholder="Operator" value={operator} onChangeText={setOperator} />

        <View key={17} style={styles.buttonContainer}>
          <Button key={14} title="Search" onPress={handleSearch} color="lightgreen" />
          <Button key={15} title="Cancel" onPress={onClose} color="lightgreen" />
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
