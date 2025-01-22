import React, { useState } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function DogList({ navigation }) {
  const [dogs, setDogs] = useState([]);

  const handleNavigateToAddDog = () => {
    navigation.navigate('AddDog', { setDogs });
  };

  const renderDog = ({ item }) => (
    <TouchableOpacity
      style={styles.dogItem}
      onPress={() => navigation.navigate('DogDetails', { dog: item })}
    >
      <Image source={{ uri: item.image }} style={styles.dogImage} />
      <View>
        <Text style={styles.dogName}>{item.name}</Text>
        <Text style={styles.dogBreed}>{item.breed}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dogs}
        renderItem={renderDog}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>No dogs added yet!</Text>}
      />
      <Button title="Add Dog" onPress={handleNavigateToAddDog} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  dogItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  dogImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  dogName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dogBreed: {
    fontSize: 14,
    color: '#555',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});
