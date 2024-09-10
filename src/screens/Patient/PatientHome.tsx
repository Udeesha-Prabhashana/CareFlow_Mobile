import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

const PatientHome = ({ navigation }) => {
  const handleAskCuraClick = () => {
    navigation.navigate('CuraHome');
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <Text style={styles.mainTopic}>
          Good Morning, <Text style={styles.purpleText}>Michael</Text>
        </Text>
        <Text style={styles.subTopic}>Welcome to your Dashboard</Text>

        {/* Added space between dashboard and boxes */}
        <View style={styles.space} />

        <View style={styles.boxContainer}>
          <View style={styles.box}>

            <Text style={styles.boxTitle}>Ongoing{"\n"}Appointments</Text>

            <Text style={styles.boxNumber}>5</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.boxTitle}>Upcoming{"\n"}Appointments</Text>
            <Text style={[styles.boxNumber, styles.purpleText]}>3</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.boxTitle}>Missed{"\n"}Appointments</Text>
            <Text style={[styles.boxNumber, styles.purpleText]}>1</Text>
          </View>
        </View>

        {/* Added space between boxes and appointment section */}
        <View style={styles.space} />

        <View style={styles.infoImageContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.mainTopic}>Ready to make your first appointment?</Text>
            <Text style={styles.subTopic}>
              Cura is an AI Powered chatbot that can help you find your doctor and book a doctor's appointment.
            </Text>
          </View>

          <View style={styles.imageContainer}>
            <Image source={require('../../components/images/curamain.png')} style={styles.heroImage} />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Ask Cura"
            onPress={handleAskCuraClick}
            color="#855CDD"
            accessibilityLabel="Ask Cura"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  mainContent: {
    flex: 1,
  },
  mainTopic: {
    fontSize: 27,
    fontWeight: '500',
    marginBottom: 8,
  },
  subTopic: {
    fontSize: 14,
    fontWeight: '300',
    marginBottom: 16,
  },
  purpleText: {
    color: '#855CDD',
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  box: {
    flex: 1,
    marginHorizontal: 8,
    padding: 16,
    backgroundColor: '#EEE7FF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  boxTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  boxNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#855CDD', // Colored the number

  },
  infoImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoContainer: {
    flex: 1,
    marginRight: 10,
  },
  buttonContainer: {
    marginTop: 10,
    width: 150,
    alignSelf: 'left',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  heroImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  space: {
    height: 20, // Adds space between elements
  },
});

export default PatientHome;
