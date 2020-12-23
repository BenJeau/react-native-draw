import React from 'react';
import { Text, Pressable, View, FlatList, StyleSheet } from 'react-native';

import { pushScreen } from '../navigation';
import data from './data';

interface HomeProps {
  componentId: string;
}

const Home: React.FC<HomeProps> = ({ componentId }) => (
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
                pushScreen('DrawExample', componentId, props);
              }}
            >
              <Text>{description}</Text>
            </Pressable>
          </View>
        ))}
      </>
    )}
    contentContainerStyle={styles.listContainer}
  />
);

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
