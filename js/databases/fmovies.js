/**
 * FMovies Database - Películas de acción y thrillers
 */

const fmovies = [
    {
        id: 'fm1',
        tmdbId: 385687,
        title: 'Fast X',
        thumbnail: 'https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg',
        year: 2023,
        genre: ['Acción', 'Crimen', 'Suspense'],
        rating: 7.2,
        type: 'movie',
        description: 'Dom Toretto y su familia se enfrentan a su enemigo más letal.',
        source: 'fmovies'
    },
    {
        id: 'fm2',
        tmdbId: 298618,
        title: 'The Flash',
        thumbnail: 'https://image.tmdb.org/t/p/w500/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg',
        year: 2023,
        genre: ['Acción', 'Aventura', 'Ciencia Ficción'],
        rating: 6.9,
        type: 'movie',
        description: 'Barry Allen viaja en el tiempo para evitar el asesinato de su madre.',
        source: 'fmovies'
    },
    {
        id: 'fm3',
        tmdbId: 667538,
        title: 'Transformers: Rise of the Beasts',
        thumbnail: 'https://image.tmdb.org/t/p/w500/gPbM0MK8CP8A174rmUwGsADNYKD.jpg',
        year: 2023,
        genre: ['Acción', 'Aventura', 'Ciencia Ficción'],
        rating: 7.4,
        type: 'movie',
        description: 'Optimus Prime y los Autobots se enfrentan a una nueva amenaza.',
        source: 'fmovies'
    },
    {
        id: 'fm4',
        tmdbId: 575264,
        title: 'Mission: Impossible - Dead Reckoning Part One',
        thumbnail: 'https://image.tmdb.org/t/p/w500/NNxYkU70HPurnNCSiCjYAmacwm.jpg',
        year: 2023,
        genre: ['Acción', 'Suspense'],
        rating: 7.7,
        type: 'movie',
        description: 'Ethan Hunt se enfrenta a la amenaza más peligrosa de su carrera.',
        source: 'fmovies'
    },
    {
        id: 'fm5',
        tmdbId: 739405,
        title: 'Wonka',
        thumbnail: 'https://image.tmdb.org/t/p/w500/qhb1qOilapbapxWQn9jtRCMwXJF.jpg',
        year: 2023,
        genre: ['Comedia', 'Familia', 'Fantasía'],
        rating: 7.2,
        type: 'movie',
        description: 'La historia de cómo Willy Wonka se convirtió en el chocolatero más famoso.',
        source: 'fmovies'
    },
    {
        id: 'fm6',
        tmdbId: 980489,
        title: 'Gran Turismo',
        thumbnail: 'https://image.tmdb.org/t/p/w500/51tqzRtKMMZEYUpSYkrUE7v9ehm.jpg',
        year: 2023,
        genre: ['Acción', 'Drama', 'Aventura'],
        rating: 7.9,
        type: 'movie',
        description: 'Un adolescente gamer se convierte en un piloto profesional de carreras.',
        source: 'fmovies'
    },
    {
        id: 'fms1',
        tmdbId: 1399,
        title: 'Game of Thrones',
        thumbnail: 'https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg',
        year: 2011,
        genre: ['Ciencia Ficción', 'Fantasía', 'Drama'],
        rating: 8.3,
        type: 'series',
        description: 'Nueve familias nobles luchan por el control del Trono de Hierro.',
        source: 'fmovies'
    },
    {
        id: 'fms2',
        tmdbId: 1418,
        title: 'The Big Bang Theory',
        thumbnail: 'https://image.tmdb.org/t/p/w500/ooBGRQBdbGzBxAVfExiO8r7kloA.jpg',
        year: 2007,
        genre: ['Comedia'],
        rating: 8.0,
        type: 'series',
        description: 'Las vidas de cuatro científicos socialmente ineptos.',
        source: 'fmovies'
    }
];

// Export para uso global
if (typeof window !== 'undefined') {
    window.fmovies = fmovies;
}
