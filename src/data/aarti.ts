export interface AartiSong {
  id: string
  aarti: 'kakad' | 'madhyan' | 'dhoop' | 'shej' | 'any'
  title: string
  devanagari: string
  transliteration: string
  meaning: string
  minutes: number
  composer: string
}

export const aartiSongs: AartiSong[] = [
  {
    id: 'jodoniya',
    aarti: 'kakad',
    title: 'Jodoniya Kar Charani',
    devanagari: 'जोडोनियां कर चरणीं ठेविला माथा।\nपरिसावी विनंती माझी सदगुरुनाथा॥',
    transliteration: 'Jodoniyā kar charaṇī ṭhevilā māthā,\nparisāvī vinanti mājhī sadgurunāthā.',
    meaning:
      'With folded hands I have laid my head at your feet — hear my petition, O Sadguru. The first words of the dawn aarti: before asking anything, the head goes down.',
    minutes: 4,
    composer: 'Sant Janardan Swami',
  },
  {
    id: 'uthā-pāndurangā',
    aarti: 'kakad',
    title: 'Uthā Pāndurangā',
    devanagari: 'उठा पांडुरंगा आतां प्रभात समयो पातला।\nवैष्णवांचा मेळा गरुडपारीं दाटला॥',
    transliteration: 'Uṭhā Pāṇḍurangā ātā prabhāt samayo pātalā,\nvaiṣṇavāñchā meḷā garuḍapārī dāṭalā.',
    meaning:
      'Rise, Panduranga — the hour of dawn has come, and the gathering of devotees is already thick at the Garuda pillar. Sung as the sanctum doors are opened.',
    minutes: 5,
    composer: 'Sant Tukaram',
  },
  {
    id: 'ghālin-lotāngan',
    aarti: 'madhyan',
    title: 'Ghālin Loṭāngan',
    devanagari: 'घालीन लोटांगण वंदीन चरण।\nडोळ्यांनी पाहीन रूप तुझें॥',
    transliteration: 'Ghālīn loṭāngaṇ vandīn charaṇ,\nḍoḷyānnī pāhīn rūp tujhe.',
    meaning:
      'I shall prostrate full length, I shall worship your feet, I shall look upon your form with my own eyes. The closing prayer of every aarti across Maharashtra.',
    minutes: 6,
    composer: 'Sant Namdev',
  },
  {
    id: 'sai-raham',
    aarti: 'madhyan',
    title: 'Sāī Rahama Nazar Karanā',
    devanagari: 'साईं रहम नज़र करना, बच्चों का पालन करना।\nजाना तुमने जगत पसारा, सबही झूठ ज़माना॥',
    transliteration: 'Sāī rahama nazar karanā, bachchoṅ kā pālan karanā,\njānā tumne jagat pasārā, sabahī jhūṭh zamānā.',
    meaning:
      'Sai, turn your merciful glance on us and look after your children. You have known the spread of this world and seen that all of it is passing.',
    minutes: 5,
    composer: 'Traditional (Urdu)',
  },
  {
    id: 'aarti-sai-baba',
    aarti: 'dhoop',
    title: 'Āratī Sāī Bābā',
    devanagari: 'आरती साईबाबा। सौख्यदातार जीवा।\nचरणरजातळीं। द्यावा दासा विसावा॥',
    transliteration: 'Āratī Sāībābā, saukhyadātāra jīvā,\ncharaṇarajātaḷī dyāvā dāsā visāvā.',
    meaning:
      'Aarti to Sai Baba, giver of the soul’s well-being. Grant your servant rest beneath the dust of your feet. The central aarti of the Sai tradition.',
    minutes: 7,
    composer: 'Krishnarao Jogeshwar Bhishma',
  },
  {
    id: 'rahama-nazar',
    aarti: 'dhoop',
    title: 'Shirdī Mājhe Pandharapura',
    devanagari: 'शिरडी माझे पंढरपूर। साईबाबा रमावर।\nशुद्ध भक्ति चंद्रभागा। भाव पुंडलीक जागा॥',
    transliteration: 'Śirḍī mājhe Paṇḍharapura, Sāībābā Ramāvara,\nśuddha bhakti Chandrabhāgā, bhāva Puṇḍalīka jāgā.',
    meaning:
      'Shirdi is my Pandharpur and Sai Baba is the Lord of Rama. Pure devotion is the river Chandrabhaga and sincere feeling is Pundalik, awake on its bank.',
    minutes: 4,
    composer: 'Das Ganu Maharaj',
  },
  {
    id: 'ovaalu-aartyā',
    aarti: 'shej',
    title: 'Ovāḷū Āratyā',
    devanagari: 'ओवाळू आरत्या कुर्वंड्या येती।\nचरणावरी ठेवूं जीव॥',
    transliteration: 'Ovāḷū āratyā kurvaṇḍyā yetī,\ncharaṇāvarī ṭhevū jīva.',
    meaning:
      'Let me wave the lamps before you and circle away all harm; let me lay my very life at your feet. Sung as Baba is laid to rest for the night.',
    minutes: 5,
    composer: 'Traditional',
  },
  {
    id: 'shri-sachchidanand',
    aarti: 'shej',
    title: 'Śrī Sachchidānanda Sadguru',
    devanagari: 'श्री सच्चिदानंद सदगुरु साईनाथ महाराज की जय।\nराजाधिराज योगिराज परब्रह्म साईनाथ महाराज॥',
    transliteration: 'Śrī Sachchidānanda Sadguru Sāīnāth Mahārāj kī jai,\nRājādhirāj Yogirāj Parabrahma Sāīnāth Mahārāj.',
    meaning:
      'Victory to Sri Sachchidananda Sadguru Sainath Maharaj — King of kings, King of yogis, the Supreme Brahman. The jaykara that closes every aarti.',
    minutes: 2,
    composer: 'Traditional',
  },
  {
    id: 'sai-chalisa',
    aarti: 'any',
    title: 'Sāī Chālīsā',
    devanagari: 'पहले साईं के चरणों में, अपना शीश नवाऊँ मैं।\nकैसे शिरडी साईं आये, सारा हाल सुनाऊँ मैं॥',
    transliteration: 'Pahale Sāī ke charaṇoṅ meṅ apanā śīś navāū̃ maiṅ,\nkaise Śirḍī Sāī āye, sārā hāl sunāū̃ maiṅ.',
    meaning:
      'First I bow my head at Sai’s feet, then I shall tell you the whole account of how Sai came to Shirdi. Forty verses, read daily by devotees across the world.',
    minutes: 9,
    composer: 'Traditional (Hindi)',
  },
  {
    id: 'sai-108',
    aarti: 'any',
    title: 'Sāī Aṣṭottara Śatanāmāvalī',
    devanagari: 'ॐ श्री साईनाथाय नमः।\nॐ लक्ष्मीनारायणाय नमः॥',
    transliteration: 'Oṃ Śrī Sāīnāthāya namaḥ,\nOṃ Lakṣmīnārāyaṇāya namaḥ.',
    meaning:
      'The 108 names of Sainath, each offered with a flower at His feet. The most frequently sponsored archana in every sannidhi.',
    minutes: 18,
    composer: 'Traditional (Sanskrit)',
  },
]

export const aartiOrder = ['kakad', 'madhyan', 'dhoop', 'shej'] as const

/** Lightweight panchang model — replaced by a real ephemeris later. */
const tithis = [
  'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami', 'Shashthi', 'Saptami', 'Ashtami',
  'Navami', 'Dashami', 'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima',
]
const nakshatraList = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha',
  'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha',
  'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati',
]
const yogas = ['Vishkambha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana', 'Atiganda', 'Sukarma', 'Dhriti']
const masas = [
  'Pausha', 'Magha', 'Phalguna', 'Chaitra', 'Vaishakha', 'Jyeshtha', 'Ashadha',
  'Shravana', 'Bhadrapada', 'Ashwina', 'Kartika', 'Margashirsha',
]
const rahuByDay = [
  '4:30p – 6:00p', '7:30a – 9:00a', '3:00p – 4:30p', '12:00p – 1:30p',
  '1:30p – 3:00p', '10:30a – 12:00p', '9:00a – 10:30a',
]

export function panchangFor(date: Date) {
  const doy = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000)
  const paksha = doy % 30 < 15 ? 'Shukla' : 'Krishna'
  const tithi = tithis[doy % 15]
  return {
    tithi: `${paksha} ${tithi}`,
    nakshatra: nakshatraList[doy % 27],
    yoga: yogas[doy % 8],
    karana: doy % 2 === 0 ? 'Bava' : 'Balava',
    masa: masas[date.getMonth()],
    samvat: 'Vikram Samvat 2083',
    rahuKalam: rahuByDay[date.getDay()],
    sunrise: '7:02 AM',
    sunset: '6:48 PM',
    auspicious: date.getDay() === 4,
  }
}
