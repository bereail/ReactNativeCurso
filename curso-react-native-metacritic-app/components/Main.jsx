import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Text, FlatList } from "react-native";
import GameCard from "./GameCard";
import { getLatestGames } from "../lib/metacritic";

export default function Main() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const list = await getLatestGames();
        setGames(list);
      } catch (e) {
        console.error(e);
        setError("No pudimos cargar los juegos.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={{ color: "#fff", marginTop: 8 }}>Cargando…</Text>
      </View>
    );
  }

  if (error) return <Text style={{ color: "tomato" }}>{error}</Text>;

  return (
    <FlatList
      data={games}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => <GameCard game={item} />}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingVertical: 16, alignItems: "center", gap: 12 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
});
