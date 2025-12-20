/**
 * AtlasCine - Base de Datos Local
 * Datos de respaldo cuando Firebase no está disponible
 */

window.database = [
    // PELÍCULAS POPULARES
    {
        id: "movie-1",
        title: "Avatar: El Camino del Agua",
        type: "movie",
        year: 2022,
        rating: 92,
        language: "Inglés",
        region: "US",
        genres: ["Acción", "Aventura", "Ciencia Ficción"],
        poster: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
        description: "Jake Sully y Ney'tiri han formado una familia y hacen todo lo posible por permanecer juntos. Sin embargo, deben abandonar su hogar y explorar las diferentes regiones de Pandora cuando una antigua amenaza reaparece.",
        servers: ["https://vidsrc.to/embed/movie/76600"]
    },
    {
        id: "movie-2",
        title: "Oppenheimer",
        type: "movie",
        year: 2023,
        rating: 95,
        language: "Inglés",
        region: "US",
        genres: ["Drama", "Historia", "Thriller"],
        poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        description: "La historia del físico J. Robert Oppenheimer y su papel en el desarrollo de la bomba atómica.",
        servers: ["https://vidsrc.to/embed/movie/872585"]
    },
    {
        id: "movie-3",
        title: "Barbie",
        type: "movie",
        year: 2023,
        rating: 88,
        language: "Inglés",
        region: "US",
        genres: ["Comedia", "Aventura", "Fantasía"],
        poster: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
        description: "Barbie vive en Barbieland donde todo es ideal y lleno de música y color. Un buen día decide conocer el mundo real.",
        servers: ["https://vidsrc.to/embed/movie/346698"]
    },
    {
        id: "movie-4",
        title: "John Wick 4",
        type: "movie",
        year: 2023,
        rating: 90,
        language: "Inglés",
        region: "US",
        genres: ["Acción", "Thriller", "Crimen"],
        poster: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
        description: "John Wick descubre un camino para derrotar a la Mesa Alta. Pero para poder ganar su libertad, deberá enfrentarse a un nuevo enemigo.",
        servers: ["https://vidsrc.to/embed/movie/603692"]
    },
    {
        id: "movie-5",
        title: "Guardianes de la Galaxia Vol. 3",
        type: "movie",
        year: 2023,
        rating: 89,
        language: "Inglés",
        region: "US",
        genres: ["Acción", "Aventura", "Comedia"],
        poster: "https://image.tmdb.org/t/p/w500/5YZbUmjbMa3ClvSW1Wj3D6XGolb.jpg",
        description: "Peter Quill todavía está recuperándose de la pérdida de Gamora y debe reunir a su equipo para defender el universo.",
        servers: ["https://vidsrc.to/embed/movie/447365"]
    },

    // SERIES POPULARES
    {
        id: "series-1",
        title: "The Last of Us",
        type: "series",
        year: 2023,
        rating: 94,
        language: "Inglés",
        region: "US",
        genres: ["Drama", "Ciencia Ficción", "Thriller"],
        poster: "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
        description: "20 años después de la destrucción de la civilización moderna, Joel debe sacar de contrabando a Ellie de una zona de cuarentena opresiva.",
        servers: ["https://vidsrc.to/embed/tv/100088"]
    },
    {
        id: "series-2",
        title: "Miércoles",
        type: "series",
        year: 2022,
        rating: 91,
        language: "Inglés",
        region: "US",
        genres: ["Comedia", "Crimen", "Misterio"],
        poster: "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
        description: "Miércoles Addams intenta dominar su habilidad psíquica, frustrar una monstruosa ola de asesinatos y resolver el misterio sobrenatural que envolvió a sus padres.",
        servers: ["https://vidsrc.to/embed/tv/119051"]
    },
    {
        id: "series-3",
        title: "Stranger Things",
        type: "series",
        year: 2016,
        rating: 93,
        language: "Inglés",
        region: "US",
        genres: ["Ciencia Ficción", "Drama", "Misterio"],
        poster: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
        description: "Cuando un niño desaparece, su madre, un jefe de policía y sus amigos deben enfrentarse a fuerzas terroríficas para recuperarlo.",
        servers: ["https://vidsrc.to/embed/tv/66732"]
    },
    {
        id: "series-4",
        title: "Breaking Bad",
        type: "series",
        year: 2008,
        rating: 96,
        language: "Inglés",
        region: "US",
        genres: ["Drama", "Crimen", "Thriller"],
        poster: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
        description: "Un profesor de química se convierte en fabricante de metanfetaminas para asegurar el futuro de su familia.",
        servers: ["https://vidsrc.to/embed/tv/1396"]
    },
    {
        id: "series-5",
        title: "The Mandalorian",
        type: "series",
        year: 2019,
        rating: 92,
        language: "Inglés",
        region: "US",
        genres: ["Ciencia Ficción", "Acción", "Aventura"],
        poster: "https://image.tmdb.org/t/p/w500/eU1i6eHXlzMOlEq0ku1Rzq7Y4wA.jpg",
        description: "Las aventuras de un pistolero solitario en los confines de la galaxia, lejos de la autoridad de la Nueva República.",
        servers: ["https://vidsrc.to/embed/tv/82856"]
    },

    // ANIME POPULAR
    {
        id: "anime-1",
        title: "Jujutsu Kaisen",
        type: "anime",
        year: 2020,
        rating: 94,
        language: "Japonés",
        region: "Asia",
        genres: ["Acción", "Fantasía", "Sobrenatural"],
        poster: "https://image.tmdb.org/t/p/w500/6oyIRkgHYpvXa08LwDf9zz0j8Cw.jpg",
        description: "Un estudiante se convierte en el anfitrión de un espíritu maligno y debe aprender a controlarlo mientras se enfrenta a maldiciones mortales.",
        servers: ["https://vidsrc.to/embed/tv/95479"]
    },
    {
        id: "anime-2",
        title: "Attack on Titan",
        type: "anime",
        year: 2013,
        rating: 95,
        language: "Japonés",
        region: "Asia",
        genres: ["Acción", "Drama", "Fantasía"],
        poster: "https://image.tmdb.org/t/p/w500/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg",
        description: "Hace muchos años, la humanidad fue reducida casi a la extinción por los titanes, criaturas gigantes que devoran a los humanos.",
        servers: ["https://vidsrc.to/embed/tv/1429"]
    },
    {
        id: "anime-3",
        title: "Demon Slayer",
        type: "anime",
        year: 2019,
        rating: 93,
        language: "Japonés",
        region: "Asia",
        genres: ["Acción", "Aventura", "Fantasía"],
        poster: "https://image.tmdb.org/t/p/w500/xUfRZu2mi8jH6SzQEJGP6tjBuYj.jpg",
        description: "Un joven se convierte en cazador de demonios después de que su familia fuera masacrada y su hermana convertida en demonio.",
        servers: ["https://vidsrc.to/embed/tv/85937"]
    },
    {
        id: "anime-4",
        title: "One Piece",
        type: "anime",
        year: 1999,
        rating: 92,
        language: "Japonés",
        region: "Asia",
        genres: ["Acción", "Aventura", "Comedia"],
        poster: "https://image.tmdb.org/t/p/w500/cMD9Ygz11zjJzAovURpO75Qg7rT.jpg",
        description: "Monkey D. Luffy sueña con convertirse en el Rey de los Piratas y encontrar el legendario tesoro One Piece.",
        servers: ["https://vidsrc.to/embed/tv/37854"]
    },
    {
        id: "anime-5",
        title: "My Hero Academia",
        type: "anime",
        year: 2016,
        rating: 91,
        language: "Japonés",
        region: "Asia",
        genres: ["Acción", "Aventura", "Comedia"],
        poster: "https://image.tmdb.org/t/p/w500/fPmjlZwnURN0SRuEHaAvadxQ75m.jpg",
        description: "En un mundo donde la mayoría de las personas tienen superpoderes, un niño sin poderes sueña con convertirse en un superhéroe.",
        servers: ["https://vidsrc.to/embed/tv/65930"]
    },

    // K-DRAMAS
    {
        id: "kdrama-1",
        title: "El Juego del Calamar",
        type: "series",
        year: 2021,
        rating: 94,
        language: "Coreano",
        region: "Asia",
        genres: ["Drama", "Thriller", "Misterio"],
        poster: "https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",
        description: "Cientos de personas sin dinero aceptan una extraña invitación para competir en juegos infantiles. Les espera un premio tentador, pero las apuestas son mortales.",
        servers: ["https://vidsrc.to/embed/tv/93405"]
    },
    {
        id: "kdrama-2",
        title: "Estamos Muertos",
        type: "series",
        year: 2022,
        rating: 89,
        language: "Coreano",
        region: "Asia",
        genres: ["Acción", "Horror", "Thriller"],
        poster: "https://image.tmdb.org/t/p/w500/pTEhk24qgJrFKvDukgVJiXD8dL9.jpg",
        description: "Cuando un brote de zombis golpea su escuela, un grupo de estudiantes debe luchar por sobrevivir mientras buscan a sus seres queridos.",
        servers: ["https://vidsrc.to/embed/tv/118749"]
    },
    {
        id: "kdrama-3",
        title: "Business Proposal",
        type: "series",
        year: 2022,
        rating: 88,
        language: "Coreano",
        region: "Asia",
        genres: ["Comedia", "Romance", "Drama"],
        poster: "https://image.tmdb.org/t/p/w500/reyvwZRXoPo1YhxxROfaCwTgWeB.jpg",
        description: "Una empleada va a una cita a ciegas en lugar de su amiga, sin saber que la cita es con el CEO de su empresa.",
        servers: ["https://vidsrc.to/embed/tv/143386"]
    }
];

console.log('%c📦 Base de Datos Local Cargada', 'color: #46d369; font-weight: bold;');
console.log(`✅ ${window.database.length} contenidos disponibles`);
