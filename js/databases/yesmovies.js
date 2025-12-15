/**
 * YesMovies Database - Películas familiares y animación
 */

const yesmovies = [
    {
        id: 'ym1',
        tmdbId: 508947,
        title: 'Turning Red',
        thumbnail: 'https://image.tmdb.org/t/p/w500/qsdjk9oAKSQMWs0Vt5Pyfh6O4GZ.jpg',
        year: 2022,
        genre: ['Animación', 'Comedia', 'Familia', 'Fantasía'],
        rating: 7.4,
        type: 'movie',
        description: 'Una niña de 13 años se convierte en un panda rojo gigante.',
        source: 'yesmovies'
    },
    {
        id: 'ym2',
        tmdbId: 585511,
        title: 'Encanto',
        thumbnail: 'https://image.tmdb.org/t/p/w500/4j0PNHkMr5ax3IA8tjtxcmPU3QT.jpg',
        year: 2021,
        genre: ['Animación', 'Comedia', 'Familia', 'Fantasía'],
        rating: 7.6,
        type: 'movie',
        description: 'La historia de una familia extraordinaria, los Madrigal.',
        source: 'yesmovies'
    },
    {
        id: 'ym3',
        tmdbId: 568124,
        title: 'Encanto',
        thumbnail: 'https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',
        year: 2021,
        genre: ['Fantasía', 'Aventura', 'Comedia'],
        rating: 7.6,
        type: 'movie',
        description: 'Una familia mágica vive en una casa encantada en Colombia.',
        source: 'yesmovies'
    },
    {
        id: 'ym4',
        tmdbId: 826510,
        title: 'Puss in Boots: The Last Wish',
        thumbnail: 'https://image.tmdb.org/t/p/w500/kuf6dutpsT0vSVehic3EZIqkOBt.jpg',
        year: 2022,
        genre: ['Animación', 'Aventura', 'Comedia', 'Familia', 'Fantasía'],
        rating: 8.2,
        type: 'movie',
        description: 'El Gato con Botas descubre que su pasión por la aventura le ha costado caro.',
        source: 'yesmovies'
    },
    {
        id: 'ym5',
        tmdbId: 315162,
        title: 'Puss in Boots: The Last Wish',
        thumbnail: 'https://image.tmdb.org/t/p/w500/kuf6dutpsT0vSVehic3EZIqkOBt.jpg',
        year: 2022,
        genre: ['Familia', 'Animación', 'Aventura', 'Comedia'],
        rating: 8.3,
        type: 'movie',
        description: 'El Gato con Botas busca el último deseo.',
        source: 'yesmovies'
    },
    {
        id: 'ym6',
        tmdbId: 438631,
        title: 'Dune',
        thumbnail: 'https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
        year: 2021,
        genre: ['Ciencia Ficción', 'Aventura'],
        rating: 7.8,
        type: 'movie',
        description: 'Paul Atreides viaja al planeta más peligroso del universo.',
        source: 'yesmovies'
    },
    {
        id: 'yms1',
        tmdbId: 71912,
        title: 'The Witcher',
        thumbnail: 'https://image.tmdb.org/t/p/w500/7vjaCdMw15FEbXyLQTVa04URsPm.jpg',
        year: 2019,
        genre: ['Ciencia Ficción', 'Fantasía', 'Drama'],
        rating: 8.0,
        type: 'series',
        description: 'Geralt de Rivia, un cazador de monstruos mutante, busca su lugar.',
        source: 'yesmovies'
    },
    {
        id: 'yms2',
        tmdbId: 85271,
        title: 'WandaVision',
        thumbnail: 'https://image.tmdb.org/t/p/w500/glKDfE6btIRcVB5zrjspRIs4r52.jpg',
        year: 2021,
        genre: ['Ciencia Ficción', 'Fantasía', 'Drama'],
        rating: 8.2,
        type: 'series',
        description: 'Wanda y Vision viven una vida suburbana idealizada.',
        source: 'yesmovies'
    },
    {
        id: 'yms3',
        tmdbId: 114410,
        title: 'Abbott Elementary',
        thumbnail: 'https://image.tmdb.org/t/p/w500/5LaJTPQgjXRw5Pb4qFfxI4Z4zNR.jpg',
        year: 2021,
        genre: ['Comedia'],
        rating: 8.0,
        type: 'series',
        description: 'Un grupo de profesores dedicados en una escuela pública de Filadelfia.',
        source: 'yesmovies'
    }
];

// Export para uso global
if (typeof window !== 'undefined') {
    window.yesmovies = yesmovies;
}
