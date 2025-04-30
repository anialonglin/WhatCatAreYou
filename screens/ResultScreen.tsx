import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import Constants from 'expo-constants';
import adjectives from '../constants/adjectives';
import { LinearGradient } from 'expo-linear-gradient';

const screenWidth = Dimensions.get('window').width;

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

export default function ResultScreen({ navigation }: Props) {
  const [catImage, setCatImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [adjective, setAdjective] = useState<string>('');

  const fetchCat = async () => {
    setLoading(true);
    try {
      const response = await fetch(Constants.expoConfig?.extra?.catApiUrl || '');
      const data = await response.json();
      setCatImage(data[0]?.url);
      const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
      setAdjective(randomAdj);
    } catch (error) {
      console.error('Error fetching cat:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCat();
  }, []);

  return (
    <LinearGradient
        colors={['#fdfbfb', '#c6acfa']}
        style={styles.gradientBackground}
    >
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#666" />
        ) : (
          <>
            {catImage && (
              <Image source={{ uri: catImage }} style={styles.image} resizeMode="cover" />
            )}
            <Text style={styles.resultText}>You are a {adjective} cat! 😼</Text>
          </>
        )}
        <Pressable style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Try Again</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  image: {
    width: screenWidth * 0.8,
    height: screenWidth * 0.8,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  resultText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#4A4A4A',
    textAlign: 'center',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  button: {
    backgroundColor: '#6A5ACD',
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
