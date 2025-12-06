// Pelisflix20.cafe Database - Additional Content & Streaming Originals
// Source: pelisflix20.cafe

const pelisflixContent = [
    // NETFLIX ORIGINALS
    {id: 131, tmdbId: "71912", title: "The Witcher", thumbnail: "https://image.tmdb.org/t/p/original/7vjaCdMw15FEbXyLQTVa04URsPm.jpg", year: 2019, genre: ["Fantasy", "Adventure"], rating: 89, description: "Geralt de Rivia caza monstruos en un mundo de magia.", region: "US", country: "Estados Unidos", type: "series", producer: "Netflix", source: "pelisflix"},
    {id: 132, tmdbId: "92782", title: "Squid Game", thumbnail: "https://image.tmdb.org/t/p/original/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg", year: 2021, genre: ["Thriller", "Drama"], rating: 97, description: "Personas desesperadas compiten en juegos mortales.", region: "Asia", country: "Corea del Sur", type: "series", producer: "Netflix", language: "Coreano", source: "pelisflix"},
    {id: 144, tmdbId: "94605", title: "Arcane", thumbnail: "https://image.tmdb.org/t/p/original/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg", year: 2021, genre: ["Animation", "Action"], rating: 98, description: "Dos hermanas en ciudades rivales.", region: "France", country: "Francia", type: "series", producer: "Netflix", source: "pelisflix"},

    // AMAZON PRIME ORIGINALS
    {id: 134, tmdbId: "84958", title: "The Boys", thumbnail: "https://image.tmdb.org/t/p/original/stTEycfG9928HYGEISBFaG1ngjM.jpg", year: 2019, genre: ["Action", "Comedy"], rating: 92, description: "Vigilantes enfrentan a superhéroes corruptos.", region: "US", country: "Estados Unidos", type: "series", producer: "Amazon", source: "pelisflix"},
    {id: 135, tmdbId: "84773", title: "The Lord of the Rings: The Rings of Power", thumbnail: "https://image.tmdb.org/t/p/original/mYLOqiStMxDK3fYZFirgrMt8z5d.jpg", year: 2022, genre: ["Fantasy", "Adventure"], rating: 88, description: "Eventos épicos en la Segunda Edad de la Tierra Media.", region: "US", country: "Estados Unidos", type: "series", producer: "Amazon", source: "pelisflix"},
    {id: 136, tmdbId: "60625", title: "The Marvelous Mrs. Maisel", thumbnail: "https://image.tmdb.org/t/p/original/zS7fQiOZiKCVH2vlYSiIsFWW8hh.jpg", year: 2017, genre: ["Comedy", "Drama"], rating: 90, description: "Una ama de casa descubre su talento para el stand-up.", region: "US", country: "Estados Unidos", type: "series", producer: "Amazon", source: "pelisflix"},
    {id: 137, tmdbId: "76479", title: "The Wheel of Time", thumbnail: "https://image.tmdb.org/t/p/original/mpgDeLhl8HbhI03XLB7iKO6M6JE.jpg", year: 2021, genre: ["Fantasy", "Adventure"], rating: 85, description: "Una mujer poderosa busca al Dragón Renacido.", region: "US", country: "Estados Unidos", type: "series", producer: "Amazon", source: "pelisflix"},

    // DISNEY+ ORIGINALS
    {id: 139, tmdbId: "85271", title: "WandaVision", thumbnail: "https://image.tmdb.org/t/p/original/glKDfE6btIRcVB5zrjspRIs4r52.jpg", year: 2021, genre: ["Sci-Fi", "Drama"], rating: 91, description: "Wanda y Vision viven en una realidad suburbana.", region: "US", country: "Estados Unidos", type: "series", producer: "Disney", source: "pelisflix"},
    {id: 140, tmdbId: "84958", title: "Loki", thumbnail: "https://image.tmdb.org/t/p/original/kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg", year: 2021, genre: ["Sci-Fi", "Adventure"], rating: 93, description: "Loki altera la línea temporal después de Endgame.", region: "US", country: "Estados Unidos", type: "series", producer: "Disney", source: "pelisflix"},
    {id: 141, tmdbId: "114695", title: "Ahsoka", thumbnail: "https://image.tmdb.org/t/p/original/laCJxobHoPVaLQTKxc14Y2zV64J.jpg", year: 2023, genre: ["Sci-Fi", "Adventure"], rating: 89, description: "Ahsoka investiga una amenaza emergente.", region: "US", country: "Estados Unidos", type: "series", producer: "Disney", source: "pelisflix"},

    // HBO MAX ORIGINALS
    {id: 133, tmdbId: "100088", title: "The Last of Us", thumbnail: "https://image.tmdb.org/t/p/original/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg", year: 2023, genre: ["Drama", "Sci-Fi"], rating: 95, description: "Un contrabandista protege a una niña en un mundo post-apocalíptico.", region: "US", country: "Estados Unidos", type: "series", producer: "HBO", source: "pelisflix"},
    {id: 143, tmdbId: "60059", title: "Better Call Saul", thumbnail: "https://image.tmdb.org/t/p/original/fC2HDm5t0kHl7mTm7jxMR31b7by.jpg", year: 2015, genre: ["Drama", "Crime"], rating: 97, description: "La transformación de Jimmy McGill en Saul Goodman.", region: "US", country: "Estados Unidos", type: "series", producer: "HBO", source: "pelisflix"},

    // HULU ORIGINALS
    {id: 146, tmdbId: "79008", title: "The Handmaid's Tale", thumbnail: "https://image.tmdb.org/t/p/original/tFTJ3YbOor3BtabI96QehXxEBii.jpg", year: 2017, genre: ["Drama", "Sci-Fi"], rating: 92, description: "Una distopía totalitaria donde las mujeres son esclavas.", region: "US", country: "Estados Unidos", type: "series", producer: "Hulu", source: "pelisflix"},
    {id: 147, tmdbId: "85552", title: "Only Murders in the Building", thumbnail: "https://image.tmdb.org/t/p/original/yhx6PnU3L2a6FnEFGOlBKTZ8TSD.jpg", year: 2021, genre: ["Comedy", "Mystery"], rating: 90, description: "Tres vecinos investigan un asesinato en su edificio.", region: "US", country: "Estados Unidos", type: "series", producer: "Hulu", source: "pelisflix"},

    // FOX/STAR+ CONTENT
    {id: 148, tmdbId: "1668", title: "The Simpsons", thumbnail: "https://image.tmdb.org/t/p/original/vHqeLzYl3dEAutojCO26g0LIkom.jpg", year: 1989, genre: ["Comedy", "Animation"], rating: 95, description: "La familia amarilla más famosa de la TV.", region: "US", country: "Estados Unidos", type: "series", producer: "Fox", source: "pelisflix"},
    {id: 149, tmdbId: "1434", title: "Family Guy", thumbnail: "https://image.tmdb.org/t/p/original/y0HUz4eUNUe3TeEd8fQWYazPaC7.jpg", year: 1999, genre: ["Comedy", "Animation"], rating: 88, description: "Las aventuras de la familia Griffin.", region: "US", country: "Estados Unidos", type: "series", producer: "Fox", source: "pelisflix"},

    // ADDITIONAL MOVIES
    {id: 120, tmdbId: "399566", title: "Godzilla vs. Kong", thumbnail: "https://image.tmdb.org/t/p/original/pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg", year: 2021, genre: ["Action", "Sci-Fi"], rating: 85, description: "Dos titanes chocan en una batalla épica.", region: "US", country: "Estados Unidos", type: "movie", source: "pelisflix"},
    {id: 121, tmdbId: "447365", title: "Guardians of the Galaxy Vol. 3", thumbnail: "https://image.tmdb.org/t/p/original/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg", year: 2023, genre: ["Action", "Adventure"], rating: 90, description: "Los Guardianes se embarcan en su última misión.", region: "US", country: "Estados Unidos", type: "movie", producer: "Disney", source: "pelisflix"},
    {id: 122, tmdbId: "332562", title: "A Star is Born", thumbnail: "https://image.tmdb.org/t/p/original/wrFpXMNBRj2PBiN4Z5kix51XaIZ.jpg", year: 2018, genre: ["Drama", "Romance"], rating: 89, description: "Un músico ayuda a una joven a alcanzar la fama.", region: "US", country: "Estados Unidos", type: "movie", source: "pelisflix"},
    {id: 123, tmdbId: "615656", title: "Meg 2: The Trench", thumbnail: "https://image.tmdb.org/t/p/original/4m1Au3YkjqsxF8iwQy0fPYSxE0h.jpg", year: 2023, genre: ["Action", "Horror"], rating: 78, description: "Exploradores enfrentan megalodones prehistóricos.", region: "US", country: "Estados Unidos", type: "movie", source: "pelisflix"},
    {id: 124, tmdbId: "567604", title: "Once Upon a Time in Hollywood", thumbnail: "https://image.tmdb.org/t/p/original/8j58iEBw9pOXFD2L0nt0ZXeHviB.jpg", year: 2019, genre: ["Drama", "Comedy"], rating: 88, description: "Un actor y su doble navegan Hollywood en 1969.", region: "US", country: "Estados Unidos", type: "movie", source: "pelisflix"},
    {id: 125, tmdbId: "438631", title: "Dune", thumbnail: "https://image.tmdb.org/t/p/original/d5NXSklXo0qyIYkgV94XAgMIckC.jpg", year: 2021, genre: ["Sci-Fi", "Adventure"], rating: 95, description: "Paul Atreides debe viajar al planeta más peligroso.", region: "US", country: "Estados Unidos", type: "movie", source: "pelisflix"}
];

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = pelisflixContent;
}
