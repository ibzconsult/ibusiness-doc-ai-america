// prisma/seed.ts - Database seeding for feature flags and initial config

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create feature flags
  const featureFlags = [
    {
      key: 'chat_enabled',
      description: 'Enable chatbot widget on website',
      enabled: true,
      rolloutPercentage: 100,
    },
    {
      key: 'form_submissions_enabled',
      description: 'Enable lead capture form',
      enabled: true,
      rolloutPercentage: 100,
    },
    {
      key: 'emergency_detection',
      description: 'Enable emergency keyword detection in chat',
      enabled: true,
      rolloutPercentage: 100,
    },
    {
      key: 'conversation_logging',
      description: 'Log all conversations for audit purposes',
      enabled: true,
      rolloutPercentage: 100,
    },
    {
      key: 'phi_detection',
      description: 'Detect and flag messages containing PHI',
      enabled: true,
      rolloutPercentage: 100,
    },
  ];

  for (const flag of featureFlags) {
    const existing = await prisma.featureFlag.findUnique({
      where: { key: flag.key },
    });

    if (!existing) {
      await prisma.featureFlag.create({
        data: flag,
      });
      console.log(`✅ Created feature flag: ${flag.key}`);
    } else {
      console.log(`⏭️  Feature flag already exists: ${flag.key}`);
    }
  }

  console.log('✅ Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
