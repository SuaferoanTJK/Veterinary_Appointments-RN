import React from 'react';
import {Text, StyleSheet, View, Pressable} from 'react-native';
import {formatDate} from '../helpers';

const Patient = ({
  info,
  setModalVisible,
  editPatient,
  deletePatient,
  setShowModalPatient,
  setPatient,
}) => {
  const {name, date, id} = info;

  return (
    <Pressable
      onLongPress={() => {
        setShowModalPatient(true);
        setPatient(info);
      }}>
      <View style={styles.container}>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.date}>{formatDate(date)}</Text>
        <View style={styles.containerBtns}>
          <Pressable
            style={[styles.btns, styles.btnEdit]}
            onPress={() => {
              setModalVisible(true);
              editPatient(id);
            }}>
            <Text style={styles.btnText}>Editar</Text>
          </Pressable>
          <Pressable
            style={[styles.btns, styles.btnDelete]}
            onLongPress={() => {
              deletePatient(id);
            }}>
            <Text style={styles.btnText}>Eliminar</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    borderBottomColor: '#94A3B8',
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  text: {color: '#6D28D9', fontSize: 24, fontWeight: '700'},
  date: {color: '#374151'},
  containerBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  btns: {paddingVertical: 10, paddingHorizontal: 25, borderRadius: 5},
  btnEdit: {backgroundColor: '#F59E0B'},
  btnDelete: {backgroundColor: '#EF4444'},
  btnText: {
    color: 'white',
    fontWeight: '900',
    textTransform: 'uppercase',
  },
});

export default Patient;
