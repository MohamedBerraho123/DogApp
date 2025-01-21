import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

export default function DogList({ navigation }) {
  const [dogs, setDogs] = useState([
    { id: '1', name: 'Buddy', breed: 'Golden Retriever', image: 'https://i.pinimg.com/originals/00/6d/a4/006da426390620d40684dd06845fe743.jpg' },
    { id: '2', name: 'Bella', breed: 'Labrador', image: 'https://media.istockphoto.com/id/946835070/photo/american-pit-bull-dog.jpg?s=612x612&w=0&k=20&c=62Z_Iak9dYxgtAifzZIZedKTCSgQVLHFbsmNCnE8O1c=' },
  ]);

  const handleDeleteDog = (id) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this dog?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setDogs((prevDogs) => prevDogs.filter((dog) => dog.id !== id)),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dogs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.details}
              onPress={() => navigation.navigate('DogDetails', { dog: item })}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.breed}>{item.breed}</Text>
              </View>
            </TouchableOpacity>
            <Button
              title="Delete"
              color="#d9534f"
              onPress={() => handleDeleteDog(item.id)}
            />
          </View>
        )}
      />
      <Button title="Add Dog" onPress={() => navigation.navigate('AddDog', { setDogs })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  breed: {
    fontSize: 14,
    color: '#555',
  },
});
