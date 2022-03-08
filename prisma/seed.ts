// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const sportCategory = await prisma.category.create({
    data: {
      name: 'Sports',
    },
  });

  const gamesCategory = await prisma.category.create({
    data: {
      name: 'Games',
    },
  });

  const booksCategory = await prisma.category.create({
    data: {
      name: 'Books',
    },
  });

  const item1 = await prisma.item.create({
    data: {
      name: 'Bicycle',
      description: 'A nice bicycle',
      price: 50,
      slug: 'bicycle',
      published: true,
      category: {
        connect: {
          id: sportCategory.id,
        },
      },
    },
  });

  const item2 = await prisma.item.create({
    data: {
      name: 'DualShock 4',
      description: 'PS4 Remote Control',
      price: 20,
      slug: 'dualshock-4',
      published: true,
      category: {
        connect: {
          id: gamesCategory.id,
        },
      },
    },
  });

  const item3 = await prisma.item.create({
    data: {
      name: 'Guitar',
      description: 'A very good guitar',
      price: 20,
      slug: 'guitar',
      published: true,
      category: {
        create: {
          name: 'Music',
        },
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
