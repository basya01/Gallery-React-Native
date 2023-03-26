import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import Gallery from './routes/Gallery';
import Photo from './routes/Photo';
import { store } from './store';
import { RootStackParamList } from './types/models/RootStackParamList';

function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Provider store={store}>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar backgroundColor="#ffffff"/>
          <Stack.Navigator>
            <Stack.Screen name="Gallery" component={Gallery} />
            <Stack.Screen name="Photo" component={Photo} />
          </Stack.Navigator>
        </SafeAreaView>
      </Provider>
    </NavigationContainer>
  );
}
export default App;
