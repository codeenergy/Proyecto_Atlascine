/**
 * Soap2Day Database - Películas clásicas y series populares
 */

const soap2day = [
    {
        id: 's2d1',
        tmdbId: 603692,
        title: 'John Wick: Chapter 4',
        thumbnail: 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
        year: 2023,
        genre: ['Acción', 'Suspense', 'Crimen'],
        rating: 7.8,
        type: 'movie',
        description: 'John Wick descubre un camino para derrotar a la Mesa Alta.',
        source: 'soap2day'
    },
    {
        id: 's2d2',
        tmdbId: 298618,
        title: 'The Flash',
        thumbnail: 'https://image.tmdb.org/t/p/w500/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg',
        year: 2023,
        genre: ['Acción', 'Aventura', 'Ciencia Ficción'],
        rating: 6.9,
        type: 'movie',
        description: 'Barry Allen usa sus superpoderes para viajar en el tiempo.',
        source: 'soap2day'
    },
    {
        id: 's2d3',
        tmdbId: 447365,
        title: 'Guardians of the Galaxy Vol. 3',
        thumbnail: 'https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg',
        year: 2023,
        genre: ['Ciencia Ficción', 'Aventura', 'Acción'],
        rating: 8.0,
        type: 'movie',
        description: 'Los Guardianes emprenden una misión para proteger a uno de los suyos.',
        source: 'soap2day'
    },
    {
        id: 's2d4',
        tmdbId: 569094,
        title: 'Spider-Man: Across the Spider-Verse',
        thumbnail: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
        year: 2023,
        genre: ['Animación', 'Acción', 'Aventura'],
        rating: 8.4,
        type: 'movie',
        description: 'Miles Morales se une a Gwen Stacy en una aventura por el multiverso.',
        source: 'soap2day'
    },
    {
        id: 's2d5',
        tmdbId: 76600,
        title: 'Avatar: The Way of Water',
        thumbnail: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
        year: 2022,
        genre: ['Ciencia Ficción', 'Aventura', 'Acción'],
        rating: 7.6,
        type: 'movie',
        description: 'Jake Sully y Neytiri han formado una familia en Pandora.',
        source: 'soap2day'
    },
    {
        id: 's2d6',
        tmdbId: 502356,
        title: 'The Super Mario Bros. Movie',
        thumbnail: 'https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg',
        year: 2023,
        genre: ['Animación', 'Aventura', 'Familia', 'Fantasía', 'Comedia'],
        rating: 7.7,
        type: 'movie',
        description: 'Mario y Luigi se embarcan en una aventura para salvar el Reino Champiñón.',
        source: 'soap2day'
    },
    {
        id: 's2ds1',
        tmdbId: 60625,
        title: 'Rick and Morty',
        thumbnail: 'https://image.tmdb.org/t/p/w500/gdIrmf2DdY5mgN6ycVP0XlzKzbE.jpg',
        year: 2013,
        genre: ['Animación', 'Comedia', 'Ciencia Ficción'],
        rating: 8.7,
        type: 'series',
        description: 'Las aventuras de un científico alcohólico y su nieto fácilmente influenciable.',
        source: 'soap2day'
    },
    {
        id: 's2ds2',
        tmdbId: 1396,
        title: 'Breaking Bad',
        thumbnail: 'https://image.tmdb.org/t/p/w500/3xnWaLQjelJDDF7LT1WBo6f4BRe.jpg',
        year: 2008,
        genre: ['Drama', 'Crimen'],
        rating: 8.9,
        type: 'series',
        description: 'Un profesor de química se convierte en fabricante de metanfetaminas.',
        source: 'soap2day'
    },
    {
        id: 's2ds3',
        tmdbId: 82856,
        title: 'The Mandalorian',
        thumbnail: 'https://image.tmdb.org/t/p/w500/eU1i6eHXlzMOlEq0ku1Rzq7Y4wA.jpg',
        year: 2019,
        genre: ['Ciencia Ficción', 'Acción', 'Aventura'],
        rating: 8.4,
        type: 'series',
        description: 'Las aventuras de un cazarrecompensas solitario en los confines de la galaxia.',
        source: 'soap2day'
    }
];

// Export para uso global
if (typeof window !== 'undefined') {
    window.soap2day = soap2day;
}
