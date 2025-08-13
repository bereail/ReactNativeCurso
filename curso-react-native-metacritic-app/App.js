import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableHighlight, Button, Pressable } from 'react-native';

import icon from './assets/icon.png'; // Ajusta la ruta a tu proyecto

export default function App() {
  const handlePress = () => alert('Hola');

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Image 
        source={icon} 
        style={{ width: 100, height: 100, resizeMode: 'center' }}
      />

      <Text style={{ color: 'white', marginBottom: 12 }}>MI APP</Text>

      {/* 1) Button: botón nativo, estilo del sistema, poca personalización */}
      <Button title="Pulsa aquí (Button)" onPress={handlePress} />

      {/* Espaciador */}
      <View style={{ height: 12 }} />

      {/* 2) TouchableHighlight: envuelve un contenido y muestra underlayColor al presionar */}
      <TouchableHighlight 
        underlayColor="red"        // Color de “resaltado” al presionar
        onPress={handlePress}
        style={styles.touchableBox} // Estilo base del contenedor
      >
        {/* Podés poner cualquier contenido (texto, íconos, fila con icono+texto, etc.) */}
        <Text style={styles.touchableText}>Presióname (TouchableHighlight)</Text>
      </TouchableHighlight>

      {/* Espaciador */}
      <View style={{ height: 12 }} />

      {/* 3) Pressable: máximo control del estado de interacción y estilos dinámicos */}
      <Pressable
        onPress={handlePress}
        onPressIn={() => console.log('Press In')}
        onPressOut={() => console.log('Press Out')}
        onLongPress={() => console.log('Long Press')}
        // El style puede ser una función que recibe { pressed, hovered, focused }
        style={({ pressed }) => [
          styles.pressableBase,
          // Cambiamos opacidad y escala cuando está presionado
          { opacity: pressed ? 0.8 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] }
        ]}
        android_ripple={{ color: '#ffffff22', borderless: false }} // Ripple en Android (opcional)
        accessibilityRole="button"
      >
        <Text style={styles.pressableText}>Presióname (Pressable)</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  touchableBox: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  touchableText: {
    color: '#111',
    fontWeight: '600',
  },
  pressableBase: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: '#8B5CF6', // violeta
    borderRadius: 10,
    // Sombras suaves (iOS) y elevación (Android)
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  pressableText: {
    color: 'white',
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
