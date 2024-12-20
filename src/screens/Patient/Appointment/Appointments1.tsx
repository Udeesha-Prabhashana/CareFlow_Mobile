import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Card } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";

interface Appointment {
  title?: string;
  description: string;
  body: string;
  date: string;
  paid?: boolean;
  doctorName?: string;
}

const Appointments1 = ({ navigation }: any) => { // Add navigation prop
  const [alignment, setAlignment] = useState<string>("upcoming");
  const [doctorNameFilter, setDoctorNameFilter] = useState<string>("");

  const mockAppointments = {
    upcoming: [
      {
        title: "No. 1",
        description: "Dr. Smith",
        body: "General checkup",
        date: "2024-11-27",
        paid: false,
        doctorName: "Smith",
        charges: "50 USD",
        time: "10:00 AM",
      },
      {
        title: "No. 2",
        description: "Dr. Taylor",
        body: "Dental cleaning",
        date: "2024-11-28",
        paid: true,
        doctorName: "Taylor",
        charges: "70 USD",
        time: "11:30 AM",
      },
    ],
    completed: [
      {
        description: "Dr. Lee",
        body: "Eye checkup",
        date: "2024-11-25",
        doctorName: "Lee",
        charges: "60 USD",
        time: "09:00 AM",
      },
    ],
    missed: [
      {
        description: "Dr. Brown",
        body: "Follow-up",
        date: "2024-11-26",
        doctorName: "Brown",
        charges: "40 USD",
        time: "02:00 PM",
      },
    ],
  };

  const filteredAppointments = () => {
    let appointments: Appointment[] = [];
    switch (alignment) {
      case "upcoming":
        appointments = mockAppointments.upcoming;
        break;
      case "completed":
        appointments = mockAppointments.completed;
        break;
      case "missed":
        appointments = mockAppointments.missed;
        break;
      default:
        break;
    }

    if (doctorNameFilter) {
      appointments = appointments.filter((item) =>
        item.doctorName?.toLowerCase().includes(doctorNameFilter.toLowerCase())
      );
    }

    return appointments;
  };

  const renderAppointment = ({ item }: { item: Appointment }) => (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        {alignment === "upcoming" && <Text style={styles.cardTitle}>{item.title}</Text>}
        <Text style={styles.cardSubtitle}>{item.description}</Text>
        <Text style={styles.cardBody}>{item.body}</Text>
        <Text style={styles.cardDate}>{item.date}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("BookingSummary", {
            appointment: item,
            showPaymentButton: alignment === "upcoming" && !item.paid,
          });
        }}
      >
        <Text style={styles.buttonText}>
          {alignment === "upcoming" ? (item.paid ? "View Details" : "Pay Now") : "View Details"}
        </Text>
      </TouchableOpacity>
    </Card>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>View Appointments</Text>
      <Text style={styles.headerSubtitle}>Details of your Appointments</Text>

      <View style={styles.filterContainer}>
        <Picker
          selectedValue={alignment}
          style={styles.picker}
          onValueChange={(value) => setAlignment(value)}
        >
          <Picker.Item label="Upcoming" value="upcoming" />
          <Picker.Item label="Completed" value="completed" />
          <Picker.Item label="Missed" value="missed" />
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="Filter by Doctor's Name"
          value={doctorNameFilter}
          onChangeText={(text) => setDoctorNameFilter(text)}
        />
      </View>

      <FlatList
        data={filteredAppointments()}
        renderItem={renderAppointment}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF", padding: 20 },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#333", marginBottom: 5 },
  headerSubtitle: { fontSize: 16, color: "#555", marginBottom: 20 },
  filterContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  picker: { flex: 1, height: 50, backgroundColor: "#f5f5f5", borderRadius: 5, marginRight: 10 },
  input: { flex: 1, height: 50, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, paddingHorizontal: 10 },
  list: { marginTop: 10 },
  card: { backgroundColor: "#FFF", borderRadius: 10, marginBottom: 15, padding: 15, elevation: 5 },
  cardContent: { marginBottom: 10 },
  cardTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  cardSubtitle: { fontSize: 16, fontWeight: "600", marginBottom: 5 },
  cardBody: { fontSize: 14, color: "#777" },
  cardDate: { fontSize: 12, color: "#999", marginTop: 5 },
  button: { backgroundColor: "#855CDD", padding: 10, borderRadius: 5, alignItems: "center" },
  buttonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
});

export default Appointments1;
