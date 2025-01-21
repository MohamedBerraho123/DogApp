import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function DogDetails({ route }) {
  const { dog } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: dog.image }} style={styles.image} />
      <Text style={styles.title}>{dog.name}</Text>
      <Text style={styles.subtitle}>Breed: {dog.breed}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginTop: 10,
  },
});
