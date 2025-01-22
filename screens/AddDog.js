import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function AddDog({ route, navigation }) {
  const { setDogs } = route.params;

  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [imageUri, setImageUri] = useState('');

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Needed',
        'We need permissions to access your gallery.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleAddDog = () => {
    if (!name || !breed || !imageUri) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const newDog = {
      id: Date.now().toString(),
      name,
      breed,
      image: imageUri,
    };

    setDogs((prevDogs) => [...prevDogs, newDog]);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter dog's name"
      />

      <Text style={styles.label}>Breed</Text>
      <TextInput
        style={styles.input}
        value={breed}
        onChangeText={setBreed}
        placeholder="Enter dog's breed"
      />

      <Text style={styles.label}>Image</Text>
      <Button title="Pick an Image" onPress={handlePickImage} color="#007bff" />

      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.previewImage} />
      ) : (
        <Text style={styles.placeholderText}>No image selected</Text>
      )}

      <Button title="Add Dog" onPress={handleAddDog} color="#28a745" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  placeholderText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 15,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
  },
});
