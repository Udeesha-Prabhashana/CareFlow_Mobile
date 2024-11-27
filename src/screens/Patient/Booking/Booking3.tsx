import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Picker,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import moment from "moment";

export interface AvailabilitySlot {
  availableDate: string;
  availableTime: string;
  suggestTime: string;
  bookedSlots: number;
  totalSlots: number;
}

export interface Item {
  id: string;
  name: string;
  photoUrl: string;
  description: string;
  docCharge: string;
  rating?: number;
  specialization?: string;
  availability: AvailabilitySlot[];
}

const Booking3: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [availableTime, setAvailableTime] = useState<string>("");
  const [suggestTime, setSuggestTime] = useState<string>("");

  const item = route.params?.item as Item;

  useEffect(() => {
    if (selectedDate && item) {
      const slot = item.availability.find((slot) => slot.availableDate === selectedDate);
      if (slot) {
        const [startTime, endTime] = slot.availableTime.split(" - ");
        const startMoment = moment(startTime, "hh:mm A");
        const endMoment = moment(endTime, "hh:mm A");

        const totalMinutes = endMoment.diff(startMoment, "minutes");
        const slotDuration = totalMinutes / slot.totalSlots;

        const userAppointmentTime = startMoment.add(slot.bookedSlots * slotDuration - 15, "minutes");
        const formattedTime = userAppointmentTime.format("hh:mm A");

        if (formattedTime !== suggestTime) {
          setSuggestTime(formattedTime);
        }
      } else {
        setSuggestTime("");
      }
    }
  }, [selectedDate, item, suggestTime]);

  const handleDateChange = (value: string) => {
    setSelectedDate(value);
    if (item) {
      const slot = item.availability.find((slot) => slot.availableDate === value);
      if (slot) {
        setAvailableTime(slot.availableTime);
      } else {
        setAvailableTime("");
        setSuggestTime("");
      }
    }
  };

  const handleClick = () => {
    if (selectedDate && item) {
      const availableAppointments = item.availability.find(
        (slot) => slot.availableDate === selectedDate
      )?.bookedSlots || 0;

      const data = {
        doctor: item,
        selectedDate,
        time: suggestTime,
        availableAppointments: availableAppointments + 1 || 0,
        // Add patient details here if necessary
      };

      navigation.navigate("BookingSummaryPay", { state: data });
    } else {
      Alert.alert("Please select a date.");
    }
  };

  if (!item) {
    return (
      <View style={styles.center}>
        <Text>No doctor information available.</Text>
      </View>
    );
  }

  const availableAppointments =
    item.availability.find((slot) => slot.availableDate === selectedDate)?.bookedSlots || 0;

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBack}>
        <Text style={styles.goBackText}>← Go Back</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.photoUrl }} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.doctorName}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.label}>Speciality:</Text>
        <Text style={styles.value}>{item.specialization}</Text>
      </View>
      <View style={styles.availabilityContainer}>
        <Text style={styles.label}>Select Date:</Text>
        <Picker
          selectedValue={selectedDate}
          onValueChange={(itemValue) => handleDateChange(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Date" value="" />
          {item.availability.map((slot) => (
            <Picker.Item
              key={slot.availableDate}
              label={new Date(slot.availableDate).toLocaleDateString()}
              value={slot.availableDate}
            />
          ))}
        </Picker>
        {selectedDate ? (
          <View>
            <Text style={styles.label}>Available Appointment Number:</Text>
            <Text style={styles.value}>{availableAppointments + 1}</Text>
            <Text style={styles.label}>Arrival Time Based on Your Booking:</Text>
            <Text style={styles.value}>{suggestTime}</Text>
          </View>
        ) : null}
      </View>
      <TouchableOpacity onPress={handleClick} style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Book Doctor</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  goBack: {
    marginBottom: 16,
  },
  goBackText: {
    color: "#6200EE",
    fontSize: 16,
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  detailsContainer: {
    marginBottom: 16,
  },
  doctorName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    marginBottom: 8,
  },
  availabilityContainer: {
    marginBottom: 16,
  },
  picker: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 8,
  },
  bookButton: {
    backgroundColor: "#6200EE",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Booking3;
