import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Cart from '../../../components/Cart';
import useMeAPI from '../../../hooks/useMeAPI';
import { Purchase } from '../../../types/api';
import Loader from '../../../components/Loader';

export default function Order() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.text1}>Commandes</Text>
      <View style={styles.view1}>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '15%',
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    backgroundColor: 'white',
  },
  text1: {
    fontSize: 24,
    fontFamily: 'bold',
    textAlign: 'center',
  },
  view1: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
})
