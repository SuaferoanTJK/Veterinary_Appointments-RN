import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

const Form = ({
  patients,
  setPatients,
  patient,
  setPatient,
  setModalVisible,
}) => {
  const initialState = {
    name: '',
    owner: '',
    email: '',
    phone: '',
    date: new Date(),
    symptom: '',
  };
  const [formData, setFormData] = useState(initialState);
  const [id, setId] = useState('');

  useEffect(() => {
    if (Object.keys(patient).length > 0) {
      setFormData(patient);
      setId(patient.id);
    }
  }, [patient]);

  const cleanForm = () => {
    setModalVisible(false);
    setFormData(initialState);
    setPatient({});
    setId('');
  };

  const handleNewDate = () => {
    const {name, owner, email, phone, symptom} = formData;
    if ([name, owner, email, phone, symptom].includes('')) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
    const newPatient = formData;
    if (id) {
      newPatient.id = id;
      const updatedPatients = patients.map(patientMap =>
        patientMap.id === newPatient.id ? newPatient : patientMap,
      );
      setPatients(updatedPatients);
    } else {
      newPatient.id = Date.now();
      setPatients([...patients, newPatient]);
    }
    cleanForm();
  };

  return (
    <SafeAreaView style={styles.data}>
      <ScrollView>
        <Text style={styles.title}>
          {id ? 'Edit' : 'New'} {''}
          <Text style={styles.titleBold}>Appointment</Text>
        </Text>
        <Pressable style={styles.btnCancel} onPress={cleanForm}>
          <Text style={styles.btnCancelText}>X Cancel</Text>
        </Pressable>
        <View style={styles.field}>
          <Text style={styles.label}>Pet</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter pet's name"
            placeholderTextColor={'#666'}
            value={formData.name}
            onChangeText={text => {
              setFormData({...formData, name: text});
            }}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Owner</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter owner's name"
            placeholderTextColor={'#666'}
            value={formData.owner}
            onChangeText={text => {
              setFormData({...formData, owner: text});
            }}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter owner's email"
            placeholderTextColor={'#666'}
            keyboardType="email-address"
            value={formData.email}
            onChangeText={text => {
              setFormData({...formData, email: text});
            }}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter owner's phone"
            placeholderTextColor={'#666'}
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={text => {
              setFormData({...formData, phone: text});
            }}
            maxLength={10}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Discharge Date</Text>
          <View style={styles.dateContainer}>
            <DatePicker
              date={formData.date}
              mode="datetime"
              androidVariant="nativeAndroid"
              onDateChange={date => {
                setFormData({...formData, date});
              }}
            />
          </View>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Symptom</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter pet's symptom"
            placeholderTextColor={'#666'}
            multiline={true}
            numberOfLines={4}
            value={formData.symptom}
            onChangeText={text => {
              setFormData({...formData, symptom: text});
            }}
          />
        </View>
        <Pressable onPress={handleNewDate} style={styles.btnNewDate}>
          <Text style={styles.btnTextNewDate}>
            {id ? 'Edit' : 'Add'} Appointment
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  data: {
    backgroundColor: '#6D28D9',
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 25,
    color: 'white',
  },
  titleBold: {fontWeight: '900'},
  field: {marginTop: 10, marginHorizontal: 30},
  label: {color: 'white', fontSize: 18},
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  dateContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  btnCancel: {
    marginBottom: 20,
    backgroundColor: '#5827A4',
    marginHorizontal: 30,
    padding: 20,
    borderRadius: 10,
  },
  btnCancelText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  btnNewDate: {
    backgroundColor: '#F59E0B',
    padding: 15,
    marginTop: 25,
    marginBottom: 50,
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
});

export default Form;
