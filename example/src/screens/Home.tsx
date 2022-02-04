import { useTheme } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  Linking,
  TouchableOpacity,
  View,
} from 'react-native';

import { RootStackParamList } from '../App';
import { Button } from '../components';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const theme = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={{ color: theme.colors.text, marginBottom: 10 }}>
        Various collection of examples, feel free to explore them
      </Text>

      <Text
        style={{ color: theme.colors.text, marginVertical: 10, fontSize: 18 }}
      >
        Drawing Examples
      </Text>

      <Button onPress={() => navigation.navigate('SimpleExample')}>
        Simple drawing example
      </Button>
      <Button onPress={() => navigation.navigate('MoreComplexExample')}>
        Complex drawing example
      </Button>
      <Button onPress={() => navigation.navigate('ExtrasExample')}>
        Example using the extras package
      </Button>

      <Text
        style={{ color: theme.colors.text, marginVertical: 10, fontSize: 18 }}
      >
        Individual Component Examples
      </Text>
      <Button
        onPress={() =>
          navigation.navigate('ExampleSelection', {
            type: 'canvas',
            title: 'Canvas Examples',
          })
        }
      >
        Canvas
      </Button>
      <Button
        onPress={() =>
          navigation.navigate('ExampleSelection', {
            type: 'canvasControls',
            title: 'CanvasControls Examples',
          })
        }
      >
        CanvasControls
      </Button>
      <Button
        onPress={() =>
          navigation.navigate('ExampleSelection', {
            type: 'brushPreview',
            title: 'BrushPreview Examples',
          })
        }
      >
        BrushPreview
      </Button>
      <Button
        onPress={() =>
          navigation.navigate('ExampleSelection', {
            type: 'brushProperties',
            title: 'BrushProperties Examples',
          })
        }
      >
        BrushProperties
      </Button>
      <Button
        onPress={() =>
          navigation.navigate('ExampleSelection', {
            type: 'colorPicker',
            title: 'ColorPicker Examples',
          })
        }
      >
        ColorPicker
      </Button>

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              color: theme.colors.text,
              marginRight: 4,
            }}
          >
            Made with ♥️ by
          </Text>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://github.com/BenJeau')}
          >
            <Text style={{ color: theme.colors.primary }}>@BenJeau</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 5 }}>
          <Text
            style={{
              color: theme.colors.text,
              fontWeight: 'bold',
              marginRight: 4,
            }}
          >
            Open source and available on
          </Text>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('https://github.com/BenJeau/react-native-draw')
            }
          >
            <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
              GitHub
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default Home;
