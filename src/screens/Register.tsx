import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal, Alert } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);

  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!username || !email || !password || !phone || !name) {
      Alert.alert("Validation Error", "All fields are required.");
      return;
    }

    const credentials = {
      userName: username,
      userPassword: password,
      userEmail: email,
      name,
      userMobileNo: phone,
      userRole: "ROLE_USER",
    };

    try {
      const res = await axios.post(
        `http://10.0.2.2:8080/sign-up`,
        credentials
      );

      if (res.status === 200) {
        Alert.alert("Registration Successful", "Please verify your OTP.");
        setShowOtpModal(true); // Show OTP modal
      } else {
        Alert.alert("Registration Failed", "Please try again.");
      }
    } catch (err) {
      console.error("Error during registration:", err);
      Alert.alert("Error", err.response?.data?.error || "An unexpected error occurred.");
    }
  };

  const handleResendOtp = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/resend-otp2`, {
        mobileNumber: phone,
      });

      if (res.status === 200) {
        Alert.alert("OTP Resent", "The OTP has been resent to your phone.");
      } else {
        Alert.alert("Error", "Failed to resend OTP.");
      }
    } catch (err) {
      console.error("Error resending OTP:", err);
      Alert.alert("Error", "An unexpected error occurred while resending OTP.");
    }
  };

  const handleCloseOtpModal = () => {
    setShowOtpModal(false);
    navigation.navigate("Login"); // Redirect to login after closing modal
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TextInput
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.linkButton}>
        <Text style={styles.normalText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.linkText}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* OTP Modal */}
      <Modal
        visible={showOtpModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>OTP Verification</Text>
            <Text style={styles.modalText}>Please verify your phone number.</Text>

            <TouchableOpacity
              style={[styles.button, { marginVertical: 10 }]}
              onPress={handleCloseOtpModal}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#FF6347" }]}
              onPress={handleResendOtp}
            >
              <Text style={styles.buttonText}>Resend OTP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
    color: "black",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    fontSize: 16,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#855CDD",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkButton: {
    flexDirection: "row",
    marginTop: 20,
  },
  normalText: {
    color: "black",
    fontSize: 16,
  },
  linkText: {
    color: "#855CDD",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default Register;
