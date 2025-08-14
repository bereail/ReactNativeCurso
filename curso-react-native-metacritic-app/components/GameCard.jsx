import React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';

export default function GameCard({ game }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: game.image }} style={styles.cover} resizeMode="cover" />
      <Text style={styles.name} numberOfLines={1}>{game.name}</Text>
      <Text style={styles.meta}>
        {game.released ?? '—'}{game.score ? `  ·  Metascore: ${game.score}` : ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 200, backgroundColor: '#1c1c1c', borderRadius: 12, padding: 10,
    marginBottom: 16, alignItems: 'center', elevation: 3,
    ...(Platform.OS === 'web'
      ? { boxShadow: '0px 2px 6px rgba(0,0,0,0.25)' }
      : { shadowColor: '#000', shadowOpacity: 0.25, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4 }),
  },
  cover: { width: '100%', height: 200, borderRadius: 10, marginBottom: 8 },
  name: { color: '#fff', fontWeight: '700', fontSize: 16 },
  meta: { color: '#cfcfcf', fontSize: 12, marginTop: 2 },
});
