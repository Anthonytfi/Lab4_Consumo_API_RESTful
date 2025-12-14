// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from './src/screens/home/home';
import { AutorScreen } from './src/screens/autor/autor';
import { AutorFormScreen } from './src/screens/autor-form/autor-form';
import { LibroScreen } from './src/screens/libro/libro';
import { LibroFormScreen } from './src/screens/libro-form/libro-form';
import { GeneroScreen } from './src/screens/genero/genero';
import { GeneroFormScreen } from './src/screens/genero-form/genero-form';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
        <Stack.Screen name="Autor" component={AutorScreen} options={{ title: 'Autores' }} />
        <Stack.Screen name="AutorForm" component={AutorFormScreen} options={{ title: 'Gestión Autor' }} />
        <Stack.Screen name="Libro" component={LibroScreen} options={{ title: 'Libros' }} />
        <Stack.Screen name="LibroForm" component={LibroFormScreen} options={{ title: 'Gestión Libro' }} />
        <Stack.Screen name="Genero" component={GeneroScreen} options={{ title: 'Géneros' }} />
        <Stack.Screen name="GeneroForm" component={GeneroFormScreen} options={{ title: 'Gestión Género' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


