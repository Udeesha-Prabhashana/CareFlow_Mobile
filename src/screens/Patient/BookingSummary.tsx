import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const BookingSummary = ({ route }: any) => {
  const { appointment, showPaymentButton } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Booking Summary</Text>
      <Text style={styles.detail}>Doctor Name: {appointment.doctorName}</Text>
      <Text style={styles.detail}>Date: {appointment.date}</Text>
      <Text style={styles.detail}>Appointment No.: {appointment.title}</Text>
      <Text style={styles.detail}>Time: {appointment.time || "N/A"}</Text>
      <Text style={styles.detail}>Doctor Charges: {appointment.charges || "N/A"}</Text>
      <Text style={styles.detail}>Patient Name: John Doe</Text>
      <Text style={styles.detail}>Age: 30</Text>
      <Text style={styles.detail}>Sex: Male</Text>
      <Text style={styles.detail}>Address: 123 Main Street</Text>

      {showPaymentButton && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => alert("Proceeding to Payment")}
        >
          <Text style={styles.buttonText}>Pay Now</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#FFF" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  detail: { fontSize: 16, marginBottom: 10 },
  button: { marginTop: 20, padding: 15, backgroundColor: "#855CDD", borderRadius: 5, alignItems: "center" },
  buttonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
});

export default BookingSummary;
