import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Booking1 = () => {
  const [doctorName, setDoctorName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [date, setDate] = useState('');

  const navigation = useNavigation();

  const handleSearch = () => {
    console.log("Searching doctors...");
    navigation.navigate('Booking2');
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
        placeholder="Date"
        value={date}
        onChangeText={setDate}
      />

      <View style={styles.buttonContainerRow}>
        <TouchableOpacity style={styles.buttonSearch} onPress={handleSearch}>
          <Text style={styles.buttonTextSearch}>Search Doctors</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonClear} onPress={handleClear}>
          <Text style={styles.buttonTextClear}>Clear</Text>
        </TouchableOpacity>
      </View>

      {/* Add the new section here */}
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
    height: 30, // Adds space between elements
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
    backgroundColor: '#855CDD', // Same color as Search Doctors button
    paddingVertical: 8,         // Reduced padding for height
    paddingHorizontal: 12,      // Reduced padding for width
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonTextAskCura: {
    color: '#fff', // Same text color as Search Doctors button
    fontSize: 16,
  },
});

export default Booking1;
