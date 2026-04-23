import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding KidDok database...');

  // ─── 1. Create a test parent user ───────────────────────────────
  const hashedPassword = await bcrypt.hash('password123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'test@kiddok.app' },
    update: {},
    create: {
      email: 'test@kiddok.app',
      password: hashedPassword,
      name: 'Test Parent',
      pin: '1234',
    },
  });
  console.log(`✅ Created user: ${user.email}`);

  // ─── 2. Create parent profile ───────────────────────────────────
  await prisma.parentProfile.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      name: 'Test',
      surname: 'Parent',
      phone: '+355691234567',
      userId: user.id,
    },
  });
  console.log('✅ Created parent profile');

  // ─── 3. Create 2 children ────────────────────────────────────────
  const child1 = await prisma.child.upsert({
    where: { id: '11111111-1111-1111-1111-111111111111' },
    update: {},
    create: {
      id: '11111111-1111-1111-1111-111111111111',
      name: 'Leona Bompa',
      dateOfBirth: new Date('2022-03-15'),
      gender: 'F',
      bloodType: 'A+',
      birthWeight: 3.2,
      deliveryDoctor: 'Dr. Arben Hoxha',
      criticalAllergies: 'Peanuts',
      allergies: 'Dust, pollen',
      medicalNotes: 'Regular checkups. No major concerns.',
      avatarSeed: 'leona',
      userId: user.id,
    },
  });

  const child2 = await prisma.child.upsert({
    where: { id: '22222222-2222-2222-2222-222222222222' },
    update: {},
    create: {
      id: '22222222-2222-2222-2222-222222222222',
      name: 'Flavio Bompa',
      dateOfBirth: new Date('2024-01-08'),
      gender: 'M',
      bloodType: 'O-',
      birthWeight: 4.1,
      deliveryDoctor: 'Dr. Elena Doko',
      criticalAllergies: null,
      allergies: null,
      medicalNotes: 'Baby teeth emerging normally.',
      avatarSeed: 'flavio',
      userId: user.id,
    },
  });
  console.log(`✅ Created children: ${child1.name}, ${child2.name}`);

  // ─── 4. Temperature entries ─────────────────────────────────────
  const tempData = [
    { childId: child1.id, temperature: 37.1, measuredAt: new Date('2026-04-20T08:00:00'), location: ' armpit', notes: 'Morning check — normal' },
    { childId: child1.id, temperature: 37.4, measuredAt: new Date('2026-04-21T08:30:00'), location: 'mouth', notes: 'After sleep' },
    { childId: child1.id, temperature: 38.2, measuredAt: new Date('2026-04-21T14:00:00'), location: 'ear', notes: 'Fever — gave Nurofen' },
    { childId: child1.id, temperature: 37.6, measuredAt: new Date('2026-04-22T08:00:00'), location: ' armpit', notes: 'Fever declining' },
    { childId: child1.id, temperature: 36.9, measuredAt: new Date('2026-04-23T08:00:00'), location: 'ear', notes: 'Back to normal ✅' },
    { childId: child2.id, temperature: 36.8, measuredAt: new Date('2026-04-22T09:00:00'), location: 'armpit', notes: null },
    { childId: child2.id, temperature: 37.0, measuredAt: new Date('2026-04-23T09:00:00'), location: 'armpit', notes: null },
  ];

  for (const t of tempData) {
    await prisma.temperatureEntry.create({ data: t });
  }
  console.log(`✅ Created ${tempData.length} temperature entries`);

  // ─── 5. Growth entries ───────────────────────────────────────────
  const growthData = [
    { childId: child1.id, height: 86.0, weight: 12.5, measuredAt: new Date('2026-01-15'), notes: '3-month checkup' },
    { childId: child1.id, height: 88.5, weight: 13.1, measuredAt: new Date('2026-02-15'), notes: null },
    { childId: child1.id, height: 91.0, weight: 13.8, measuredAt: new Date('2026-03-15'), notes: 'Growing well 📈' },
    { childId: child1.id, height: 93.2, weight: 14.2, measuredAt: new Date('2026-04-15'), notes: null },
    { childId: child2.id, height: 62.0, weight: 5.8, measuredAt: new Date('2026-01-08'), notes: '6-month checkup' },
    { childId: child2.id, height: 66.5, weight: 6.4, measuredAt: new Date('2026-02-08'), notes: null },
    { childId: child2.id, height: 70.0, weight: 7.1, measuredAt: new Date('2026-03-08'), notes: 'Sitting up now 🏋️' },
    { childId: child2.id, height: 73.5, weight: 7.8, measuredAt: new Date('2026-04-08'), notes: null },
  ];

  for (const g of growthData) {
    await prisma.growthEntry.create({ data: g });
  }
  console.log(`✅ Created ${growthData.length} growth entries`);

  // ─── 6. Vaccine records ─────────────────────────────────────────
  const vaccineData = [
    {
      childId: child1.id,
      name: 'MMR',
      dateAdministered: new Date('2023-03-15'),
      dueDate: new Date('2023-03-15'),
      provider: 'Pediatra 1',
      completed: true,
      notes: 'No side effects',
    },
    {
      childId: child1.id,
      name: 'DTaP',
      dateAdministered: new Date('2024-03-15'),
      dueDate: new Date('2024-03-15'),
      provider: 'Pediatra 1',
      completed: true,
      notes: null,
    },
    {
      childId: child1.id,
      name: 'Hepatitis B',
      dateAdministered: null,
      dueDate: new Date('2026-06-15'),
      provider: null,
      completed: false,
      notes: 'Due in 2 months',
    },
    {
      childId: child1.id,
      name: 'Varicella',
      dateAdministered: null,
      dueDate: new Date('2026-05-01'),
      provider: null,
      completed: false,
      notes: 'Upcoming',
    },
    {
      childId: child2.id,
      name: 'Hepatitis B',
      dateAdministered: new Date('2024-01-10'),
      dueDate: new Date('2024-01-10'),
      provider: 'Pediatra 2',
      completed: true,
      notes: null,
    },
    {
      childId: child2.id,
      name: 'DTaP',
      dateAdministered: null,
      dueDate: new Date('2026-05-08'),
      provider: null,
      completed: false,
      notes: 'Due soon',
    },
  ];

  for (const v of vaccineData) {
    await prisma.vaccine.create({ data: v });
  }
  console.log(`✅ Created ${vaccineData.length} vaccine records`);

  // ─── 7. Diary entries ───────────────────────────────────────────
  const diaryData = [
    { childId: child1.id, type: 'symptom', description: 'Runny nose, mild cough', severity: 'mild', loggedAt: new Date('2026-04-20'), notes: 'No fever' },
    { childId: child1.id, type: 'meal', description: 'Oatmeal with banana, apple juice', severity: null, loggedAt: new Date('2026-04-20'), notes: 'Good appetite' },
    { childId: child1.id, type: 'sleep', description: 'Nap 1h 30m, slept 9h overnight', severity: null, loggedAt: new Date('2026-04-21'), notes: 'Fever disrupted sleep' },
    { childId: child1.id, type: 'mood', description: 'Fussy in afternoon, cheered up after medicine', severity: null, loggedAt: new Date('2026-04-21'), notes: null },
    { childId: child1.id, type: 'activity', description: 'Played in garden for 30 min', severity: null, loggedAt: new Date('2026-04-22'), notes: 'Weather was nice ☀️' },
    { childId: child1.id, type: 'symptom', description: 'Fever spike 38.5°C — gave Nurofen', severity: 'moderate', loggedAt: new Date('2026-04-21T14:30:00'), notes: 'Response within 30 min' },
    { childId: child2.id, type: 'meal', description: 'Pureed carrots, rice cereal', severity: null, loggedAt: new Date('2026-04-22'), notes: 'First time with carrots 🥕' },
    { childId: child2.id, type: 'sleep', description: '3 naps, total 4h day sleep', severity: null, loggedAt: new Date('2026-04-22'), notes: null },
    { childId: child2.id, type: 'activity', description: 'Started crawling commando-style', severity: null, loggedAt: new Date('2026-04-23'), notes: 'So fast!' },
  ];

  for (const d of diaryData) {
    await prisma.diaryEntry.create({ data: d });
  }
  console.log(`✅ Created ${diaryData.length} diary entries`);

  // ─── 8. Illness episodes ────────────────────────────────────────
  const illnessData = [
    {
      childId: child1.id,
      title: 'Spring Cold',
      symptoms: 'Runny nose, mild cough, low-grade fever',
      medications: 'Nurofen (as needed)',
      notes: 'Recovered within 4 days',
      loggedAt: new Date('2026-04-20'),
    },
    {
      childId: child1.id,
      title: 'Ear Infection',
      symptoms: 'Ear pain, fever 38.2°C, fussiness',
      medications: 'Amoxicillin (prescribed), Nurofen',
      notes: 'Follow-up in 1 week needed',
      loggedAt: new Date('2026-04-21'),
    },
  ];

  for (const i of illnessData) {
    await prisma.illnessEpisode.create({ data: i });
  }
  console.log(`✅ Created ${illnessData.length} illness episodes`);

  // ─── 9. Medications ─────────────────────────────────────────────
  const medData = [
    {
      childId: child1.id,
      name: 'Amoxicillin',
      dosage: '250mg',
      frequency: '3x daily',
      startDate: new Date('2026-04-21'),
      endDate: new Date('2026-04-28'),
      prescribedBy: 'Dr. Arben Hoxha',
      notes: 'Complete full course',
      active: true,
    },
    {
      childId: child1.id,
      name: 'Nurofen',
      dosage: '5ml',
      frequency: 'As needed (max 4x/day)',
      startDate: new Date('2026-04-20'),
      endDate: null,
      prescribedBy: null,
      notes: 'For fever > 38°C',
      active: true,
    },
  ];

  for (const m of medData) {
    await prisma.medication.create({ data: m });
  }
  console.log(`✅ Created ${medData.length} medications`);

  // ─── 10. Appointments ────────────────────────────────────────────
  const apptData = [
    {
      childId: child1.id,
      title: 'Pediatric Checkup',
      doctorName: 'Dr. Arben Hoxha',
      location: 'Spitali Universitar',
      dateTime: new Date('2026-05-15T10:00:00'),
      notes: 'Annual checkup',
    },
    {
      childId: child1.id,
      title: 'ENT Follow-up',
      doctorName: 'Dr. Elena Doko',
      location: 'Klinikë Syd',
      dateTime: new Date('2026-04-28T14:30:00'),
      notes: 'Post ear infection check',
    },
    {
      childId: child2.id,
      title: 'Vaccine Appointment',
      doctorName: 'Dr. Pedi',
      location: 'Qendra Shëndetësore 2',
      dateTime: new Date('2026-05-08T09:00:00'),
      notes: 'DTaP vaccine',
    },
  ];

  for (const a of apptData) {
    await prisma.appointment.create({ data: a });
  }
  console.log(`✅ Created ${apptData.length} appointments`);

  // ─── 11. Family member (shared access) ──────────────────────────
  await prisma.familyMember.upsert({
    where: { userId_childId: { userId: user.id, childId: child1.id } },
    update: {},
    create: {
      userId: user.id,
      childId: child1.id,
      role: 'parent',
    },
  });
  console.log('✅ Created family member link');

  console.log('\n🎉 Seed complete!');
  console.log(`   Login: test@kiddok.app / password123`);
  console.log(`   PIN: 1234`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
