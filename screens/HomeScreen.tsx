import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/StackNavigator';
import { LinearGradient } from 'expo-linear-gradient';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <LinearGradient
    colors={['#fdfbfb', '#c6acfa']}
    style={styles.gradientBackground}
    >
      <View style={styles.container}>
        <Text style={styles.title}>What Cat Are You?</Text>
        <Text style={styles.subtitle}>
          Tap the button and reveal your feline identity 🐾
        </Text>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed ? { opacity: 0.8 } : {},
          ]}
          onPress={() => navigation.navigate('Result')}
        >
          <Text style={styles.buttonText}>Show Me My Cat</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const screenWidth = Dimensions.get('window').width;

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
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#4A4A4A',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
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
