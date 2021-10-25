import React from 'react';
import {
  Text,
  Pressable,
  View,
  FlatList,
  StyleSheet,
  StatusBar,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import data from './data';
import type { RootStackParamList } from '../App';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#00000000"
        translucent
      />
      <FlatList
        data={data}
        ListHeaderComponent={
          <Text style={styles.title}>@benjeau/react-native-draw</Text>
        }
        renderItem={({ item }) => (
          <>
            <Text style={styles.sectionTitle}>{item.name}</Text>
            {item.data.map(({ description, props }, key) => (
              <View style={styles.buttonContainer} key={key}>
                <Pressable
                  style={styles.button}
                  android_ripple={{ color: '#777' }}
                  onPress={() => {
                    navigation.navigate('DrawExample', props);
                  }}
                >
                  <Text>{description}</Text>
                </Pressable>
              </View>
            ))}
          </>
        )}
        contentContainerStyle={[
          styles.listContainer,
          { paddingTop: insets.top },
        ]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 5,
    marginBottom: 10,
  },
  button: {
    padding: 10,
  },
  buttonTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  listContainer: {
    padding: 10,
    backgroundColor: '#EEE',
  },
  title: {
    fontSize: 25,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 5,
  },
});

export default Home;
