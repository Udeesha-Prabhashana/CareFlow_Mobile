import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

const Booking3 = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { doctor } = route.params;

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const availableDates = [
    {
      date: "2024-12-05",
      timeSlots: [
        { time: "10:00 AM", arrivalTime: "09:30 AM" },
        { time: "11:30 AM", arrivalTime: "11:00 AM" },
        { time: "02:00 PM", arrivalTime: "01:30 PM" },
      ],
    },
    {
      date: "2024-12-06",
      timeSlots: [
        { time: "09:00 AM", arrivalTime: "08:30 AM" },
        { time: "12:00 PM", arrivalTime: "11:30 AM" },
        { time: "03:00 PM", arrivalTime: "02:30 PM" },
      ],
    },
    {
      date: "2024-12-07",
      timeSlots: [
        { time: "11:00 AM", arrivalTime: "10:30 AM" },
        { time: "01:00 PM", arrivalTime: "12:30 PM" },
        { time: "04:00 PM", arrivalTime: "03:30 PM" },
      ],
    },
  ];

  const getAvailableTimeSlots = () => {
    const dateInfo = availableDates.find((d) => d.date === selectedDate);
    return dateInfo ? dateInfo.timeSlots : [];
  };

  const handleBookDoctor = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time.");
      return;
    }

    navigation.navigate("Booking4", {
      doctor,
      selectedDate,
      selectedTime,
    });
  };


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Confirm Your Appointment</Text>

      <View style={styles.doctorDetails}>
        <Text style={styles.doctorName}>{doctor.name}</Text>
        <Text style={styles.doctorSpecialty}>{doctor.title}</Text>
        <Text style={styles.doctorDescription}>{doctor.desc}</Text>
      </View>

      <Text style={styles.label}>Select a Date</Text>
      <FlatList
        data={availableDates}
        horizontal
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.dateButton,
              item.date === selectedDate && styles.selectedButton,
            ]}
            onPress={() => {
              setSelectedDate(item.date);
              setSelectedTime(""); // Reset time if a new date is selected
            }}
          >
            <Text
              style={
                item.date === selectedDate ? styles.selectedText : styles.buttonText
              }
            >
              {item.date}
            </Text>
          </TouchableOpacity>
        )}
      />

      {selectedDate ? (
        <>
          <Text style={styles.label}>Available Time Slots</Text>
          <FlatList
            data={getAvailableTimeSlots()}
            horizontal
            keyExtractor={(item) => item.time}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.timeButton,
                  item.time === selectedTime && styles.selectedButton,
                ]}
                onPress={() => setSelectedTime(item.time)}
              >
                <Text
                  style={
                    item.time === selectedTime
                      ? styles.selectedText
                      : styles.buttonText
                  }
                >
                  {item.time}
                </Text>
                <Text style={styles.arrivalText}>
                  Arrival: {item.arrivalTime}
                </Text>
              </TouchableOpacity>
            )}
          />
        </>
      ) : (
        <Text style={styles.placeholder}>Please select a date first</Text>
      )}

      <TouchableOpacity style={styles.bookButton} onPress={handleBookDoctor}>
        <Text style={styles.bookButtonText}>Book Doctor</Text>
      </TouchableOpacity>
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
    marginBottom: 20,
    color: "#4a4e69",
  },
  doctorDetails: {
    marginBottom: 20,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  doctorSpecialty: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  doctorDescription: {
    fontSize: 14,
    color: "#777",
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  placeholder: {
    fontSize: 14,
    color: "#888",
    fontStyle: "italic",
    marginVertical: 10,
  },
  dateButton: {
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    marginRight: 10,
  },
  timeButton: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    marginRight: 10,
  },
  selectedButton: {
    backgroundColor: "#855CDD",
  },
  buttonText: {
    color: "#000",
  },
  selectedText: {
    color: "#fff",
  },
  arrivalText: {
    fontSize: 12,
    color: "#555",
    marginTop: 5,
    textAlign: "center",
  },
  bookButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#855CDD",
    borderRadius: 8,
    alignItems: "center",
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Booking3;
