/**
 * Movidy Database - Películas populares y series trending
 */

const movidy = [
    {
        id: 'm1',
        tmdbId: 823464,
        title: 'Godzilla x Kong: The New Empire',
        thumbnail: 'https://image.tmdb.org/t/p/w500/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg',
        year: 2024,
        genre: ['Acción', 'Ciencia Ficción', 'Aventura'],
        rating: 7.2,
        type: 'movie',
        description: 'La nueva amenaza que emerge obligará a Kong y Godzilla a unir fuerzas.',
        source: 'movidy'
    },
    {
        id: 'm2',
        tmdbId: 653346,
        title: 'Kingdom of the Planet of the Apes',
        thumbnail: 'https://image.tmdb.org/t/p/w500/gKkl37BQuKTanygYQG1pyYgLVgf.jpg',
        year: 2024,
        genre: ['Ciencia Ficción', 'Aventura', 'Acción'],
        rating: 7.1,
        type: 'movie',
        description: 'Generaciones después del reinado de César, los simios han establecido su dominio.',
        source: 'movidy'
    },
    {
        id: 'm3',
        tmdbId: 1022789,
        title: 'Inside Out 2',
        thumbnail: 'https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg',
        year: 2024,
        genre: ['Animación', 'Familia', 'Aventura', 'Comedia'],
        rating: 7.7,
        type: 'movie',
        description: 'Riley entra en la adolescencia y nuevas emociones llegan al cuartel general.',
        source: 'movidy'
    },
    {
        id: 'm4',
        tmdbId: 1011985,
        title: 'Kung Fu Panda 4',
        thumbnail: 'https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg',
        year: 2024,
        genre: ['Animación', 'Acción', 'Comedia', 'Familia'],
        rating: 7.1,
        type: 'movie',
        description: 'Po debe entrenar a un nuevo Guerrero Dragón mientras se enfrenta a una nueva amenaza.',
        source: 'movidy'
    },
    {
        id: 'm5',
        tmdbId: 558449,
        title: 'Gladiator II',
        thumbnail: 'https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg',
        year: 2024,
        genre: ['Acción', 'Aventura', 'Drama'],
        rating: 6.8,
        type: 'movie',
        description: 'Años después de presenciar la muerte del venerado héroe Máximo.',
        source: 'movidy'
    },
    {
        id: 'm6',
        tmdbId: 519182,
        title: 'Despicable Me 4',
        thumbnail: 'https://image.tmdb.org/t/p/w500/wWba3TaojhK7NdycRhoQpsG0FaH.jpg',
        year: 2024,
        genre: ['Animación', 'Familia', 'Comedia', 'Acción'],
        rating: 7.2,
        type: 'movie',
        description: 'Gru enfrenta a su enemigo más peligroso hasta ahora.',
        source: 'movidy'
    },
    {
        id: 'm7',
        tmdbId: 573435,
        title: 'Bad Boys: Ride or Die',
        thumbnail: 'https://image.tmdb.org/t/p/w500/nP6RliHjxsz4irTKsxe8FRhKZYl.jpg',
        year: 2024,
        genre: ['Acción', 'Crimen', 'Suspense', 'Comedia'],
        rating: 7.5,
        type: 'movie',
        description: 'Los detectives Mike Lowrey y Marcus Burnett vuelven a la acción.',
        source: 'movidy'
    },
    {
        id: 's1',
        tmdbId: 94997,
        title: 'House of the Dragon',
        thumbnail: 'https://image.tmdb.org/t/p/w500/7QMsOTMUswlwxJP0rTTZfmz2tX2.jpg',
        year: 2024,
        genre: ['Ciencia Ficción', 'Fantasía', 'Drama'],
        rating: 8.4,
        type: 'series',
        description: 'La historia de la Casa Targaryen 200 años antes de Game of Thrones.',
        source: 'movidy'
    },
    {
        id: 's2',
        tmdbId: 84958,
        title: 'Loki',
        thumbnail: 'https://image.tmdb.org/t/p/w500/5W0CNldahH5JOv8LxpB2GZzjosI.jpg',
        year: 2023,
        genre: ['Ciencia Ficción', 'Fantasía', 'Aventura'],
        rating: 8.2,
        type: 'series',
        description: 'Loki es llevado ante la misteriosa Autoridad de Variación Temporal.',
        source: 'movidy'
    },
    {
        id: 's3',
        tmdbId: 115036,
        title: 'The Penguin',
        thumbnail: 'https://image.tmdb.org/t/p/w500/cAZh9Mf4f1i6fEw5REvTaXlWJOp.jpg',
        year: 2024,
        genre: ['Crimen', 'Drama'],
        rating: 8.5,
        type: 'series',
        description: 'El ascenso de Oswald Cobblepot en el bajo mundo del crimen de Gotham.',
        source: 'movidy'
    }
];

// Export para uso global
if (typeof window !== 'undefined') {
    window.movidy = movidy;
}
