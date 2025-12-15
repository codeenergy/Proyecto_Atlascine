/**
 * Primewire Database - Series de TV y dramas
 */

const primewire = [
    {
        id: 'pw1',
        tmdbId: 496243,
        title: 'Parasite',
        thumbnail: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
        year: 2019,
        genre: ['Comedia', 'Suspense', 'Drama'],
        rating: 8.5,
        type: 'movie',
        description: 'Una familia pobre se infiltra en la casa de una familia rica.',
        source: 'primewire'
    },
    {
        id: 'pw2',
        tmdbId: 634649,
        title: 'Spider-Man: No Way Home',
        thumbnail: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
        year: 2021,
        genre: ['Acción', 'Aventura', 'Ciencia Ficción'],
        rating: 8.0,
        type: 'movie',
        description: 'Peter Parker pide ayuda al Doctor Strange para recuperar su vida.',
        source: 'primewire'
    },
    {
        id: 'pw3',
        tmdbId: 414906,
        title: 'The Batman',
        thumbnail: 'https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg',
        year: 2022,
        genre: ['Crimen', 'Misterio', 'Suspense'],
        rating: 7.8,
        type: 'movie',
        description: 'Batman se enfrenta al Acertijo en Gotham City.',
        source: 'primewire'
    },
    {
        id: 'pw4',
        tmdbId: 505642,
        title: 'Black Panther: Wakanda Forever',
        thumbnail: 'https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg',
        year: 2022,
        genre: ['Acción', 'Aventura', 'Ciencia Ficción'],
        rating: 7.2,
        type: 'movie',
        description: 'Wakanda lucha por proteger su nación tras la muerte del Rey TChalla.',
        source: 'primewire'
    },
    {
        id: 'pws1',
        tmdbId: 1434,
        title: 'Family Guy',
        thumbnail: 'https://image.tmdb.org/t/p/w500/y0HUz4eUNUe3TeEd8fQWYazPaC7.jpg',
        year: 1999,
        genre: ['Animación', 'Comedia'],
        rating: 7.3,
        type: 'series',
        description: 'Las desventuras de la familia Griffin en Quahog.',
        source: 'primewire'
    },
    {
        id: 'pws2',
        tmdbId: 1668,
        title: 'Friends',
        thumbnail: 'https://image.tmdb.org/t/p/w500/f496cm9enuEsZkSPzCwnTESEK5s.jpg',
        year: 1994,
        genre: ['Comedia'],
        rating: 8.4,
        type: 'series',
        description: 'Seis amigos navegan por la vida y el amor en Nueva York.',
        source: 'primewire'
    },
    {
        id: 'pws3',
        tmdbId: 100088,
        title: 'The Last of Us',
        thumbnail: 'https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg',
        year: 2023,
        genre: ['Ciencia Ficción', 'Drama', 'Acción'],
        rating: 8.8,
        type: 'series',
        description: 'Joel y Ellie atraviesan Estados Unidos devastado por una infección fúngica.',
        source: 'primewire'
    },
    {
        id: 'pws4',
        tmdbId: 2316,
        title: 'The Office',
        thumbnail: 'https://image.tmdb.org/t/p/w500/7DJKHzAi83BmQrWLrYYOqcoKfhR.jpg',
        year: 2005,
        genre: ['Comedia'],
        rating: 8.6,
        type: 'series',
        description: 'La vida diaria de los empleados de Dunder Mifflin Paper Company.',
        source: 'primewire'
    }
];

// Export para uso global
if (typeof window !== 'undefined') {
    window.primewire = primewire;
}
