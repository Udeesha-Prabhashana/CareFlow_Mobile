import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ViewDetails: React.FC = ({ route, navigation }: any) => {
  const { details } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Summary</Text>
      <Text style={styles.subtitle}>View and Confirm The Booking Details</Text>

      <View style={styles.card}>
        <Text style={styles.detail}>
          <Text style={styles.label}>Doctor Name: </Text> {details.description}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.label}>Date: </Text> {details.date}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.label}>Appointment No.: </Text> {details.title}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.label}>Time: </Text> 3:00 PM {/* Placeholder */}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.label}>Doctor Charges: </Text> LKR 3000 + Tax {/* Placeholder */}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.label}>Patient Name: </Text> Mr. Kamal Sahanandu {/* Placeholder */}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.label}>Age: </Text> 35 Years {/* Placeholder */}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.label}>Sex: </Text> Male {/* Placeholder */}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.label}>Address: </Text> No.25, Havelock Rd, Nugegoda {/* Placeholder */}
        </Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Make the Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 5, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 20, textAlign: 'center' },
  card: { backgroundColor: '#f9f9f9', padding: 15, borderRadius: 10, elevation: 2 },
  detail: { fontSize: 16, marginVertical: 5 },
  label: { fontWeight: 'bold' },
  button: {
    backgroundColor: '#6C63FF',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});

export default ViewDetails;
