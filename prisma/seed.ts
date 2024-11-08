import { db } from "../src/server/db";
import { AccountType, PrismaClient } from "@prisma/client";
import { saltAndHashPassword } from "@/utils/password";

const prisma = new PrismaClient();
async function main() {
  // Create 2 organizer accounts
  await prisma.organizer.create({
    data: {
      name: "John Doe",
      email: "pengetesz@gmail.com",
      account: {
        create: {
          username: "johndoe",
          ...saltAndHashPassword("password123"),
          type: "ORGANIZER",
        },
      },
    },
  });

  await prisma.organizer.create({
    data: {
      name: "Jane Smith",
      account: {
        create: {
          username: "janesmith",
          ...saltAndHashPassword("password456"),
          type: "ORGANIZER",
        },
      },
    },
  });

  // Create 2 school accounts
  const school1 = await prisma.school.create({
    data: {
      name: "Acme High School",
      address: "123 Main St, Anytown USA",
      contactName: "Principal Johnson",
      contactEmail: "principal@acmehigh.edu",
      account: {
        create: {
          username: "acmehigh",
          ...saltAndHashPassword("schoolpassword"),
          type: "SCHOOL",
        },
      },
    },
  });

  const school2 = await prisma.school.create({
    data: {
      name: "Globex University",
      address: "456 Park Ave, Bigcity NY",
      contactName: "Dean Richards",
      contactEmail: "dean@globexu.edu",
      account: {
        create: {
          username: "globexu",
          ...saltAndHashPassword("schoolpassword2"),
          type: "SCHOOL",
        },
      },
    },
  });

  const tech1 = await prisma.technology.create({
    data: {
      name: "Next.js",
    },
  });

  const tech2 = await prisma.technology.create({
    data: {
      name: "PHP",
    },
  });

  const tech3 = await prisma.technology.create({
    data: {
      name: "Angular",
    },
  });

  const tech4 = await prisma.technology.create({
    data: {
      name: "Laravel",
    },
  });

  const tech5 = await prisma.technology.create({
    data: {
      name: "Vanilla JS",
    },
  });

  // create 3 categories
  const category1 = await prisma.category.create({
    data: {
      name: "Web Development",
      description: "Building websites and web applications",
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: "Mobile Development",
      description: "Building mobile apps for iOS and Android",
    },
  });

  const category3 = await prisma.category.create({
    data: {
      name: "Game Development",
      description: "Creating video games for PC and consoles",
    },
  });

  const competition = await prisma.competition.create({
    data: {
      name: "Coding Challenge 2024",
      description: "A competitive coding event for high school students",
      maxTeamSize: 3,
      image: "https://picsum.photos/200/300",
      deadline: new Date("2024-11-30"),
      technologies: {
        connect: [
          { id: tech1.id },
          { id: tech2.id },
          { id: tech3.id },
          { id: tech4.id },
          { id: tech5.id },
        ],
      },
      categories: {
        connect: [{ id: category1.id }, { id: category2.id }],
      },
    },
  });

  // Create 3 team accounts
  await prisma.team.create({
    data: {
      name: "Tech Titans",
      status: "APPROVED_BY_SCHOOL",
      school: {
        connect: { id: school1.id },
      },
      Competition: {
        connect: { id: competition.id },
      },
      account: {
        create: {
          username: "techtitans",
          ...saltAndHashPassword("teampassword"),
          type: "TEAM" as AccountType,
        },
      },
      members: {
        create: [
          { name: "Alice Anderson", year: 12 },
          { name: "Bob Barker", year: 11 },
          { name: "Charlie Chen", year: 10 },
        ],
      },
      coaches: {
        create: [
          { name: "Coach Doe", School: { connect: { id: school1.id } } },
        ],
      },
    },
  });

  await prisma.team.create({
    data: {
      name: "Coding Crusaders",
      status: "APPROVED_BY_ORGANIZER",
      Competition: {
        connect: { id: competition.id },
      },
      school: {
        connect: { id: school2.id },
      },
      account: {
        create: {
          username: "codingcrusaders",
          ...saltAndHashPassword("teampassword2"),
          type: "TEAM",
        },
      },
      members: {
        create: [
          { name: "Dave Davis", year: 12 },
          { name: "Eve Ericsson", year: 11 },
          { name: "Fiona Fox", year: 11 },
          { name: "Frank Fong", year: 10, isReserve: true },
        ],
      },
      coaches: {
        create: [
          { name: "Coach Smith", School: { connect: { id: school2.id } } },
        ],
      },
    },
  });

  await prisma.team.create({
    data: {
      name: "Byte Breakers",
      status: "REGISTERED",
      Competition: {
        connect: { id: competition.id },
      },
      school: {
        connect: { id: school2.id },
      },
      account: {
        create: {
          username: "bytebreakers",
          ...saltAndHashPassword("teampassword3"),
          type: "TEAM" as AccountType,
        },
      },
      members: {
        create: [
          { name: "Gina Garcia", year: 12 },
          { name: "Hannah Hsu", year: 11 },
          { name: "Ivan Ivanov", year: 10 },
        ],
      },
      coaches: {
        create: [
          { name: "Coach Johnson", School: { connect: { id: school1.id } } },
        ],
      },
    },
  });

  console.log("Seed data created successfully!");
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
