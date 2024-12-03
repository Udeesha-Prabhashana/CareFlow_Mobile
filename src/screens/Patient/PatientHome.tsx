import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const PatientHome = () => {
  const navigation = useNavigation();

  // State variables for appointments
  const [ongoingAppointments, setOngoingAppointments] = useState(0);
  const [upcomingAppointments, setUpcomingAppointments] = useState(0);
  const [missedAppointments, setMissedAppointments] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const userId = "123"; // Replace with dynamic user ID after authentication

  useEffect(() => {
    // Fetch appointment data when the component loads
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        `http://10.0.2.2:8080/api/appointments/${userId}`
      );

      if (response.status === 200) {
        const data = response.data;
        setOngoingAppointments(data.ongoing || 0);
        setUpcomingAppointments(data.upcoming || 0);
        setMissedAppointments(data.missed || 0);
      } else {
        Alert.alert("Error", "Failed to fetch appointments.");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      Alert.alert("Error", "Unable to fetch appointment data.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAskCuraClick = () => {
    navigation.navigate("CuraHome");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.mainContent}>
        <Text style={styles.mainTopic}>
          Good Morning, <Text style={styles.purpleText}>Michael</Text>
        </Text>
        <Text style={styles.subTopic}>Welcome to your Dashboard</Text>

        {isLoading ? (
          <ActivityIndicator size="large" color="#855CDD" />
        ) : (
          <View>
            {/* Appointment Statistics */}
            <View style={styles.boxContainer}>
              <View style={styles.box}>
                <Text style={styles.boxTitle}>Ongoing{"\n"}Appointments</Text>
                <Text style={styles.boxNumber}>{ongoingAppointments}</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.boxTitle}>Upcoming{"\n"}Appointments</Text>
                <Text style={[styles.boxNumber, styles.purpleText]}>
                  {upcomingAppointments}
                </Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.boxTitle}>Missed{"\n"}Appointments</Text>
                <Text style={[styles.boxNumber, styles.purpleText]}>
                  {missedAppointments}
                </Text>
              </View>
            </View>

            {/* Information and Call-to-Action */}
            <View style={styles.infoImageContainer}>
              <View style={styles.infoContainer}>
                <Text style={styles.mainTopic}>
                  Ready to make your first appointment?
                </Text>
                <Text style={styles.subTopic}>
                  Cura is an AI-Powered chatbot that can help you find your
                  doctor and book an appointment.
                </Text>
              </View>
              <View style={styles.imageContainer}>
                <Image
                  source={require("../../components/images/curamain.png")}
                  style={styles.heroImage}
                />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleAskCuraClick}
              >
                <Text style={styles.buttonText}>Ask Cura</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  mainContent: {
    flex: 1,
  },
  mainTopic: {
    fontSize: 27,
    fontWeight: "500",
    marginBottom: 8,
  },
  subTopic: {
    fontSize: 14,
    fontWeight: "300",
    marginBottom: 16,
  },
  purpleText: {
    color: "#855CDD",
  },
  boxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  box: {
    flex: 1,
    marginHorizontal: 8,
    padding: 16,
    backgroundColor: "#EEE7FF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  boxTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
  },
  boxNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#855CDD",
  },
  infoImageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  infoContainer: {
    flex: 1,
    marginRight: 10,
  },
  buttonContainer: {
    marginTop: 10,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#855CDD",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
  },
  heroImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
});

export default PatientHome;
