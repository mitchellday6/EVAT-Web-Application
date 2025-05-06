import React, { useEffect } from 'react';
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
    latitude?: number;
    longitude?: number;
    radius?: number;
    connector?: string;
    current?: string;
    operator?: string;
  }
};

const SearchModal: React.FC<SearchModalProps> = ({ visible, onClose, onResults, dataIn }) => {
  const [name, setName] = React.useState(dataIn?.name);
  const [latitude, setLatitude] = React.useState(dataIn?.latitude);
  const [longitude, setLongitude] = React.useState(dataIn?.longitude);
  const [radius, setRadius] = React.useState(dataIn?.radius);
  const [connector, setConnector] = React.useState(dataIn?.connector);
  const [current, setCurrent] = React.useState(dataIn?.current);
  const [operator, setOperator] = React.useState(dataIn?.operator);
  // setLatitude(position?.latitude);
  // setLongitude(position?.longitude);

  useEffect(() => {
    
  })

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

    onResults({
      latitude,
      longitude,
      radius,
      connector,
      current,
      operator });
  };

  return (
    <Modal key={18} visible={visible} transparent animationType="slide">
      <View key={16} style={styles.modalContainer}>
        <Text key={1} style={styles.title}>Search Chargers</Text>
        <Text key={20} style={styles.inputTitle}>Name:</Text>
        <TextInput key={2} keyboardType="numeric" style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
        
        <Text key={21} style={styles.inputTitle}>Latitude:</Text>
        <TextInput key={3} keyboardType="numeric" style={styles.input} placeholder="Latitude" value={latitude} onChangeText={setLatitude} />
        <Text key={22} style={styles.inputTitle}>Longitude:</Text>
        <TextInput key={19} keyboardType="numeric" style={styles.input} placeholder="Longitude" value={longitude} onChangeText={setLongitude} />
        <Text key={23} style={styles.inputTitle}>Radius:</Text>
        <TextInput key={4} keyboardType="numeric" style={styles.input} placeholder="Radius (km)" value={radius} onChangeText={setRadius} keyboardType="numeric" />

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
        <Text key={24} style={styles.inputTitle}>Operator:</Text>
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
    color: 'black',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  inputTitle: {
    fontSize: 16,
    textAlign: 'left',
    color: 'black',
    width: '25%',
    flexDirection: 'row'
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    padding: 8,
    color: 'black',
    // width: '55%',
    flexDirection: 'row',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    color: 'black',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    paddingHorizontal: 8,
    color: 'black'
  },
});

export default SearchModal;
