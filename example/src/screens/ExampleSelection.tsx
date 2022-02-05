import React, { useMemo } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import canvasData from './canvas/data';
import brushPreviewsData from './brushPreview/data';
import brushPropertiesData from './brushProperties/data';
import canvasControlsData from './canvasControls/data';
import colorPickerData from './colorPicker/data';

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

  const data = useMemo(() => {
    switch (route.params.type) {
      case 'canvas':
        return canvasData;
      case 'brushPreview':
        return brushPreviewsData;
      case 'brushProperties':
        return brushPropertiesData;
      case 'canvasControls':
        return canvasControlsData;
      case 'colorPicker':
        return colorPickerData;
      default:
        return [];
    }
  }, [route.params]);

  const screenToNavigate = useMemo(() => {
    switch (route.params.type) {
      case 'canvas':
        return 'CanvasExample';
      case 'brushPreview':
        return 'BrushPreviewExample';
      case 'brushProperties':
        return 'BrushPropertiesExample';
      case 'canvasControls':
        return 'CanvasControlsExample';
      case 'colorPicker':
        return 'ColorPickerExample';
      default:
        return 'CanvasExample';
    }
  }, [route.params]);

  return (
    <FlatList
      data={data}
      ListHeaderComponent={
        <Text style={{ color: theme.colors.text, marginBottom: 20 }}>
          Various examples of the component with its different props
        </Text>
      }
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
                navigation.navigate(screenToNavigate, props);
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
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
  },
});

export default ExampleSelection;
