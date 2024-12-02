import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Booking1 = () => {
  const [doctorName, setDoctorName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [date, setDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const handleSearch = async () => {
    if (!doctorName && !specialty && !date) {
      Alert.alert('Validation', 'Please fill at least one field to search.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('https://your-api.com/api/search-doctors', {
        doctorName,
        specialty,
        date,
      });

      setIsLoading(false);

      // Navigate to the results page with the API response
      navigation.navigate('BookingResults', { doctors: response.data });
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', 'Unable to fetch doctor data. Please try again.');
      console.error('Search error:', error);
    }
  };

  const handleClear = () => {
    setDoctorName('');
    setSpecialty('');
    setDate('');
  };

  const handleAskCuraClick = () => {
    navigation.navigate('CuraHome'); // Navigate to Cura chatbot
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Book a New Doctor’s Appointment</Text>
      <TextInput
        style={styles.input}
        placeholder="Doctor Name"
        value={doctorName}
        onChangeText={setDoctorName}
      />
      <TextInput
        style={styles.input}
        placeholder="Specialty"
        value={specialty}
        onChangeText={setSpecialty}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />

      <View style={styles.buttonContainerRow}>
        <TouchableOpacity style={styles.buttonSearch} onPress={handleSearch} disabled={isLoading}>
          <Text style={styles.buttonTextSearch}>
            {isLoading ? 'Searching...' : 'Search Doctors'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonClear} onPress={handleClear}>
          <Text style={styles.buttonTextClear}>Clear</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.space} />

      <View style={styles.infoImageContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.mainTopic}>Can’t find the suitable doctor for your symptoms?</Text>
          <Text style={styles.subTopic}>
            Cura is an AI Powered chatbot that can help you find your doctor and book a doctor's appointment.
          </Text>
        </View>

        <View style={styles.imageContainer}>
          <Image source={require('../../../components/images/curamain.png')} style={styles.heroImage} />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonAskCura} onPress={handleAskCuraClick}>
          <Text style={styles.buttonTextAskCura}>Ask Cura</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4a4e69",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#c9c9c9",
    padding: 12,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  buttonContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonSearch: {
    backgroundColor: '#855CDD',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  buttonTextSearch: {
    color: '#fff',
    fontSize: 16,
  },
  buttonClear: {
    backgroundColor: '#fff',
    borderColor: '#855CDD',
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
  },
  buttonTextClear: {
    color: '#855CDD',
    fontSize: 16,
  },
  infoImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoContainer: {
    flex: 1,
    marginRight: 10,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  heroImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  space: {
    height: 30,
  },
  buttonContainer: {
    width: 150,
    alignSelf: 'flex-start',
  },
  mainTopic: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
  },
  subTopic: {
    fontSize: 12,
    color: '#555',
  },
  buttonAskCura: {
    backgroundColor: '#855CDD',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonTextAskCura: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Booking1;
