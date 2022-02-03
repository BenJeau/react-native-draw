import React from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import canvasData from './canvas/data';
import drawData from './draw/data';
import type { RootStackParamList } from '../App';
import { Button } from '../components';
import { useTheme } from '@react-navigation/native';

type ExampleSelectionProps = NativeStackScreenProps<
  RootStackParamList,
  'ExampleSelection'
>;

const ExampleSelection: React.FC<ExampleSelectionProps> = ({
  route,
  navigation,
}) => {
  const theme = useTheme();

  return (
    <FlatList
      data={route.params.type === 'canvas' ? canvasData : drawData}
      renderItem={({ item }) => (
        <View>
          {!!item.name && (
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              {item.name}
            </Text>
          )}
          {item.data.map(({ description, props }, key) => (
            <Button
              onPress={() => {
                navigation.navigate('CanvasExample', props);
              }}
              key={key}
            >
              {description}
            </Button>
          ))}
        </View>
      )}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
  },
});

export default ExampleSelection;
