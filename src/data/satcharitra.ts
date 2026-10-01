import type { Chapter } from '../lib/types'

/**
 * Shri Sai Satcharitra — 53 chapters, with the traditional seven-day
 * Saptah Parayan division (Thursday to Thursday).
 */
const titles: string[] = [
  'The Grinding of Wheat — and why Baba ground it',
  'Hemadpant’s purpose, his doubt, and Baba’s answer',
  'Baba sanctions the writing; His stories as a beacon',
  'The mission of the saints; Baba’s advent in Shirdi',
  'The return with Chand Patil’s party — “Ya Sai!”',
  'The first Rama Navami festival at Shirdi',
  'Baba’s wonderful life; the leper devotee',
  'The value of human birth; Baba goes for bhiksha',
  'The fruit of Baba’s darshan; devotees’ experiences',
  'Baba’s mode of life; the sleeping plank',
  'Sai as Sagun Brahman; Dr. Pandit’s puja',
  'Leelas of Baba — Kaka Mahajani and the Nizam’s officer',
  'Leelas — the curing of diseases',
  'Ratanji Wadia; the meaning of dakshina',
  'Narayan Rao; the bhajan of Cholkar',
  'Brahmajnana in an instant — part one',
  'Brahmajnana in an instant — part two',
  'Mrs. Khaparde and the courage of a mother',
  'Sathe’s grandmother; the worth of patience',
  'Das Ganu’s problem solved by a maid’s torn sari',
  'Thakur, Patankar, and the Pandharpur pleader',
  'The snake-bite that could not take a life',
  'Yoga and the onion; the cholera of Chidambaram Pillay',
  'The humour of Baba; the leela of the gram',
  'Damu Anna Kasar and the miraculous grapes',
  'Bhakta Pant; Pitale; Gopal Ambadekar',
  'The blessing of the Vishnu Sahasranama',
  'Lala Lakhmichand; the lady of Burhanpur; Megha',
  'The bhajan mela from Madras; Dr. Captain Hate',
  'Kakaji Vaidya and the Punjabi Ramdasi',
  'Vijayanand; Balaram Mankar; the death of Noolkar',
  'Baba’s quest for His own Guru',
  'The wonders of Udi — part one',
  'The wonders of Udi — part two',
  'Kaka Saheb’s doubt and Sai’s reply',
  'Two gentlemen from Goa; Mrs. Aurangabadkar',
  'The Chavadi procession',
  'Baba’s handi; the Dixit Wada',
  'Baba’s Sanskrit; the Gita explained to Nanasaheb',
  'The udyapan of Deshpande’s vrata; Baba as guest',
  'The stolen Sahasranama; the picture of Baba',
  'Baba announces His departure',
  'The Mahasamadhi — part one',
  'The Mahasamadhi — part two',
  'Kaka’s anxiety; the dispute of Anna and Mavshibai',
  'Baba’s trip to Gaya; the story of the goat',
  'The snake and the frog — reminiscence of two births',
  'Devotees delivered from calamity',
  'Hari Kanoba; Somadeva Swami; Nanasaheb Chandorkar',
  'Kakasaheb Dixit; Tendulkar; Captain Hate',
  'Epilogue — the plea of Hemadpant',
  'Epilogue — the benediction',
  'The Guru Purnima vrata',
]

const themes = [
  'Surrender', 'Faith', 'Grace', 'Advent', 'Welcome', 'Festival', 'Compassion', 'Bhiksha', 'Darshan',
  'Simplicity', 'Form & Formless', 'Leela', 'Healing', 'Dakshina', 'Bhajan', 'Knowledge', 'Knowledge',
  'Courage', 'Patience', 'Providence', 'Devotion', 'Protection', 'Discipline', 'Humour', 'Abundance',
  'Devotion', 'Scripture', 'Service', 'Music', 'Guru', 'Detachment', 'Guru', 'Udi', 'Udi', 'Trust',
  'Hospitality', 'Procession', 'Prasad', 'Teaching', 'Vrata', 'Scripture', 'Foreknowledge', 'Mahasamadhi',
  'Mahasamadhi', 'Harmony', 'Pilgrimage', 'Karma', 'Refuge', 'Guru-bhakti', 'Devotees', 'Epilogue',
  'Benediction', 'Vrata',
]

const excerpts = [
  'Why does Baba grind wheat when He begs His own food? Hemadpant watches, and learns that the grinding is of our own karma — the chaff of sin blown away at the village boundary.',
  'He who has no learning may still have the one thing needed. Baba stops the pen that is written from pride and moves the hand that is willing.',
  'Let him collect My stories and experiences, keep a record of them. I shall help him — he is only an instrument.',
  'Saints are not born of a lineage but of a need. Where the thirst is, there the water rises.',
  'A single word — “Ya Sai, come” — and a nameless fakir had a name, a village, and sixty years of work before Him.',
  'What was begun as an Urs was kept as Rama Navami, so that no devotee would have to choose between his festival and his neighbour’s.',
  'He sat before the dhuni and said: this fire burns the sins of those who sit by it. He meant it literally.',
  'This birth is hard to get and easy to waste. Baba begged at five doors daily for sixty years and kept nothing overnight.',
  'Some came for a cure, some for a son, some for money. Not one of them went away as they came.',
  'A plank four feet long and a span wide, hung from the rafters by old rags, with lamps burning at its four corners — and Baba slept on it.',
  'Worship the form, and the formless will not be far. Baba allowed Himself to be bathed, dressed and fed, for our sake.',
  'The officer came to expose a fraud and left having given a thousand rupees he had not meant to give.',
  'Udi and a word. That was the whole pharmacy, and it emptied the doctors’ waiting rooms of Shirdi.',
  'Why does He ask for two rupees from one man and nothing from another? Because He asks for what we are holding onto.',
  'Cholkar had vowed to take no sugar in his tea until he reached Shirdi. Baba asked for his tea sweet, twice.',
  'The Guru does not give knowledge. He removes what is in the way, and the knowledge was always there.',
  'Can Brahman be had for a price? The seeker wanted it cheap and quick. Baba sent him for five hundred rupees he did not have.',
  'Her child was burning with fever and she sat by Baba. He said: look up, the sky is clearing. It was.',
  'The old lady would not eat until Baba ate. Baba would not eat until she slept. Between them, something was settled.',
  'A torn sari, patched and worn without complaint, taught Das Ganu what no discourse had.',
  'The pleader had come to argue. He stayed to listen, and found the argument was with himself.',
  'The snake struck and the venom did not rise past the ankle. Baba said only: do not come down, the Fakir is merciful.',
  'He gave the onion to one man and forbade it to another, and both were right, for one could digest it and one could not.',
  'He laughed and the gram fell from His sleeve, and in the laughing a lesson about eating alone was given.',
  'The grapes were out of season and there were none in the village, and the basket was full.',
  'He lost everything, and then found that what he had lost was the thing that had been in his way.',
  'Nana was told to read it, and he read it, and the reading carried him through what was coming.',
  'Megha washed the floor, drew the water, and worshipped the lingam Baba gave him, and that was his entire sadhana.',
  'The mela sang through the night, and Baba, who did not sing, kept time with His hand.',
  'The Ramdasi quoted scripture at Baba for three days. On the fourth he had nothing left to say and began to learn.',
  'Mankar was sent away from Shirdi to find that Baba was not confined to Shirdi.',
  'Twelve years with a Guru who said nothing and asked only for faith and patience. Shraddha and Saburi — nothing else.',
  'A pinch of ash from a fire that never goes out, and plague, cholera and childlessness turn and go.',
  'Udi is not medicine. It is the reminder that the body is ash and the one who gives it is not.',
  'Kaka doubted, and Baba let him doubt, and then answered the doubt in a way Kaka could not argue with.',
  'They wanted a vision. They got a goat, a plate of food, and an instruction they understood years later.',
  'On Thursday nights Baba was carried to the Chavadi in a palanquin, and the whole village walked behind with torches.',
  'One pot of food for all of Shirdi, stirred with a bare arm, and no one was ever short.',
  'He who knew no Sanskrit explained a verse of the Gita in a way no pandit had.',
  'The vrata was kept and Baba came to the house as a guest, and the guest was recognised too late and in time.',
  'The book was stolen so that the thief would read it. That was the whole purpose of the theft.',
  'He said: I am going to Buti’s wada. And He went, and He has not left it.',
  'At two in the afternoon on Vijayadashami, leaning on Bayaji, He laid down the body and did not come back to it.',
  'Do not think I am dead and gone. You will hear Me from My Samadhi, and I shall guide you.',
  'Even the quarrels of devotees were used. Nothing was wasted in that courtyard.',
  'He had been to Gaya long before the devotee went, and the devotee found the proof waiting for him there.',
  'A birth of enmity, a birth of debt — and the account closed in front of Baba, under a tree.',
  'Fire, flood, surgery and shipwreck — and the same handful of ash in every account.',
  'Nana was told he could not understand the verse yet. He was told to wait. He waited and understood.',
  'Kakasaheb gave up his practice and his certainty, and was given something steadier.',
  'I ask for nothing but this: that you remember Me, and that you feed whoever comes to your door.',
  'Whoever reads this with faith shall find his difficulties leaving him, as leaves leave a tree in autumn.',
  'Keep the Guru Purnima, for the Guru is the one who takes you across, and the day belongs to him.',
]

const dayFor = (n: number) =>
  n <= 5 ? 1 : n <= 11 ? 2 : n <= 18 ? 3 : n <= 26 ? 4 : n <= 33 ? 5 : n <= 43 ? 6 : 7

export const chapters: Chapter[] = titles.map((title, i) => ({
  n: i + 1,
  title,
  theme: themes[i] ?? 'Devotion',
  verses: 60 + ((i * 17) % 140),
  excerpt: excerpts[i] ?? '',
  day: dayFor(i + 1),
}))

export const saptahDays = [1, 2, 3, 4, 5, 6, 7].map((day) => ({
  day,
  chapters: chapters.filter((c) => c.day === day),
  label: `Day ${day}`,
}))

/** Baba's Eleven Assurances, given from the Samadhi. */
export const elevenAssurances = [
  'Whosoever puts their feet on Shirdi soil, their sufferings shall come to an end.',
  'The wretched and miserable shall rise to joy and happiness as soon as they climb the steps of My Samadhi.',
  'I shall be ever active and vigorous even after leaving this earthly body.',
  'My tomb shall bless and speak to the needs of My devotees.',
  'I shall be active and vigorous even from My tomb.',
  'My mortal remains will speak from My Samadhi.',
  'I am ever living to help and guide all who come to Me, who surrender to Me and who seek refuge in Me.',
  'If you look at Me, I look at you.',
  'If you cast your burden on Me, I shall surely bear it.',
  'If you seek My advice and help, it shall be given to you at once.',
  'There shall be no want in the house of My devotee.',
]

/** The core teaching: two coins only — Shraddha and Saburi. */
export const guidingPrinciples = [
  {
    title: 'Shraddha',
    sanskrit: 'श्रद्धा',
    gloss: 'Unwavering faith',
    body:
      'Not belief in a doctrine but trust in a presence. Baba asked only this of those who came: that they trust Him enough to stop negotiating.',
  },
  {
    title: 'Saburi',
    sanskrit: 'सबुरी',
    gloss: 'Patience that waits without resentment',
    body:
      'Saburi, Baba said, ferries you across. It is courage that does not demand a timetable — the willingness to wait at the door for as long as it takes.',
  },
  {
    title: 'Sabka Malik Ek',
    sanskrit: 'सबका मालिक एक',
    gloss: 'One Master of all',
    body:
      'Hindu and Muslim ate from the same pot in Dwarkamai. Baba kept a fire and a mosque, read the Quran and the Gita, and refused every line drawn between devotees.',
  },
  {
    title: 'Anna Daan',
    sanskrit: 'अन्नदान',
    gloss: 'Feed whoever comes',
    body:
      'Baba begged for food daily and cooked for the whole village from one pot. No one who came hungry to Dwarkamai was asked their name, caste or religion first.',
  },
  {
    title: 'Seva Without Return',
    sanskrit: 'निष्काम सेवा',
    gloss: 'Service expecting nothing',
    body:
      'He swept, ground wheat, tended lamps and nursed the sick Himself. The dakshina He asked for was never money alone — it was the thing you were clinging to.',
  },
  {
    title: 'Udi',
    sanskrit: 'ऊदी',
    gloss: 'All this is ash',
    body:
      'The ash of the Dhuni is His constant sermon: the body and everything it chases will become this. Take it on the forehead and remember what is not ash.',
  },
]

export const babaTimeline = [
  { year: 'c. 1838', title: 'Birth', text: 'Baba’s birth and parentage are unknown. He never confirmed either, saying only that His Guru was everything.' },
  { year: 'c. 1854', title: 'First seen in Shirdi', text: 'A youth of about sixteen is found seated under a neem tree in Shirdi, in deep meditation, for three years. He then leaves.' },
  { year: '1858', title: 'The return — “Ya Sai”', text: 'He returns with the marriage party of Chand Patil. Mhalsapati greets Him: “Ya Sai” — welcome, Sai. The name stays for sixty years.' },
  { year: '1858–1918', title: 'Dwarkamai', text: 'He lives in a ruined mosque He calls Dwarkamai, keeps a perpetual fire, begs food at five houses, and gives Udi to all who come.' },
  { year: '1886', title: 'The three-day samadhi', text: 'Baba tells Mhalsapati to guard His body for three days, leaves it, and returns on the third day exactly as promised.' },
  { year: '1897', title: 'Rama Navami Urs begins', text: 'He permits an Urs at Shirdi and fixes it on Rama Navami, so Hindu and Muslim devotees keep one festival together.' },
  { year: '1910s', title: 'Devotees gather', text: 'Nanasaheb Chandorkar, Kakasaheb Dixit, Das Ganu, Hemadpant and thousands of others come; the Chavadi procession begins.' },
  { year: '15 Oct 1918', title: 'Mahasamadhi', text: 'On Vijayadashami, at about 2:30 in the afternoon, Baba leaves the body in Dwarkamai, saying He is going to His own home.' },
  { year: '1922 →', title: 'The Sansthan and the world', text: 'The Shirdi Sansthan is formed; from one village the sannidhi spreads to every continent, including more than eighty temples in North America.' },
]

export const quotes = [
  { text: 'Why fear when I am here?', source: 'Sai Baba' },
  { text: 'I give people what they want, in the hope that they will begin to want what I have come to give.', source: 'Sai Baba' },
  { text: 'If you cast your burden on Me, I shall surely bear it.', source: 'The Ninth Assurance' },
  { text: 'Be content and cheerful with what comes. That is My advice.', source: 'Sai Baba' },
  { text: 'Unless there is some relationship or connection, nobody goes anywhere.', source: 'Sai Baba' },
  { text: 'Sabka Malik Ek — the Master of all is One.', source: 'Sai Baba' },
  { text: 'Look to Me and I shall look to you.', source: 'The Eighth Assurance' },
  { text: 'Help ever, hurt never. Feed the hungry before you worship Me.', source: 'Sai Baba' },
  { text: 'Two paise are all I ask of you: Shraddha and Saburi.', source: 'Sai Baba' },
  { text: 'My business is to give blessings.', source: 'Sai Baba' },
]
