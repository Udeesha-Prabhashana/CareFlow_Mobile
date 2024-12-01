import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

const Booking4 = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { doctor, selectedDate, selectedTime } = route.params;

  const handlePayment = (paymentType) => {
    if (paymentType === "Pay Later") {
      navigation.navigate("Appointments1"); // Redirect to Appointments1 page
    } else {
      alert(`You selected ${paymentType} option.`);
      // Add logic for "Pay Now" if needed
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Booking Summary</Text>
      <View style={styles.summaryDetails}>
        <Text style={styles.summaryText}>
          Doctor: <Text style={styles.detailText}>{doctor.name}</Text>
        </Text>
        <Text style={styles.summaryText}>
          Specialty: <Text style={styles.detailText}>{doctor.title}</Text>
        </Text>
        <Text style={styles.summaryText}>
          Date: <Text style={styles.detailText}>{selectedDate}</Text>
        </Text>
        <Text style={styles.summaryText}>
          Time: <Text style={styles.detailText}>{selectedTime}</Text>
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.paymentButton}
          onPress={() => handlePayment("Pay Now")}
        >
          <Text style={styles.buttonText}>Pay Now</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.laterButton}
          onPress={() => handlePayment("Pay Later")}
        >
          <Text style={styles.buttonText}>Pay Later</Text>
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
    marginBottom: 20,
    color: "#4a4e69",
  },
  summaryDetails: {
    marginBottom: 30,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 10,
  },
  detailText: {
    fontWeight: "bold",
    color: "#000000",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paymentButton: {
    flex: 1,
    backgroundColor: "#855CDD",
    padding: 15,
    marginRight: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  laterButton: {
    flex: 1,
    backgroundColor: "#808080",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Booking4;
