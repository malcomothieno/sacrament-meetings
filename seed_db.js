import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
dotenv.config({ path: 'C:\\Users\\malco\\OneDrive\\Desktop\\C430\\week 2\\.env.local' });
const sql = neon(process.env.DATABASE_URL);

async function seed() {
  await sql`DELETE FROM meetings;`;
  
  const meetingsData = [
    {
      date: '2026-01-04',
      meeting_type: 'regular',
      presiding: 'Bishop Anderson',
      conducting: 'Brother Carter',
      announcements: ['Ward choir practice is Wednesday at 7:00 PM.', 'Please sign up for the service project.'],
      opening_hymn: JSON.stringify({ number: 2, title: 'The Spirit of God' }),
      opening_prayer: 'Sister Nguyen',
      ward_business: JSON.stringify([{ description: 'Release of Brother Lopez.' }, { description: 'Sustaining of Sister Patel.' }]),
      stake_business: false,
      sacrament_hymn: JSON.stringify({ number: 169, title: 'As Now We Take the Sacrament' }),
      speakers: JSON.stringify([{ name: 'Brother Hughes', topic: 'Faith in Jesus Christ', type: 'speaker' }, { name: 'Sister Okafor', topic: 'Serving One Another', type: 'speaker' }]),
      closing_hymn: JSON.stringify({ number: 85, title: 'How Firm a Foundation' }),
      closing_prayer: 'Brother Davis'
    },
    {
      date: '2026-01-11',
      meeting_type: 'testimony',
      presiding: 'Bishop Anderson',
      conducting: 'Brother Carter',
      announcements: ['Fast Sunday: fast offerings may be given.'],
      opening_hymn: JSON.stringify({ number: 3, title: 'Now Let Us Rejoice' }),
      opening_prayer: 'Brother Evans',
      ward_business: JSON.stringify([]),
      stake_business: false,
      sacrament_hymn: JSON.stringify({ number: 172, title: 'In Humility, Our Savior' }),
      speakers: JSON.stringify([]),
      closing_hymn: JSON.stringify({ number: 136, title: 'I Know That My Redeemer Lives' }),
      closing_prayer: 'Sister Brooks'
    },
    {
      date: '2026-01-18',
      meeting_type: 'regular',
      presiding: 'Bishop Anderson',
      conducting: 'Brother Carter',
      announcements: ['Ward temple night is Thursday.'],
      opening_hymn: JSON.stringify({ number: 19, title: 'We Thank Thee, O God, for a Prophet' }),
      opening_prayer: 'Sister Mensah',
      ward_business: JSON.stringify([{ description: 'New members: the Rivera family.' }]),
      stake_business: false,
      sacrament_hymn: JSON.stringify({ number: 169, title: 'As Now We Take the Sacrament' }),
      speakers: JSON.stringify([{ name: 'Sister Johnson', topic: 'The Atonement', type: 'speaker' }, { name: 'Brother Kim', topic: 'Gratitude', type: 'speaker' }]),
      closing_hymn: JSON.stringify({ number: 30, title: 'Come, Come, Ye Saints' }),
      closing_prayer: 'Brother Walker'
    },
    {
      date: '2026-01-25',
      meeting_type: 'general',
      presiding: 'Bishop Anderson',
      conducting: 'Brother Carter',
      announcements: ['General Conference broadcast.'],
      opening_hymn: JSON.stringify({ number: 1, title: 'The Morning Breaks' }),
      opening_prayer: 'Brother Taylor',
      ward_business: JSON.stringify([]),
      stake_business: false,
      sacrament_hymn: JSON.stringify({ number: 172, title: 'In Humility, Our Savior' }),
      speakers: JSON.stringify([]),
      closing_hymn: JSON.stringify({ number: 27, title: 'Praise to the Man' }),
      closing_prayer: 'Sister White'
    },
    {
      date: '2026-02-01',
      meeting_type: 'regular',
      presiding: 'Bishop Anderson',
      conducting: 'Brother Carter',
      announcements: ['Youth fireside on Sunday evening.'],
      opening_hymn: JSON.stringify({ number: 26, title: 'Joseph Smith’s First Prayer' }),
      opening_prayer: 'Brother Harris',
      ward_business: JSON.stringify([]),
      stake_business: false,
      sacrament_hymn: JSON.stringify({ number: 169, title: 'As Now We Take the Sacrament' }),
      speakers: JSON.stringify([{ name: 'Sister Thompson', topic: 'Finding Peace in Christ', type: 'speaker' }, { name: 'Brother Owusu', topic: 'Keeping Covenants', type: 'speaker' }]),
      closing_hymn: JSON.stringify({ number: 85, title: 'How Firm a Foundation' }),
      closing_prayer: 'Sister Hall'
    },
    {
      date: '2026-02-08',
      meeting_type: 'stake',
      presiding: 'President Lewis (Stake Presidency)',
      conducting: 'Brother Carter',
      announcements: ['Stake conference: no ward meetings.'],
      opening_hymn: JSON.stringify({ number: 19, title: 'We Thank Thee, O God, for a Prophet' }),
      opening_prayer: 'To be assigned',
      ward_business: JSON.stringify([]),
      stake_business: true,
      sacrament_hymn: JSON.stringify({ number: 169, title: 'As Now We Take the Sacrament' }),
      speakers: JSON.stringify([{ name: 'President Lewis', topic: 'Stake Goals', type: 'speaker' }]),
      closing_hymn: JSON.stringify({ number: 30, title: 'Come, Come, Ye Saints' }),
      closing_prayer: 'To be assigned'
    },
    {
      date: '2026-02-15',
      meeting_type: 'regular',
      presiding: 'Bishop Anderson',
      conducting: 'Brother Carter',
      announcements: ['Relief Society activity on Tuesday.'],
      opening_hymn: JSON.stringify({ number: 67, title: 'Glory to God on High' }),
      opening_prayer: 'Sister Clark',
      ward_business: JSON.stringify([]),
      stake_business: false,
      sacrament_hymn: JSON.stringify({ number: 178, title: 'O Lord of Hosts' }),
      speakers: JSON.stringify([{ name: 'Brother Martinez', topic: 'Prayer', type: 'speaker' }, { name: 'Sister Young', topic: 'Service', type: 'speaker' }]),
      closing_hymn: JSON.stringify({ number: 152, title: 'God Be With You Till We Meet Again' }),
      closing_prayer: 'Brother Allen'
    },
    {
      date: '2026-02-22',
      meeting_type: 'testimony',
      presiding: 'Bishop Anderson',
      conducting: 'Brother Carter',
      announcements: ['Fast Sunday meeting.'],
      opening_hymn: JSON.stringify({ number: 70, title: 'Sing We Now at Parting' }),
      opening_prayer: 'Brother King',
      ward_business: JSON.stringify([]),
      stake_business: false,
      sacrament_hymn: JSON.stringify({ number: 169, title: 'As Now We Take the Sacrament' }),
      speakers: JSON.stringify([]),
      closing_hymn: JSON.stringify({ number: 134, title: 'I Believe in Christ' }),
      closing_prayer: 'Sister Wright'
    }
  ];

  for (const m of meetingsData) {
    await sql`
      INSERT INTO meetings (
        date, meeting_type, presiding, conducting, announcements, 
        opening_hymn, opening_prayer, ward_business, stake_business, 
        sacrament_hymn, speakers, closing_hymn, closing_prayer
      ) VALUES (
        ${m.date}, ${m.meeting_type}, ${m.presiding}, ${m.conducting}, ${m.announcements},
        ${m.opening_hymn}::jsonb, ${m.opening_prayer}, ${m.ward_business}::jsonb, ${m.stake_business},
        ${m.sacrament_hymn}::jsonb, ${m.speakers}::jsonb, ${m.closing_hymn}::jsonb, ${m.closing_prayer}
      )
      ON CONFLICT (date) DO NOTHING;
    `;
  }
  console.log('Database successfully seeded with 8 meetings!');
}
seed().catch(console.error);