import { useTheme } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { RootStackParamList } from '../App';
import { Button } from '../components';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const theme = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={{ color: theme.colors.text, marginBottom: 10 }}>
        Here are various collection of examples, feel free to explore them
      </Text>
      <Button
        onPress={() =>
          navigation.navigate('ExampleSelection', {
            type: 'canvas',
            title: 'Canvas Examples',
          })
        }
      >
        Canvas examples
      </Button>
      <Button
        onPress={() =>
          navigation.navigate('ExampleSelection', {
            type: 'draw',
            title: 'Draw Examples',
          })
        }
      >
        Complete drawing examples
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default Home;
