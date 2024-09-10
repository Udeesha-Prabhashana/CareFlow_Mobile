import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";

interface Doctor {
  _id: string;
  name: string;
  address: string;
  city: string;
  photo: string[];
  title: string;
  desc: string;
  featured: boolean;
}

const dummyData: Doctor[] = [
  {
    _id: "1",
    name: "Dr. Ajith Kumara",
    address: "123 Sunshine St, Kottawa",
    city: "Kottawa",
    photo: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4MRNQQfqm_G3F-AQ17YCJiTqnd-fCHKrsO_vqDM7KjwPAvM2IOs5ctb7k77wAhW11gmE&usqp=CAU"],
    title: "Expert General Practitioner",
    desc: "Dr. Ajith Perera has over 20 years of experience in general medicine. He is known for his compassionate care and comprehensive approach to patient health.",
    featured: true,
  },
  {
    _id: "2",
    name: "Dr. Sampath Samarasinghe",
    address: "456 Mountain Rd, Colombo",
    city: "Colombo",
    photo: [
      "https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg",
    ],
    title: "Renowned Cardiologist",
    desc: "Dr. Sampath Samarasinghe specializes in cardiology with a focus on preventive care and advanced treatments.",
    featured: false,
  },
  // ... more data
];

const Booking1: React.FC = () => {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const handleSearch = () => {
    console.log("Search clicked");
    // Add functionality to re-fetch or filter doctors
  };

  return (
    <View style={styles.container}>
      {/* }<Text style={styles.title}>Doctors</Text>*/}
      <Text style={styles.subtitle}>Find the Doctor that best matches with patients' requirements</Text>

      {/* Search fields */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Doctor Name"
          value={destination}
          onChangeText={setDestination}
        />
        <TextInput
          style={styles.input}
          placeholder="Select Specialty"
          value={destination}
          onChangeText={setDestination}
        />
        <TextInput
          style={styles.input}
          value={date}
          onChangeText={setDate}
          placeholder="Select Date"
        />
        <Button title="Apply Filters" onPress={handleSearch} color="#855CDD" />
      </View>

      {/* List of doctors */}
      <FlatList
        data={dummyData}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.doctorCard}>
            <Image source={{ uri: item.photo[0] }} style={styles.image} />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc}>{item.desc}</Text>
              <Text style={styles.address}>{item.address}, {item.city}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, // Increased padding for better spacing
    backgroundColor: "#fff", // Lighter background to match the screenshot's aesthetic
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: 'black',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#22223b", // Dark color for text
    marginBottom: 16,
  },
  searchContainer: {
    marginBottom: 16,
    backgroundColor: "#ffffff", // White background for the search area
    borderRadius: 8,
    padding: 10, // Padding inside the search container
    shadowColor: "#000", // Adding shadow for elevation effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#c9c9c9", // Lighter border color
    padding: 12,
    marginTop: 10,
    marginBottom: 10, // Adjust margin for better spacing
    borderRadius: 8,
    fontSize: 16, // Larger font size for better readability
    backgroundColor: "#fff", // White background for inputs
  },
  doctorCard: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#ffffff", // White background for cards
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000", // Shadow for cards
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    marginBottom: 4,
  },
  desc: {
    fontSize: 12,
    marginBottom: 4,
  },
  address: {
    fontSize: 12,
    color: "#888",
  },
});


export default Booking1;
