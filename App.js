import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Alert,
  Modal,
} from 'react-native';
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
      '¿Desea eliminar este paciente?',
      'Un paciente eliminado no se puede recuperar',
      [
        {text: 'Cancelar'},
        {
          text: 'Confirmar',
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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Administrador de Citas {''}
        <Text style={styles.titleBold}>Veterinaria</Text>
      </Text>
      <Pressable
        onPress={() => {
          setModalVisible(true);
        }}
        style={styles.btnNewDate}>
        <Text style={styles.btnTextNewDate}>Nueva Cita</Text>
      </Pressable>
      {patients.length === 0 ? (
        <Text style={styles.noPatients}>No hay pacientes aún</Text>
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
    paddingHorizontal: 5,
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
    marginHorizontal: 20,
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
  },
  list: {
    marginHorizontal: 30,
  },
});

export default App;
