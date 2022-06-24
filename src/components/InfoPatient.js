import React from 'react';
import {
  Text,
  SafeAreaView,
  Pressable,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {formatDate} from '../helpers';

const InfoPatient = ({patient, setPatient, setShowModalPatient}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.title}>
            Appointment <Text style={styles.titleBold}>Information</Text>
          </Text>
          <Pressable
            style={styles.btnClose}
            onPress={() => {
              setShowModalPatient(false);
              setPatient({});
            }}>
            <Text style={styles.btnCloseText}>X Close</Text>
          </Pressable>
        </View>
        <View style={styles.data}>
          <View style={styles.field}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{patient.name}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Owner:</Text>
            <Text style={styles.value}>{patient.owner}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{patient.email}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{patient.phone}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Discharge Date:</Text>
            <Text style={styles.value}>{formatDate(patient.date)}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Symptom:</Text>
            <Text style={styles.value}>{patient.symptom}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F59E0B',
    flex: 1,
    padding: 15,
    borderBottomColor: '#94A3B8',
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    fontWeight: '600',
    paddingHorizontal: 5,
    paddingTop: 20,
  },
  titleBold: {
    fontWeight: '900',
  },
  btnClose: {
    marginVertical: 20,
    backgroundColor: '#E06900',
    marginHorizontal: 30,
    padding: 20,
    borderRadius: 10,
  },
  btnCloseText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  data: {
    backgroundColor: 'white',
    marginTop: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 20,
  },
  field: {marginBottom: 15},
  label: {
    textTransform: 'uppercase',
    color: '#374151',
    fontWeight: '700',
    fontSize: 12,
  },
  value: {fontWeight: '700', color: '#334155', fontSize: 18},
});

export default InfoPatient;
