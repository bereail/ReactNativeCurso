const RAWG_KEY = "5374a84931854fb292ee7d110d2547ee";

export async function getLatestGames() {
  const params = new URLSearchParams({
    dates: "2024-01-01,2025-12-31",
    ordering: "-released",
    page_size: "24",
    key: RAWG_KEY,
  });

  const res = await fetch(`https://api.rawg.io/api/games?${params.toString()}`);
  if (!res.ok) throw new Error(`RAWG HTTP ${res.status}: ${await res.text()}`);

  const data = await res.json();

  return (data?.results ?? []).map((g) => ({
    id: g.id,
    slug: g.slug,
    name: g.name,
    image: g.background_image || "https://placehold.co/300x400?text=No+Image",
    released: g.released ?? "—",
    score: g.metacritic ?? null,   // “metascore”
    rating: g.rating ?? null,      // rating promedio RAWG
  }));
}

// Si querés mostrar descripción en una pantalla de detalle:
export async function getGameDetails(slug) {
  const res = await fetch(`https://api.rawg.io/api/games/${encodeURIComponent(slug)}?key=${RAWG_KEY}`);
  if (!res.ok) throw new Error(`RAWG details HTTP ${res.status}: ${await res.text()}`);
  const g = await res.json();
  return {
    id: g.id,
    slug: g.slug,
    title: g.name,
    description: g.description_raw ?? "",
    image: g.background_image || "https://placehold.co/600x400?text=No+Image",
    released: g.released ?? "—",
    score: g.metacritic ?? null,
    genres: (g.genres || []).map(x => x.name),
  };
}
