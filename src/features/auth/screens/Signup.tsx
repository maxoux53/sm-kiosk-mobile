import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { exportStyles } from '../../../App';
import { useState } from 'react';
import { Alert, Image } from 'react-native';
import { ImagePickerAsset } from 'expo-image-picker';
import useAuthAPI from '../../../hooks/useAuthAPI';
import { setUserId } from '../../../store/slice';
import Loader from '../../../components/Loader';
import { useDispatch } from 'react-redux';
import useImageAPI from '../../../hooks/useImageAPI';

export default function Signup() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { signup, isLoading: isLoadingSignup, errorMessage: errorMessageSignup } = useAuthAPI()
  const { uploadImage, isLoading: isLoadingUpload, errorMessage: errorMessageUpload } = useImageAPI()
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState<ImagePickerAsset | undefined>();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission refusée',
          "L'accès à la galerie est nécessaire pour choisir un avatar."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setAvatar(result.assets[0]);
      }
  };

  const handleSignup = async () => {
    if (!firstName || !lastName || !email || !password) {
      Alert.alert('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const user = { first_name: firstName, last_name: lastName, email, password };
      const response = await signup(user);
      dispatch(setUserId(response.user.id));
      if (avatar) {
        await uploadImage(avatar);
      }
    } catch {
      Alert.alert(errorMessageSignup ?? errorMessageUpload ?? 'Erreur inconnue');
    }
  };

  return (
    <View style={styles.container}>
      {isLoadingSignup || isLoadingUpload && <Loader />}
      <View style={styles.view1}>
        <Text style={{ fontSize: 32, fontFamily: 'bold'}}>S'enregistrer</Text>
        <View style={styles.view2}>
          <TextInput returnKeyType='next' autoCapitalize='none' autoCorrect={false} autoComplete='given-name' textContentType='givenName' style={exportStyles.input} placeholder='Prénom' value={firstName} onChangeText={setFirstName} />
          <TextInput returnKeyType='next' autoCapitalize='none' autoCorrect={false} autoComplete='family-name' textContentType='familyName' style={exportStyles.input} placeholder='Nom' value={lastName} onChangeText={setLastName} />
          <TextInput returnKeyType='next' keyboardType='email-address' autoCapitalize='none' autoCorrect={false} autoComplete='email' textContentType='emailAddress' style={exportStyles.input} placeholder='Email' value={email} onChangeText={setEmail} />
          <TextInput returnKeyType='done' secureTextEntry autoCapitalize='none' autoCorrect={false} autoComplete='password' textContentType='password' style={exportStyles.input} placeholder='Mot de passe' value={password} onChangeText={setPassword} />
          <TouchableOpacity onPress={pickImage} style={exportStyles.input}>
            {avatar ? (
              <Image source={{ uri: avatar.uri }} style={exportStyles.image} />
            ) : (
              <Text>Choisir une image comme avatar</Text>
            )}
          </TouchableOpacity>
          {
            avatar && <TouchableOpacity style={exportStyles.button} onPress={() => setAvatar(undefined)}>
              <Text style={styles.text1}>Supprimer l'avatar</Text>
            </TouchableOpacity>
          }
          <TouchableOpacity style={exportStyles.button} onPress={handleSignup}>
            <Text style={styles.text1}>S'enregistrer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  view1: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%',
    gap: 25,
  },
  view2: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    gap: 10,
  },
  text1: {
    color: 'white',
    fontSize: 16,
  },
  imageWrapper: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: '#eee',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
    },
});
