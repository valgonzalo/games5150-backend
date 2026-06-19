import bcrypt from 'bcrypt';
import sequelize from './db.js';
import { User, Genre, Game } from '../models/index.js';

const seed = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true }); // Updates table schema

    // Users
    const hashedPassword = await bcrypt.hash('Admin1234!', 12);
    const userPassword = await bcrypt.hash('User1234!', 12);

    await User.findOrCreate({
      where: { email: 'admin@gamecat.com' },
      defaults: {
        name: 'Administrador',
        password: hashedPassword,
        role: 'admin',
        email_verified: true
      }
    });

    await User.findOrCreate({
      where: { email: 'user@gamecat.com' },
      defaults: {
        name: 'Usuario Test',
        password: userPassword,
        role: 'user',
        email_verified: true
      }
    });

    // Genres
    const genresData = [
      { name: 'RPG', description: 'Juegos de rol' },
      { name: 'FPS', description: 'First Person Shooters' },
      { name: 'Strategy', description: 'Juegos de estrategia' },
      { name: 'Platformer', description: 'Juegos de plataformas' },
      { name: 'Horror', description: 'Juegos de terror' },
      { name: 'Acción', description: 'Juegos de acción y aventura' }
    ];

    for (const g of genresData) {
      await Genre.findOrCreate({ where: { name: g.name }, defaults: g });
    }

    const rpg = await Genre.findOne({ where: { name: 'RPG' } });
    const fps = await Genre.findOne({ where: { name: 'FPS' } });
    const strategy = await Genre.findOne({ where: { name: 'Strategy' } });
    const platformer = await Genre.findOne({ where: { name: 'Platformer' } });
    const horror = await Genre.findOne({ where: { name: 'Horror' } });
    const action = await Genre.findOne({ where: { name: 'Acción' } });

    // PC Requirements Helpers
    const req = {
      witcher3: {
        min: "SO: 64-bit Windows 7, 64-bit Windows 8 (8.1) o 64-bit Windows 10\nProcesador: Intel CPU Core i5-2500K 3.3GHz / AMD CPU Phenom II X4 940\nMemoria: 6 GB de RAM\nGráficos: Nvidia GPU GeForce GTX 660 / AMD GPU Radeon HD 7870\nAlmacenamiento: 35 GB de espacio",
        rec: "SO: 64-bit Windows 10\nProcesador: Intel CPU Core i7 3770 3.4 GHz / AMD CPU AMD FX-8350 4 GHz\nMemoria: 8 GB de RAM\nGráficos: Nvidia GPU GeForce GTX 770 / AMD GPU Radeon R9 290\nAlmacenamiento: 35 GB de espacio"
      },
      skyrim: {
        min: "SO: Windows 7/8.1/10 (64-bit)\nProcesador: Intel i5-750/AMD Phenom II X4-945\nMemoria: 8 GB de RAM\nGráficos: NVIDIA GTX 470 1GB /AMD HD 7870 2GB\nAlmacenamiento: 12 GB de espacio libre",
        rec: "SO: Windows 7/8.1/10 (64-bit)\nProcesador: Intel i5-2400/AMD FX-8320\nMemoria: 8 GB de RAM\nGráficos: NVIDIA GTX 780 3GB /AMD R9 290 4GB\nAlmacenamiento: 12 GB de espacio libre"
      },
      doom: {
        min: "SO: 64-bit Windows 10\nProcesador: Intel Core i5 @ 3.3 GHz o mejor, o AMD Ryzen 3 @ 3.1 GHz o mejor\nMemoria: 8 GB de RAM\nGráficos: NVIDIA GeForce 1050Ti (4GB) / AMD Radeon R9 280 (3GB)\nAlmacenamiento: 80 GB de espacio",
        rec: "SO: 64-bit Windows 10\nProcesador: Intel Core i7-6700K o mejor, o AMD Ryzen 7 1800X o mejor\nMemoria: 8 GB de RAM\nGráficos: NVIDIA GeForce GTX 1080 (8GB) / AMD Radeon RX Vega56 (8GB)\nAlmacenamiento: 80 GB de espacio"
      },
      cyberpunk: {
        min: "SO: 64-bit Windows 10\nProcesador: Core i7-6700 o Ryzen 5 1600\nMemoria: 12 GB de RAM\nGráficos: GeForce GTX 1060 6GB / Radeon RX 580 8GB\nAlmacenamiento: 70 GB de espacio (SSD Recomendado)",
        rec: "SO: 64-bit Windows 10\nProcesador: Core i7-12700 o Ryzen 7 7800X3D\nMemoria: 16 GB de RAM\nGráficos: GeForce RTX 2060 SUPER o Radeon RX 5700 XT\nAlmacenamiento: 70 GB de espacio SSD"
      },
      rdr2: {
        min: "SO: Windows 10\nProcesador: Intel Core i5-2500K / AMD FX-6300\nMemoria: 8 GB de RAM\nGráficos: Nvidia GeForce GTX 770 2GB / AMD Radeon R9 280 3GB\nAlmacenamiento: 150 GB de espacio",
        rec: "SO: Windows 10\nProcesador: Intel Core i7-4770K / AMD Ryzen 5 1500X\nMemoria: 12 GB de RAM\nGráficos: Nvidia GeForce GTX 1060 6GB / AMD Radeon RX 480 4GB\nAlmacenamiento: 150 GB de espacio"
      },
      eldenring: {
        min: "SO: Windows 10\nProcesador: INTEL CORE I5-8400 o AMD RYZEN 3 3300X\nMemoria: 12 GB de RAM\nGráficos: NVIDIA GEFORCE GTX 1060 3 GB o AMD RADEON RX 580 4 GB\nAlmacenamiento: 60 GB de espacio",
        rec: "SO: Windows 10/11\nProcesador: INTEL CORE I7-8700K o AMD RYZEN 5 3600X\nMemoria: 16 GB de RAM\nGráficos: NVIDIA GEFORCE GTX 1070 8 GB o AMD RADEON RX VEGA 56 8 GB\nAlmacenamiento: 60 GB de espacio"
      },
      sekiro: {
        min: "SO: Windows 7, 8, 10 64-bit\nProcesador: Intel Core i3-2100 / AMD FX-6300\nMemoria: 4 GB de RAM\nGráficos: NVIDIA GeForce GTX 760 / AMD Radeon HD 7950\nAlmacenamiento: 25 GB de espacio disponible",
        rec: "SO: Windows 10 64-bit\nProcesador: Intel Core i5-2500K / AMD Ryzen 5 1400\nMemoria: 8 GB de RAM\nGráficos: NVIDIA GeForce GTX 970 / AMD Radeon RX 570\nAlmacenamiento: 25 GB de espacio disponible"
      },
      generic: {
        min: "SO: Windows 10 64-bit\nProcesador: Dual Core 2.4 GHz\nMemoria: 4 GB de RAM\nGráficos: NVIDIA GeForce GTX 660\nAlmacenamiento: 10 GB de espacio",
        rec: "SO: Windows 10 64-bit\nProcesador: Quad Core 3.0 GHz\nMemoria: 8 GB de RAM\nGráficos: NVIDIA GeForce GTX 970\nAlmacenamiento: 10 GB de espacio"
      }
    };

    // Games
    const gamesData = [
      // PS5
      { 
        title: "Demon's Souls", developer: 'Bluepoint Games', release_year: 2020, genre_id: rpg.id, platform: 'PS5', cover_url: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg', 
        description: 'Remake del clásico juego de rol de acción. Explora el sombrío reino de Boletaria. Reconstruido desde cero y magistralmente mejorado, este remake presenta los horrores de una oscura y neblinosa tierra de fantasía a toda una nueva generación de jugadores.'
      },
      { 
        title: 'Spider-Man 2', developer: 'Insomniac Games', release_year: 2023, genre_id: action.id, platform: 'PS5', cover_url: 'https://cdn.akamai.steamstatic.com/steam/apps/1817070/header.jpg', 
        description: 'Juega como Peter Parker y Miles Morales en la entrega más espectacular de Marvel para PS5. Balancéate, salta y utiliza las nuevas Alarañas para recorrer la Nueva York de Marvel, alternando rápidamente entre Peter y Miles para experimentar distintas historias.'
      },
      { 
        title: 'God of War Ragnarok', developer: 'Santa Monica Studio', release_year: 2022, genre_id: action.id, platform: 'PS5', cover_url: 'https://cdn.akamai.steamstatic.com/steam/apps/1593500/header.jpg', 
        description: 'Kratos y Atreus deben viajar a cada uno de los nueve reinos en busca de respuestas. Mientras las fuerzas asgardianas se preparan para una batalla profetizada que acabará con el mundo. Una obra maestra épica.'
      },
      
      // Xbox
      { 
        title: 'Halo Infinite', developer: '343 Industries', release_year: 2021, genre_id: fps.id, platform: 'Xbox', cover_url: 'https://cdn.akamai.steamstatic.com/steam/apps/1240440/header.jpg', 
        description: 'El Jefe Maestro regresa en la aventura de Halo más expansiva hasta la fecha. Con el destino de la humanidad en vilo, debes enfrentar al enemigo más implacable que jamás hayas conocido.'
      },
      { 
        title: 'Forza Horizon 5', developer: 'Playground Games', release_year: 2021, genre_id: strategy.id, platform: 'Xbox', cover_url: 'https://cdn.akamai.steamstatic.com/steam/apps/1551360/header.jpg', 
        description: 'Explora los vibrantes paisajes del mundo abierto de México en los mejores autos del mundo. Lidera impresionantes expediciones con cientos de los mejores automóviles del mundo.'
      },

      // PS4 (NEW!)
      { 
        title: 'Bloodborne', developer: 'FromSoftware', release_year: 2015, genre_id: rpg.id, platform: 'PS4', cover_url: 'https://m.media-amazon.com/images/I/71uA1U1Q1wL._AC_SL1500_.jpg', 
        description: 'Caza a tus pesadillas mientras buscas respuestas en la antigua ciudad de Yharnam, ahora maldita con una extraña enfermedad endémica que se propaga por las calles como un fuego mortal.'
      },
      { 
        title: 'God of War (2018)', developer: 'Santa Monica Studio', release_year: 2018, genre_id: action.id, platform: 'PS4', cover_url: 'https://cdn.akamai.steamstatic.com/steam/apps/1593500/header.jpg', 
        description: 'Su venganza contra los dioses del Olimpo ha quedado atrás y Kratos ahora vive en el reino de las deidades y los monstruos nórdicos. En este mundo duro e implacable debe luchar para sobrevivir.'
      },
      { 
        title: 'Persona 5 Royal', developer: 'Atlus', release_year: 2020, genre_id: rpg.id, platform: 'PS4', cover_url: 'https://cdn.akamai.steamstatic.com/steam/apps/1687950/header.jpg', 
        description: 'Ponte la máscara y únete a los Ladrones Fantasma de Corazones en una aventura de rol premiada. Explora Tokio, haz nuevos amigos y adéntrate en el Metaverso para robar los corazones de los corruptos.'
      },
      { 
        title: 'Uncharted 4: A Thiefs End', developer: 'Naughty Dog', release_year: 2016, genre_id: action.id, platform: 'PS4', cover_url: 'https://cdn.akamai.steamstatic.com/steam/apps/1659420/header.jpg', 
        description: 'Años después de su última aventura, el cazafortunas retirado Nathan Drake se ve obligado a volver al mundo de los ladrones por su hermano Sam, a quien creía muerto.'
      },
      { 
        title: 'The Last of Us Part II', developer: 'Naughty Dog', release_year: 2020, genre_id: action.id, platform: 'PS4', cover_url: 'https://m.media-amazon.com/images/I/81dG7w8tS1L._AC_SL1500_.jpg', 
        description: 'Cinco años después de su peligroso viaje a través de unos Estados Unidos pospandémicos, Ellie y Joel se han asentado en Jackson, Wyoming. Pero un evento violento la empuja a buscar venganza.'
      },
      { 
        title: 'Ghost of Tsushima', developer: 'Sucker Punch', release_year: 2020, genre_id: action.id, platform: 'PS4', cover_url: 'https://cdn.akamai.steamstatic.com/steam/apps/814380/header.jpg', 
        description: 'Forja un nuevo camino, el camino del Fantasma, y libra una guerra poco convencional por la libertad de Tsushima.'
      },
      { 
        title: 'Marvels Spider-Man', developer: 'Insomniac Games', release_year: 2018, genre_id: action.id, platform: 'PS4', cover_url: 'https://cdn.akamai.steamstatic.com/steam/apps/1817070/header.jpg', 
        description: 'Juega como un experimentado Peter Parker que es mucho más magistral combatiendo el crimen en la Nueva York de Marvel.'
      },
      { 
        title: 'Red Dead Redemption 2 (PS4)', developer: 'Rockstar', release_year: 2018, genre_id: action.id, platform: 'PS4', cover_url: 'https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg', 
        description: 'Arthur Morgan y la banda de Van der Linde huyen hacia el Salvaje Oeste ante la civilización que se acerca.'
      },
      { 
        title: 'Horizon Zero Dawn', developer: 'Guerrilla Games', release_year: 2017, genre_id: action.id, platform: 'PS4', cover_url: 'https://cdn.akamai.steamstatic.com/steam/apps/1151640/header.jpg', 
        description: 'Acompaña a Aloy en su viaje por desentrañar los misterios de una Tierra futura controlada por máquinas letales.'
      },
      { 
        title: 'Infamous Second Son', developer: 'Sucker Punch', release_year: 2014, genre_id: action.id, platform: 'PS4', cover_url: 'https://m.media-amazon.com/images/I/81x12Vz9ZcL._AC_SL1500_.jpg', 
        description: 'Disfruta de tus poderes sobrehumanos como Delsin Rowe mientras luchas contra el D.U.P. en una Seattle controlada.'
      },

      // PC
      { 
        title: 'The Witcher 3', developer: 'CD Projekt Red', release_year: 2015, genre_id: rpg.id, platform: 'PC', cover_url: 'https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg', 
        description: 'Encarna al brujo Geralt de Rivia en un inmenso mundo abierto lleno de conflictos, monstruos y decisiones morales de gran peso. Una de las obras maestras absolutas del rol moderno.',
        min_requirements: req.witcher3.min, recommended_requirements: req.witcher3.rec,
        steam_link: "https://store.steampowered.com/app/292030/The_Witcher_3_Wild_Hunt/"
      },
      { 
        title: 'Skyrim', developer: 'Bethesda', release_year: 2011, genre_id: rpg.id, platform: 'PC', cover_url: 'https://cdn.akamai.steamstatic.com/steam/apps/489830/header.jpg', 
        description: 'Forja tu propio destino en una aventura épica con total libertad en la fría región de Tamriel. Conviértete en el Sangre de Dragón y lidera tu propia leyenda.',
        min_requirements: req.skyrim.min, recommended_requirements: req.skyrim.rec,
        steam_link: "https://store.steampowered.com/app/489830/The_Elder_Scrolls_V_Skyrim_Special_Edition/"
      },
      { 
        title: 'DOOM Eternal', developer: 'id Software', release_year: 2020, genre_id: fps.id, platform: 'PC', cover_url: 'https://cdn.akamai.steamstatic.com/steam/apps/782330/header.jpg', 
        description: 'Conviértete en el Doom Slayer y aniquila a tus enemigos demoníacos en un baile de sangre, vísceras y heavy metal brutal. La cúspide de los shooters de arena.',
        min_requirements: req.doom.min, recommended_requirements: req.doom.rec,
        steam_link: "https://store.steampowered.com/app/782330/DOOM_Eternal/"
      },
      { 
        title: 'Cyberpunk 2077', developer: 'CD Projekt Red', release_year: 2020, genre_id: rpg.id, platform: 'PC', cover_url: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg', 
        description: 'Asume el papel de V en Night City, una megalópolis obsesionada con el poder, el glamur y la modificación corporal. Experimenta un inmenso mundo de ciencia ficción.',
        min_requirements: req.cyberpunk.min, recommended_requirements: req.cyberpunk.rec,
        steam_link: "https://store.steampowered.com/app/1091500/Cyberpunk_2077/"
      },
      { 
        title: 'Red Dead Redemption 2', developer: 'Rockstar', release_year: 2019, genre_id: action.id, platform: 'PC', cover_url: 'https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg', 
        description: 'Arthur Morgan y la banda de Van der Linde huyen hacia el Salvaje Oeste ante la civilización que se acerca. Una odisea americana como ninguna otra.',
        min_requirements: req.rdr2.min, recommended_requirements: req.rdr2.rec,
        steam_link: "https://store.steampowered.com/app/1174180/Red_Dead_Redemption_2/"
      },
      { 
        title: 'Elden Ring', developer: 'FromSoftware', release_year: 2022, genre_id: rpg.id, platform: 'PC', cover_url: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg', 
        description: 'Levántate, Sin Luz, y déjate guiar por la gracia hacia las Tierras Intermedias. Un mundo abierto hostil y maravilloso diseñado por Hidetaka Miyazaki y G.R.R. Martin.',
        min_requirements: req.eldenring.min, recommended_requirements: req.eldenring.rec,
        steam_link: "https://store.steampowered.com/app/1245620/ELDEN_RING/"
      },
      { 
        title: 'Hades', developer: 'Supergiant Games', release_year: 2020, genre_id: action.id, platform: 'PC', cover_url: 'https://cdn.akamai.steamstatic.com/steam/apps/1145360/header.jpg', 
        description: 'Desafía al dios de la muerte en este roguelike de acción rápida. Combina los poderes del Olimpo para escapar del Inframundo una y otra vez.',
        min_requirements: req.generic.min, recommended_requirements: req.generic.rec,
        steam_link: "https://store.steampowered.com/app/1145360/Hades/"
      },
      { 
        title: 'Terraria', developer: 'Re-Logic', release_year: 2011, genre_id: platformer.id, platform: 'PC', cover_url: 'https://cdn.akamai.steamstatic.com/steam/apps/105600/header.jpg', 
        description: 'Cava, lucha, explora y construye en este mundo abierto bidimensional. Cientos de horas de contenido en el sandbox pixel-art definitivo.',
        min_requirements: req.generic.min, recommended_requirements: req.generic.rec,
        steam_link: "https://store.steampowered.com/app/105600/Terraria/"
      },
      { 
        title: 'Sekiro: Shadows Die Twice', developer: 'FromSoftware', release_year: 2019, genre_id: action.id, platform: 'PC', cover_url: 'https://cdn.akamai.steamstatic.com/steam/apps/814380/header.jpg', 
        description: 'Domina el arte del desvío en combates letales y precisos. En el Japón del periodo Sengoku, restaura tu honor como el Lobo Manco.',
        min_requirements: req.sekiro.min, recommended_requirements: req.sekiro.rec,
        steam_link: "https://store.steampowered.com/app/814380/Sekiro_Shadows_Die_Twice__GOTY_Edition/"
      },
      { 
        title: 'Stardew Valley', developer: 'ConcernedApe', release_year: 2016, genre_id: rpg.id, platform: 'PC', cover_url: 'https://cdn.akamai.steamstatic.com/steam/apps/413150/header.jpg', 
        description: 'Comienza una nueva vida en este amado simulador de agricultura. Planta cultivos, cría animales y haz amistad (o enamora) a los habitantes de Pelican Town.',
        min_requirements: req.generic.min, recommended_requirements: req.generic.rec,
        steam_link: "https://store.steampowered.com/app/413150/Stardew_Valley/"
      },

      // NUEVOS JUEGOS: RESIDENT EVIL
      { 
        title: 'Resident Evil 4 Remake', developer: 'Capcom', release_year: 2023, genre_id: horror.id, platform: 'PS5', cover_url: 'https://cdn.akamai.steamstatic.com/steam/apps/2050650/header.jpg', 
        description: 'La supervivencia es solo el principio. Seis años después del desastre biológico en Raccoon City, Leon S. Kennedy rastrea a la hija desaparecida del presidente.'
      },
      { 
        title: 'Resident Evil Village', developer: 'Capcom', release_year: 2021, genre_id: horror.id, platform: 'PS5', cover_url: 'https://cdn.akamai.steamstatic.com/steam/apps/1196590/header.jpg', 
        description: 'Vive el survival horror como nunca en la octava entrega principal de la histórica franquicia Resident Evil.'
      },
      { 
        title: 'Resident Evil 7 Biohazard', developer: 'Capcom', release_year: 2017, genre_id: horror.id, platform: 'PS4', cover_url: 'https://cdn.akamai.steamstatic.com/steam/apps/418370/header.jpg', 
        description: 'El peligro y la soledad emanan de las decrépitas paredes de una granja abandonada en el sur de los EE. UU. RE7 marca un nuevo inicio para el survival horror.'
      },
      { 
        title: 'Resident Evil 2 Remake', developer: 'Capcom', release_year: 2019, genre_id: horror.id, platform: 'PS4', cover_url: 'https://cdn.akamai.steamstatic.com/steam/apps/883710/header.jpg', 
        description: 'Se ha publicado una versión reimaginada del clásico de 1998 con gráficos de vanguardia, un nuevo ángulo de cámara y controles modernizados.'
      },
      { 
        title: 'Resident Evil 4 (2005)', developer: 'Capcom', release_year: 2005, genre_id: horror.id, platform: 'PS2', cover_url: 'https://cdn.akamai.steamstatic.com/steam/apps/254700/header.jpg', 
        description: 'El agente especial Leon S. Kennedy es enviado a una misión para rescatar a la hija del presidente, secuestrada por una secta misteriosa.'
      },
      { 
        title: 'Resident Evil 3 Remake', developer: 'Capcom', release_year: 2020, genre_id: horror.id, platform: 'PC', cover_url: 'https://cdn.akamai.steamstatic.com/steam/apps/952060/header.jpg', 
        description: 'Jill Valentine es una de las pocas personas que quedan en Raccoon City que han sido testigos de las atrocidades de Umbrella. Para detenerla, Umbrella saca su arma secreta: ¡Némesis!',
        min_requirements: req.generic.min, recommended_requirements: req.generic.rec,
        steam_link: "https://store.steampowered.com/app/952060/RESIDENT_EVIL_3/"
      },

      // NUEVOS JUEGOS: CALL OF DUTY
      { 
        title: 'Call of Duty: Modern Warfare II', developer: 'Infinity Ward', release_year: 2022, genre_id: fps.id, platform: 'PS5', cover_url: 'https://cdn.akamai.steamstatic.com/steam/apps/1938090/header.jpg', 
        description: 'Te sumerge en un conflicto a escala global sin precedentes que incluye el regreso de los icónicos Operadores de la Fuerza Operativa 141.'
      },
      { 
        title: 'Call of Duty: Black Ops Cold War', developer: 'Treyarch', release_year: 2020, genre_id: fps.id, platform: 'PS4', cover_url: 'https://cdn.akamai.steamstatic.com/steam/apps/1985810/header.jpg', 
        description: 'La secuela directa de Black Ops transporta a los jugadores al centro de la volátil batalla geopolítica de la Guerra Fría a principios de los años 80.'
      },
      { 
        title: 'Call of Duty: Warzone', developer: 'Raven Software', release_year: 2020, genre_id: fps.id, platform: 'Xbox', cover_url: 'https://cdn.akamai.steamstatic.com/steam/apps/1962663/header.jpg', 
        description: 'Te damos la bienvenida a Warzone, la enorme arena de combate gratuita en la que puedes formar un pelotón y explorar.'
      },
      { 
        title: 'Call of Duty 3', developer: 'Treyarch', release_year: 2006, genre_id: fps.id, platform: 'PS2', cover_url: 'https://m.media-amazon.com/images/I/61H3M2K8Q7L._AC_SL1500_.jpg', 
        description: 'Vive el asalto de Normandía a través de los ojos de las tropas aliadas y experimenta el punto de inflexión de la Segunda Guerra Mundial.'
      },
      { 
        title: 'Call of Duty: Black Ops III', developer: 'Treyarch', release_year: 2015, genre_id: fps.id, platform: 'PC', cover_url: 'https://cdn.akamai.steamstatic.com/steam/apps/311210/header.jpg', 
        description: 'Despliega a tus soldados en un futuro oscuro e intrincado donde surge una nueva raza de soldados Black Ops y se difuminan las líneas entre la humanidad y la tecnología.',
        min_requirements: req.generic.min, recommended_requirements: req.generic.rec,
        steam_link: "https://store.steampowered.com/app/311210/Call_of_Duty_Black_Ops_III/"
      },

      // NUEVOS JUEGOS: FIFA / EA SPORTS FC
      { 
        title: 'EA SPORTS FC 24', developer: 'EA Sports', release_year: 2023, genre_id: strategy.id, platform: 'PS5', cover_url: 'https://cdn.akamai.steamstatic.com/steam/apps/2195250/header.jpg', 
        description: 'EA SPORTS FC™ 24 marca el inicio del futuro del fútbol. Siéntete más cerca del juego y vive la experiencia futbolística más auténtica.'
      },
      { 
        title: 'FIFA 23', developer: 'EA Sports', release_year: 2022, genre_id: strategy.id, platform: 'PS4', cover_url: 'https://cdn.akamai.steamstatic.com/steam/apps/1811260/header.jpg', 
        description: 'El mundo del juego (The World’s Game) trae la emoción y el dramatismo del fútbol a la cancha con los torneos de la FIFA World Cup™.'
      },
      { 
        title: 'FIFA 14', developer: 'EA Sports', release_year: 2013, genre_id: strategy.id, platform: 'PS2', cover_url: 'https://m.media-amazon.com/images/I/81q2Xv2M1-L._AC_SL1500_.jpg', 
        description: 'Experimenta la emoción de anotar grandes goles con un sistema de tiro innovador y una inteligencia de compañeros de equipo mejorada.'
      },
      { 
        title: 'EA SPORTS FC 24 (PC)', developer: 'EA Sports', release_year: 2023, genre_id: strategy.id, platform: 'PC', cover_url: 'https://cdn.akamai.steamstatic.com/steam/apps/2195250/header.jpg', 
        description: 'El nuevo capítulo de The World’s Game. Únete a la nueva era del fútbol con más de 19 000 futbolistas con licencia, 700 equipos y 30 ligas.',
        min_requirements: req.generic.min, recommended_requirements: req.generic.rec,
        steam_link: "https://store.steampowered.com/app/2195250/EA_SPORTS_FC_24/"
      }
    ];

    for (const g of gamesData) {
      const [game, created] = await Game.findOrCreate({ where: { title: g.title }, defaults: g });
      if (!created) {
        await game.update({ 
          description: g.description, 
          platform: g.platform,
          min_requirements: g.min_requirements || null,
          recommended_requirements: g.recommended_requirements || null,
          steam_link: g.steam_link || null
        });
      }
    }

    console.log('Seed exitoso');
    process.exit(0);
  } catch (error) {
    console.error('Error in seed:', error);
    process.exit(1);
  }
};

seed();
