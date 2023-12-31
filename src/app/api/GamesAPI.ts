import { Game } from "../models/Game"

const games: Game[] = [
  {
    id: 'deputinization',
    name: 'Deputinization',
    images: [
      'https://cdn.akamai.steamstatic.com/steam/apps/2146770/header.jpg?t=1697011992',
    ],
    description: 'Депутінізація - це гра в жанрі "Біжи та Стріляй", де головним елементом є битви з босами. У грі ви зустрінете приємну піксельну графіку та музику, коріння якої тягнуться з української культури.',
    release: new Date(2021, 9, 14),
    developer: 'Myttsi Zabav',
    publisher: 'Myttsi Zabav'
  },
  {
    id: 'fifa24',
    name: 'FIFA 24',
    images: [
      'https://isport.ua/i/73/31/15/8/7331158/image_main/495e1c7291affaa7e9292ffd64163872-quality_70Xresize_1Xallow_enlarge_0Xw_835Xh_0.jpg',
    ],
    description: 'FIFA 24 - захоплююча інноваційна гра, яка змінює уявлення про футбольні симуляції. Ця версія пропонує неймовірно реалістичну графіку та фізичний двигун, який відображає неймовірну динаміку руху гравців. Нові функції, такі як розширена штучна інтелект, глибше налаштовані тактики команд та можливість персоналізації гравців, дозволяють кожному шанувальнику футболу зануритися у світ професійного спорту, відчути атмосферу на стадіонах та відтворити найемоційніші моменти у своїх власних ігрових пригодах. FIFA 24 - це не просто гра, а повноцінний футбольний досвід, який залишає за собою незабутні враження та заворожує своєю реалістичністю.',
    release: new Date(2023, 9, 30),
    developer: 'EA Sports',
    publisher: 'EA Sports'
  },
  {
    id: 'gta5',
    name: 'GTA 5',
    images: [
      'https://games.24tv.ua/resources/photos/news/202309/2394383.jpg?v=1695035684000',
    ],
    description: '"GTA 5" (Grand Theft Auto V) - це відома відеогра, розроблена компанією Rockstar Games. Вона здобула широку популярність завдяки своїй відкритій світовій платформі, величезному масштабу, глибокому сюжету та різноманітним можливостям для гравців. Гра розгортається у вигаданому місті Лос-Сантос, яке відображає сучасну Каліфорнію, і розповідає історії трьох головних персонажів - Майкла, Франкліна і Тревора, кожен з яких має свої унікальні характеристики та сюжетну лінію. Гравцям доступні різноманітні завдання, можливість виконувати різні види злочинів, експлорувати величезний світ, а також грати в онлайн-режимі з іншими гравцями. "GTA 5" славиться своєю відкритістю, великим вибором активностей та різноманітними можливостями для віртуального розважання.',
    release: new Date(2013, 9, 17),
    developer: 'Rockstar North',
    publisher: 'Rockstar Games'
  },
  {
    id: 'minecraft',
    name: 'Minecraft',
    images: [
      'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_1240/b_white/f_auto/q_auto/ncom/software/switch/70010000000964/811461b8d1cacf1f2da791b478dccfe2a55457780364c3d5a95fbfcdd4c3086f',
    ],
    description: '"Minecraft" - це надзвичайно популярна відеогра, яка пропонує гравцям величезний відкритий світ, заснований на блоках, де вони можуть будувати, досліджувати та виживати. Гра дозволяє розгортати власну уяву та творчість, будуючи будь-які споруди та об\'єкти з різних блоків, збирати ресурси для виживання, експлорувати різноманітні біоми, а також зустрічати різні істоти. Завдяки своїй безмежній творчій свободі та можливості грати у різних режимах, таких як творчий або виживання, "Minecraft" залишається однією з найулюбленіших ігор для гравців у всьому світі.',
    release: new Date(2011, 11, 18),
    developer: 'Mojang',
    publisher: 'Mojang'
  },
  {
    id: 'doometernal',
    name: 'Doom Eternal',
    images: [
      'https://cdn.wccftech.com/wp-content/uploads/2019/06/doom_eternal_key_art.jpg'
    ],
    description: '"Doom Eternal" - це захоплюючий шутер від першої особи, що розгортається у світі, захопленому демонами, де гравець у ролі Думгая повинен боротися з натовпами ворогів, використовуючи різноманітні зброї та уміння. Гра пропонує швидкісну та насичену бойову систему, де рух і стратегія відіграють важливу роль у подоланні ворожих сил, а також величезний арсенал засобів для боротьби з демонічними загрозами, забезпечуючи гравцям епічні та насичені враження від гри.',
    release: new Date(2020, 3, 20),
    developer: 'Bethesda Software',
    publisher: 'Bethesda Softworks'
  },
]

const url = 'http://localhost:3001/games'

const processGettingGames = async (finalUrl: string): Promise<Game[] | null> => {
  const games: Game[] = await fetch(finalUrl).then(res => res.json()).catch(err => {console.log(err); return null })
  if (!games) {
    return null
  }
  return games.map(game => ({...game, release: new Date(game.release)}))
}

const getAllGames = async (): Promise<Game[] | null> => {
  return processGettingGames(url)
}



const buyGame = async (gameId: string, userId: string): Promise<{game: Game | null, error?: string}> => {
  const result = await fetch(url+'/buyGame', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId, gameId })
  })
  .then(res => res.json())
  .catch(err => { console.error(err); return 'Something went wrong. Please, try again later...' })
  
  if (typeof result === 'string') {
    return { game: null, error: result }
  }

  if (result.game) {
    result.game.release = new Date(result.game.release)
  }
  
  return {game: result}
}

const getUserGames = async (userId: string): Promise<Game[] | null> => {
  return processGettingGames(url+'/'+userId)
}

const gamesApi = {
  getAllGames,
  buyGame,
  getUserGames
}

export default gamesApi
