import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

export default function DogList({ navigation }) {
  const [dogs, setDogs] = useState([
    {
      id: '1',
      name: 'Buddy',
      breed: 'Golden Retriever',
      image: 'https://t3.ftcdn.net/jpg/00/24/68/52/360_F_24685204_dcrHBaKcrgKqnL0pQvvjMMPVWcI6V8uy.jpg',
    },
    {
      id: '2',
      name: 'Max',
      breed: 'German Shepherd',
      image: 'https://t4.ftcdn.net/jpg/01/94/68/11/360_F_194681103_Q4K3JNPWdxCKI3g0xrX7xg6UixyUQ6wg.jpg',
    },
  ]);

  const handleDeleteDog = (id) => {
    setDogs((prevDogs) => prevDogs.filter((dog) => dog.id !== id));
  };

  const handleDownloadImage = async (imageUri) => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Needed', 'Permission to access media is required.');
        return;
      }

      const fileUri = `${FileSystem.documentDirectory}${imageUri.split('/').pop()}`;
      await FileSystem.downloadAsync(imageUri, fileUri);
      await MediaLibrary.createAssetAsync(fileUri);
      Alert.alert('Download Complete', 'Image saved to your gallery!');
    } catch (error) {
      Alert.alert('Download Error', 'Failed to save the image.');
      console.error(error);
    }
  };

  const renderDog = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.breed}>{item.breed}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => handleDeleteDog(item.id)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.downloadButton]}
          onPress={() => handleDownloadImage(item.image)}
        >
          <Text style={styles.buttonText}>Download</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dogs}
        renderItem={renderDog}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>No dogs added yet!</Text>}
      />
      <Button
        title="Add Dog"
        onPress={() => navigation.navigate('AddDog', { setDogs })}
      />
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
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  breed: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  downloadButton: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});
