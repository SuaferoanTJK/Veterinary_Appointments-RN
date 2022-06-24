import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Alert,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Form from './src/components/Form';
import Patient from './src/components/Patient';
import InfoPatient from './src/components/InfoPatient';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState({});
  const [showModalPatient, setShowModalPatient] = useState(false);

  const editPatient = id => {
    const findPatient = patients.filter(
      patientFilter => patientFilter.id === id,
    );
    setPatient(findPatient[0]);
  };

  const deletePatient = id => {
    Alert.alert(
      'Delete appointment?',
      'Once deleted it is not possible to recover',
      [
        {text: 'Cancel'},
        {
          text: 'Yes, Delete',
          onPress: () => {
            const updatePatients = patients.filter(
              patientFilter => patientFilter.id !== id,
            );
            setPatients(updatePatients);
          },
        },
      ],
    );
  };

  useEffect(() => {
    const obtainAppointmentsStorage = async () => {
      try {
        const appointmentStorage = await AsyncStorage.getItem('appointments');
        setPatients(appointmentStorage ? JSON.parse(appointmentStorage) : []);
      } catch (error) {
        console.log(error);
      }
    };
    obtainAppointmentsStorage();
  }, []);

  useEffect(() => {
    const saveAppointmentsStorage = async () => {
      try {
        await AsyncStorage.setItem('appointments', JSON.stringify(patients));
      } catch (error) {
        console.log(error);
      }
    };
    saveAppointmentsStorage();
  }, [patients]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Veterinary Appointment {''}
        <Text style={styles.titleBold}>Manager</Text>
      </Text>
      <Pressable
        onPress={() => {
          setModalVisible(true);
        }}
        style={styles.btnNewDate}>
        <Text style={styles.btnTextNewDate}>New Appointment</Text>
      </Pressable>
      {patients.length === 0 ? (
        <Text style={styles.noPatients}>There are not appointments yet</Text>
      ) : (
        <FlatList
          style={styles.list}
          data={patients}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <Patient
                info={item}
                setModalVisible={setModalVisible}
                editPatient={editPatient}
                deletePatient={deletePatient}
                setShowModalPatient={setShowModalPatient}
                setPatient={setPatient}
              />
            );
          }}
        />
      )}
      <Modal animationType="slide" visible={modalVisible}>
        <Form
          patients={patients}
          setPatients={setPatients}
          patient={patient}
          setPatient={setPatient}
          setModalVisible={setModalVisible}
        />
      </Modal>
      <Modal animationType="slide" visible={showModalPatient}>
        <InfoPatient
          patient={patient}
          setPatient={setPatient}
          setShowModalPatient={setShowModalPatient}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F3F4F6',
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: '#374151',
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingTop: 45,
  },
  titleBold: {
    fontWeight: '900',
    color: '#6D28D9',
  },
  btnNewDate: {
    backgroundColor: '#6D28D9',
    padding: 15,
    marginVertical: 35,
    marginHorizontal: 30,
    borderRadius: 5,
  },
  btnTextNewDate: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  noPatients: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    marginHorizontal: 20,
  },
  list: {
    marginHorizontal: 30,
  },
});

export default App;
