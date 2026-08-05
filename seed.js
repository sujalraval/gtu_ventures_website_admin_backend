const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const password_hash = await bcrypt.hash('password123', 10);

  const users = [
    { email: 'superadmin@gtu.ac.in', role: 'SUPER_ADMIN' },
    { email: 'editor@gtu.ac.in', role: 'EDITOR' },
    { email: 'contributor@gtu.ac.in', role: 'CONTRIBUTOR' },
    { email: 'viewer@gtu.ac.in', role: 'VIEWER' },
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        email: u.email,
        password_hash,
        role: u.role
      }
    });
  }
  console.log('Database seeded with 4 users.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
