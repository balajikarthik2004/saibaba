import type { Campaign, Experience, GalleryItem, VolunteerRole } from '../lib/types'

export const campaigns: Campaign[] = [
  {
    id: 'annadanam-fund',
    title: 'Maha Annadanam Fund',
    purpose:
      'Keeps the kitchen running at every sannidhi in the network — Thursday and Sunday meals, festival annadanam, and the local food-bank partnerships.',
    goal: 250000,
    raised: 183400,
    donors: 2140,
    templeId: 'all',
    endsOn: '2026-12-31',
    tag: 'Most supported',
  },
  {
    id: 'dwarkamai-hall',
    title: 'Dwarkamai Hall Expansion',
    purpose:
      'A new 600-seat dining and satsang hall at Plano, so no devotee has to eat standing on a festival day.',
    goal: 1200000,
    raised: 742000,
    donors: 918,
    templeId: 'dfw',
    endsOn: '2027-06-30',
    tag: 'Construction',
  },
  {
    id: 'goshala',
    title: 'Goshala Care & Winter Shelter',
    purpose: 'Feed, fodder, veterinary care and a heated winter shelter for the eleven cows at the Atlanta goshala.',
    goal: 90000,
    raised: 61250,
    donors: 403,
    templeId: 'atlanta',
    endsOn: '2027-03-31',
    tag: 'Gau seva',
  },
  {
    id: 'vidya-daan',
    title: 'Vidya Daan — Scholarship Fund',
    purpose:
      'Tuition grants for forty devotee families each year, plus free Sanskrit, shloka and bhajan classes at every sannidhi.',
    goal: 180000,
    raised: 97800,
    donors: 612,
    templeId: 'all',
    endsOn: '2027-05-31',
    tag: 'Education',
  },
  {
    id: 'seniors',
    title: 'Sai Sandhya — Senior Care Circle',
    purpose:
      'Rides to the temple, home-delivered prasad meals, and a weekly satsang-and-tea for devotees living alone.',
    goal: 70000,
    raised: 52100,
    donors: 488,
    templeId: 'all',
    endsOn: '2027-01-31',
    tag: 'Community',
  },
  {
    id: 'relief',
    title: 'Sai Seva Disaster Relief Kitchen',
    purpose:
      'Keeps the Houston relief kitchen stocked and ready — it has served 40,000 meals in past hurricane seasons.',
    goal: 120000,
    raised: 34600,
    donors: 271,
    templeId: 'houston',
    endsOn: '2027-08-31',
    tag: 'Urgent',
  },
]

export const campaignById = (id: string) => campaigns.find((c) => c.id === id)

export const galleryItems: GalleryItem[] = [
  { id: 'g1', title: 'Palki at dusk', album: 'Festivals', templeId: 'milpitas', caption: 'The Thursday palanquin leaving the sanctum as the Dhoop Aarti bell is struck.', art: 0, date: '2026-09-24' },
  { id: 'g2', title: 'Kakad Aarti, 5:15 AM', album: 'Daily Darshan', templeId: 'dfw', caption: 'The earliest aarti in North America, before the Texas sky has colour in it.', art: 1, date: '2026-09-18' },
  { id: 'g3', title: 'One thousand lamps', album: 'Festivals', templeId: 'nj', caption: 'Deep Daan on the prakaram wall — each lamp lit by a different family.', art: 2, date: '2025-11-01' },
  { id: 'g4', title: 'The Dhuni', album: 'Temple & Architecture', templeId: 'chicago', caption: 'Burning without interruption since the day of pratishtha in 2003.', art: 3, date: '2026-08-07' },
  { id: 'g5', title: 'Two thousand plates', album: 'Annadanam', templeId: 'dfw', caption: 'Thursday annadanam — volunteers begin cooking at four in the morning.', art: 4, date: '2026-09-10' },
  { id: 'g6', title: 'Go-puja at sunrise', album: 'Seva & Volunteers', templeId: 'atlanta', caption: 'The goshala herd led out for the first light of Saturday.', art: 5, date: '2026-07-19' },
  { id: 'g7', title: 'Cedar sanctum', album: 'Temple & Architecture', templeId: 'seattle', caption: 'Raised by devotee carpenters from Pacific cedar over two winters.', art: 6, date: '2026-06-02' },
  { id: 'g8', title: 'Rath Yatra on the coast road', album: 'Festivals', templeId: 'florida', caption: 'Ram Navami — devotees walking barefoot behind the chariot.', art: 7, date: '2026-03-28' },
  { id: 'g9', title: 'Abhishekam with 108 kalashas', album: 'Daily Darshan', templeId: 'atlanta', caption: 'Punyatithi morning, the water carried in by 108 devotees.', art: 8, date: '2025-10-02' },
  { id: 'g10', title: 'Bal Vikas class', album: 'Seva & Volunteers', templeId: 'milpitas', caption: 'Sunday shloka class — the youngest student is four.', art: 9, date: '2026-09-07' },
  { id: 'g11', title: 'Udi counter', album: 'Daily Darshan', templeId: 'chicago', caption: 'Ash from the perpetual Dhuni, packed by hand every Thursday.', art: 10, date: '2026-05-15' },
  { id: 'g12', title: 'Winter coat drive', album: 'Annadanam', templeId: 'boston', caption: 'Makar Sankranti — 1,400 coats collected for New England shelters.', art: 11, date: '2026-01-14' },
  { id: 'g13', title: 'Nagarkhana at dawn', album: 'Temple & Architecture', templeId: 'dfw', caption: 'The drum tower sounds before Kakad Aarti, as it does in Shirdi.', art: 12, date: '2026-04-11' },
  { id: 'g14', title: 'Relief kitchen', album: 'Annadanam', templeId: 'houston', caption: 'The temple kitchen converted for hurricane season.', art: 13, date: '2025-09-03' },
  { id: 'g15', title: 'Campus satsang bus', album: 'Seva & Volunteers', templeId: 'boston', caption: 'Friday pickup at four New England campuses.', art: 14, date: '2026-02-21' },
  { id: 'g16', title: 'Garba night', album: 'Festivals', templeId: 'houston', caption: 'Navratri in the community hall — four hundred dancers.', art: 15, date: '2025-10-10' },
]

export const albums = ['Festivals', 'Daily Darshan', 'Annadanam', 'Temple & Architecture', 'Seva & Volunteers'] as const

export const experiences: Experience[] = [
  {
    id: 'e1',
    title: 'The Udi my mother kept in her purse',
    author: 'Shalini R.',
    city: 'Plano, TX',
    date: '2026-09-12',
    body:
      'My mother carried a small paper packet of Udi in her purse for thirty-one years. When she passed last spring the packet was still there, worn soft. I did not understand it growing up — I thought it was superstition. Standing at the Dhoop Aarti in Plano this Thursday, taking Udi for the first time since her funeral, I understood that it was never about the ash. It was about her remembering, every single day, that she was not carrying things alone. I have started a packet of my own.',
    tags: ['Udi', 'Family', 'Grief'],
    blessings: 412,
  },
  {
    id: 'e2',
    title: 'A seat at the Thursday meal',
    author: 'Daniel M.',
    city: 'Aurora, IL',
    date: '2026-08-29',
    body:
      'I am not Hindu. I came to the Chicago temple for a work colleague’s son’s naming ceremony and stayed because nobody asked me to explain myself. They put a plate in my hand and pointed at the floor. I have been coming on Thursdays for two years now. Somebody told me that Baba kept a fire and a mosque and read both books, and that no one who came hungry was ever asked their religion first. That is the part I keep thinking about.',
    tags: ['Annadanam', 'Welcome', 'First visit'],
    blessings: 586,
  },
  {
    id: 'e3',
    title: 'Saburi, in a hospital corridor',
    author: 'Venkat K.',
    city: 'Milpitas, CA',
    date: '2026-07-04',
    body:
      'Eleven days in the ICU with my father. Somebody from the Milpitas parivaar came every single evening with prasad and sat with us for twenty minutes, and never once said that everything would be fine. They just sat. On the ninth day I finally understood what Saburi means — it is not the belief that the waiting will end well. It is the willingness to wait anyway, with someone beside you. My father came home on the twelfth day.',
    tags: ['Saburi', 'Illness', 'Sangha'],
    blessings: 729,
  },
  {
    id: 'e4',
    title: 'Grinding wheat at four in the morning',
    author: 'Priya N.',
    city: 'Suwanee, GA',
    date: '2026-06-18',
    body:
      'I signed up for the annadanam kitchen shift because I wanted to feel useful, and I was given the least interesting job — chopping onions for three hours with seven aunties who talked over me the entire time. By the end of it I was crying from the onions and laughing from the stories and I had not thought about my job once. The first chapter of the Satcharitra is about Baba grinding wheat. I think I finally get the joke.',
    tags: ['Seva', 'Kitchen', 'Satcharitra'],
    blessings: 341,
  },
  {
    id: 'e5',
    title: 'My daughter asked who Baba is',
    author: 'Arun & Meera S.',
    city: 'Princeton Junction, NJ',
    date: '2026-05-30',
    body:
      'She is six. I started explaining about Shirdi and 1858 and the neem tree, and she interrupted and asked: "Is he the one who gives food to everyone?" I said yes. She said, "Okay, I like him." Four months of Sunday Bal Vikas and that is what she took away. Honestly, that is the whole thing, isn’t it.',
    tags: ['Children', 'Bal Vikas', 'Family'],
    blessings: 498,
  },
  {
    id: 'e6',
    title: 'The parayan I almost gave up on',
    author: 'Lakshmi P.',
    city: 'Bothell, WA',
    date: '2026-04-22',
    body:
      'Day four of the Saptah I wanted to stop. I had not slept, the chapters were long, and I did not feel anything. The Parayan Circle at the Bothell temple would not let me quit — someone messaged me every morning at six. I finished on the Thursday. I still cannot tell you that I felt anything dramatic. But I have read it four times since.',
    tags: ['Parayan', 'Satcharitra', 'Sangha'],
    blessings: 267,
  },
]

export const volunteerRoles: VolunteerRole[] = [
  {
    id: 'v1',
    title: 'Annadanam Kitchen Team',
    team: 'Kitchen',
    commitment: 'Thursdays, 4:00a – 10:00a',
    description:
      'Cook and serve the Thursday meal. No experience needed — you will be taught, loudly and with great affection, by people who have done it for fifteen years.',
    slots: 24,
    filled: 19,
    skills: ['Food handling (training given)', 'Early riser'],
  },
  {
    id: 'v2',
    title: 'Darshan Line & Hospitality',
    team: 'Hospitality',
    commitment: 'Festival days, 4 hr shift',
    description: 'Greet devotees, manage the darshan queue on festival days, and look after first-time visitors and elders.',
    slots: 40,
    filled: 22,
    skills: ['Patience', 'Any language a devotee speaks'],
  },
  {
    id: 'v3',
    title: 'Live Darshan Stream Operator',
    team: 'Media',
    commitment: '2 aartis per week',
    description: 'Run the camera, audio desk and stream for aartis and festivals so devotees who cannot travel still get darshan.',
    slots: 8,
    filled: 3,
    skills: ['OBS or similar', 'Basic audio', 'Reliability'],
  },
  {
    id: 'v4',
    title: 'Bal Vikas Teacher',
    team: 'Education',
    commitment: 'Sundays, 10:00a – 12:00p',
    description: 'Teach shlokas, bhajans and Baba’s stories to children aged 5–14. Curriculum and training provided.',
    slots: 14,
    filled: 11,
    skills: ['Good with children', 'Background check required'],
  },
  {
    id: 'v5',
    title: 'Senior Rides & Check-ins',
    team: 'Sai Sandhya',
    commitment: 'Flexible, 2 hr / week',
    description: 'Drive elderly devotees to aarti, deliver prasad meals, and make weekly check-in calls to those living alone.',
    slots: 30,
    filled: 17,
    skills: ['Valid license & insurance', 'Warmth'],
  },
  {
    id: 'v6',
    title: 'Garden & Goshala Care',
    team: 'Grounds',
    commitment: 'Saturdays, 8:00a – 11:00a',
    description: 'Tend the temple garden and help with feeding, grooming and shelter upkeep at the goshala.',
    slots: 18,
    filled: 9,
    skills: ['Comfortable outdoors', 'Comfortable around cattle'],
  },
  {
    id: 'v7',
    title: 'Bhajan Mandali — Singers & Players',
    team: 'Music',
    commitment: 'Thursdays, 7:00p',
    description: 'Lead the Thursday bhajan sandhya. Harmonium, tabla, dholak, taal and voices all welcome.',
    slots: 16,
    filled: 12,
    skills: ['Any instrument or voice', 'Knows the aartis (or will learn)'],
  },
  {
    id: 'v8',
    title: 'Food Pantry & Relief Logistics',
    team: 'Outreach',
    commitment: 'Saturdays, 9:00a – 1:00p',
    description: 'Sort, pack and distribute at the weekly food pantry, and staff the relief kitchen during storm season.',
    slots: 26,
    filled: 14,
    skills: ['Lifting 25 lb', 'Team player'],
  },
]

export const announcements = [
  'Vijayadashami Punyatithi Utsav · 20–22 October · Registration open at all sannidhis',
  'Thursday Maha Annadanam at Plano — 2,000 plates · Volunteers needed from 4:00 AM',
  'Sai Satcharitra Saptah begins Thursday 26 October · Books provided free',
  'Live Darshan now streaming from eight temples · Kakad, Madhyan, Dhoop and Shej',
  'Winter coat & blanket drive opens 1 November at Boston, Chicago and NJ',
]

export const faqs = [
  {
    q: 'I have never been to a Hindu temple. What should I expect?',
    a: 'Leave your shoes at the rack by the door, and dress comfortably and modestly — covered shoulders and knees. Nobody will quiz you. Walk in, sit anywhere on the floor or on a chair at the side, and watch. At the end of the aarti a tray of lamps comes round: pass your hands over the flame and touch your forehead if you wish. You will be given Udi (grey ash) for your forehead and prasad to eat. Eat it — refusing is the only impolite thing you can do.',
  },
  {
    q: 'What is Udi, and what do I do with it?',
    a: 'Udi is ash from the Dhuni, the sacred fire Baba kept burning in Dwarkamai and which our temples keep burning still. A pinch is applied to the forehead and a little may be taken with water. Devotees keep it at home, carry it when travelling, and give it to the sick. Its meaning is plain: everything the body chases becomes ash, and the one who gives it does not.',
  },
  {
    q: 'Why is Thursday special?',
    a: 'Thursday is Guruvar, the day of the Guru, and it is Baba’s day. Every sannidhi holds the palki procession after the Dhoop Aarti, serves annadanam, and distributes Udi. If you can come only once a week, come on a Thursday.',
  },
  {
    q: 'Can I book a seva if I live far from a temple?',
    a: 'Yes. Any seva marked "Virtual" is performed in your name and gotra at the temple and streamed or recorded for you, with prasad and Udi posted to your address. Archana, Sahasranama and the aarti sponsorships are the most commonly booked this way.',
  },
  {
    q: 'What is a gotra, and what if I do not know mine?',
    a: 'A gotra is a paternal lineage name used in the sankalpa so the seva is offered specifically for you. If you do not know it, select "Not known" — the priest will use the universal Kashyapa gotra, which is the traditional provision for exactly this case. It changes nothing about the seva.',
  },
  {
    q: 'Are donations tax-deductible?',
    a: 'Yes. Every temple in the network is a registered 501(c)(3) non-profit. A receipt with the EIN is emailed immediately for each donation, and a consolidated annual statement is issued each January for your filing.',
  },
  {
    q: 'Can I sponsor annadanam in memory of someone?',
    a: 'Yes, and it is one of the most common sevas. You may sponsor a single day or every Thursday for a year. The departed person’s name is read at all four aartis on the day, and for the yearly sponsorship a plaque is placed in the dining hall and a puja is performed each year on the tithi.',
  },
  {
    q: 'Do I need to book in advance for a festival?',
    a: 'Darshan is always free and never requires a booking. Seating for the large festivals — Punyatithi, Ram Navami, Shivaratri — is limited, so RSVP through the Events page if you want a reserved place. Annadanam is served to everyone regardless.',
  },
]
