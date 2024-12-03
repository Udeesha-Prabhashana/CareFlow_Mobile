import React from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

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
    photo: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4MRNQQfqm_G3F-AQ17YCJiTqnd-fCHKrsO_vqDM7KjwPAvM2IOs5ctb7k77wAhW11gmE&usqp=CAU",
    ],
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
  {
    _id: "3",
    name: "Dr. Nimal Jayasinghe",
    address: "789 Ocean Ave, Colombo",
    city: "Colombo",
    photo: [
      "https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg",
    ],
    title: "Pediatric Specialist",
    desc: "Dr. Nimal Jayasinghe is a dedicated pediatrician with a passion for children's health and development. He provides expert care in a friendly and welcoming environment.",
    featured: true,
  },
  {
    _id: "4",
    name: "Dr. Malini Fernando",
    address: "321 Garden St, Kandy",
    city: "Kandy",
    photo: [
      "https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg",
    ],
    title: "Leading Dermatologist",
    desc: "Dr. Malini Fernando offers comprehensive dermatological care, including treatment for skin conditions and cosmetic procedures. She is known for her precision and patient care.",
    featured: false,
  },
  {
    _id: "5",
    name: "Dr. Sanjay Perera",
    address: "654 City St, Galle",
    city: "Galle",
    photo: [
      "https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg",
    ],
    title: "Orthopedic Surgeon",
    desc: "Dr. Sanjay Perera is an experienced orthopedic surgeon specializing in joint replacements and sports injuries. He is committed to providing personalized and effective treatment.",
    featured: true,
  },
];

const Booking1: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Find the Doctor that best matches your requirements</Text>

      {/* List of doctors */}
      <FlatList
        data={dummyData}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Booking3", { doctor: item })}
          >
            <View style={styles.doctorCard}>
              <Image source={{ uri: item.photo[0] }} style={styles.image} />
              <View style={styles.infoContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc}>{item.desc}</Text>
                <Text style={styles.address}>
                  {item.address}, {item.city}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  subtitle: {
    fontSize: 16,
    color: "#22223b",
    marginBottom: 16,
  },
  doctorCard: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
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
