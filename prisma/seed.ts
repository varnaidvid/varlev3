import { db } from "../src/server/db";
import { AccountType, PrismaClient } from "@prisma/client";
import { saltAndHashPassword } from "@/utils/password";
import { Account } from "next-auth";

const prisma = new PrismaClient();
async function main() {
  // Create 2 organizer accounts
  const organizer1 = await prisma.organizer.create({
    data: {
      name: "Nagy János",
      account: {
        create: {
          emails: {
            create: {
              email: "nagyjanos@varlev3.hu",
            },
          },
          username: "nagyjanos",
          ...saltAndHashPassword("password123"),
          type: "ORGANIZER",
        },
      },
    },
  });

  await prisma.organizer.create({
    data: {
      name: "Kis Éva",
      account: {
        create: {
          emails: {
            create: {
              email: "kiseva@varlev3.hu",
            },
          },
          username: "kiseva",
          ...saltAndHashPassword("password456"),
          type: "ORGANIZER",
        },
      },
    },
  });

  // Create 2 school accounts
  const school1 = await prisma.school.create({
    data: {
      name: "Neumann János Gimnázium",
      address: "1144 Budapest, Kerepesi út 124.",
      contactName: "Dr. Kovács István",
      account: {
        create: {
          emails: {
            create: {
              email: "neumanngimi@varlev3.hu",
            },
          },
          username: "neumanngimi",
          ...saltAndHashPassword("schoolpassword"),
          type: "SCHOOL",
        },
      },
    },
  });

  const school2 = await prisma.school.create({
    data: {
      name: "Jedlik Ányos Gimnázium",
      address: "9021 Győr, Szent István út 7.",
      contactName: "Dr. Szabó Mária",
      account: {
        create: {
          emails: {
            create: {
              email: "jedlik@varlev3.hu",
            },
          },
          username: "jedlik",
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
      name: "Programozás",
      description: "Building websites and web applications",
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: "Filozófia",
      description: "Building mobile apps for iOS and Android",
    },
  });

  const category3 = await prisma.category.create({
    data: {
      name: "Metafizika",
      description: "Building mobile apps for iOS and Android",
    },
  });

  const category4 = await prisma.category.create({
    data: {
      name: "Kvantumelmélet Kvízek",
      description: "Building mobile apps for iOS and Android",
    },
  });

  const competition = await prisma.competition.create({
    data: {
      name: "Országos Középiskolai Web Programozó Verseny 2024",
      description: `
    <h2>Országos Középiskolai Web Programozó Verseny 2024</h2>
    
    <h3>A versenyről</h3>
    <p>Az idei versenyen a középiskolás diákok modern webes technológiák használatával mérhetik össze tudásukat. A résztvevők valós, ipari környezetben használt eszközökkel dolgozhatnak, a Next.js-től a Laravel-ig.</p>
    
    <h3>Amit kínálunk</h3>
    <ul>
        <li>Szakmai zsűri értékelése</li>
        <li>Értékes nyeremények</li>
        <li>Kapcsolatépítési lehetőség IT cégekkel</li>
        <li>Mentor program a döntőbe jutott csapatoknak</li>
    </ul>
    
    <h3>Követelmények</h3>
    <ul>
        <li>3 fős csapatok</li>
        <li>Középiskolai tanulói jogviszony</li>
        <li>Alapszintű programozási ismeretek</li>
    </ul>
    
    <p>A verseny során a csapatok egy komplex webalkalmazást fejlesztenek, ahol nem csak a technikai tudás, hanem a kreativitás és a csapatmunka is értékelésre kerül.</p>
`,
      maxTeamSize: 3,
      image:
        "https://ik.imagekit.io/varlev3/competition-images/ccjdeb3qm60w2i584aftxwxn_-fmbJH2Ay.png?updatedAt=1731169073642",
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
      organizers: {
        connect: [{ id: organizer1.id }],
      },
    },
  });

  // create 2 subCategories for competition1
  const subCategory1 = await prisma.subCategory.create({
    data: {
      name: "Webfejlesztés",
      Competition: {
        connect: { id: competition.id },
      },
    },
  });
  const subCategory2 = await prisma.subCategory.create({
    data: {
      name: "Mobilfejlesztés",
      Competition: {
        connect: { id: competition.id },
      },
    },
  });
  const subCategory3 = await prisma.subCategory.create({
    data: {
      name: "Nagypapa Parodoxon",
      Competition: {
        connect: { id: competition.id },
      },
    },
  });

  // create 4 coach accounts for school1
  const coach1 = await prisma.coach.create({
    data: {
      name: "Molnár Gábor",
      School: {
        connect: { id: school1.id },
      },
    },
  });
  const coach2 = await prisma.coach.create({
    data: {
      name: "Takács Zoltán",
      School: {
        connect: { id: school1.id },
      },
    },
  });
  const coach3 = await prisma.coach.create({
    data: {
      name: "Szabó János",
      School: {
        connect: { id: school1.id },
      },
    },
  });
  const coach4 = await prisma.coach.create({
    data: {
      name: "Lakatos Péter",
      School: {
        connect: { id: school1.id },
      },
    },
  });

  // create 3 coach accounts for school2
  const coach5 = await prisma.coach.create({
    data: {
      name: "Kovács Péter",
      School: {
        connect: { id: school2.id },
      },
    },
  });
  const coach6 = await prisma.coach.create({
    data: {
      name: "Nagy Gábor",
      School: {
        connect: { id: school2.id },
      },
    },
  });
  const coach7 = await prisma.coach.create({
    data: {
      name: "Kiss János",
      School: {
        connect: { id: school2.id },
      },
    },
  });

  // Create 3 team accounts
  const team1 = await prisma.team.create({
    data: {
      name: "Kódvadászok",
      status: "REJECTED_BY_ORGANIZER",
      school: {
        connect: { id: school1.id },
      },
      technologies: {
        connect: [{ id: tech1.id }, { id: tech2.id }],
      },
      Competition: {
        connect: { id: competition.id },
      },
      account: {
        create: {
          emails: {
            create: {
              email: "kodvadaszok@varlev3.hu",
            },
          },
          username: "kodvadaszok",
          ...saltAndHashPassword("teampassword"),
          type: "TEAM" as AccountType,
        },
      },
      SubCategory: {
        connect: { id: subCategory1.id },
      },
      members: {
        create: [
          { name: "Horváth Anna", year: 12 },
          { name: "Török Bence", year: 11 },
          { name: "Németh Csaba", year: 10 },
        ],
      },
      createdAt: new Date("2024-11-09"),
      coaches: {
        connect: [{ id: coach1.id }, { id: coach2.id }],
      },
      applicationForm:
        "https://ik.imagekit.io/varlev3/competition-images/ccjdeb3qm60w2i584aftxwxn_-fmbJH2Ay.png",
    },
  });

  const team2 = await prisma.team.create({
    data: {
      name: "BitMesterek",
      status: "WAITING_FOR_SCHOOL_APPROVAL",
      Competition: {
        connect: { id: competition.id },
      },
      technologies: {
        connect: [{ id: tech3.id }, { id: tech4.id }],
      },
      school: {
        connect: { id: school1.id },
      },
      account: {
        create: {
          emails: {
            create: {
              email: "bitmesterek@varlev3.hu",
            },
          },
          username: "bitmesterek",
          ...saltAndHashPassword("teampassword2"),
          type: "TEAM",
        },
      },
      members: {
        create: [
          { name: "Varga Dániel", year: 12 },
          { name: "Szilágyi Eszter", year: 11 },
          { name: "Fekete Ferenc", year: 11 },
          { name: "Papp Petra", year: 10, isReserve: true },
        ],
      },
      SubCategory: {
        connect: { id: subCategory1.id },
      },
      createdAt: new Date("2024-11-05"),
      coaches: {
        connect: [{ id: coach2.id }, { id: coach3.id }],
      },
    },
  });

  const team3 = await prisma.team.create({
    data: {
      name: "WebVirtuózok",
      status: "REGISTERED",
      Competition: {
        connect: { id: competition.id },
      },
      technologies: {
        connect: [{ id: tech1.id }, { id: tech5.id }],
      },
      school: {
        connect: { id: school1.id },
      },
      account: {
        create: {
          emails: {
            create: {
              email: "webvirtuozok@varlev3.hu",
            },
          },
          username: "webvirtuozok",
          ...saltAndHashPassword("teampassword3"),
          type: "TEAM" as AccountType,
        },
      },
      SubCategory: {
        connect: { id: subCategory1.id },
      },
      members: {
        create: [
          { name: "Kiss Gergő", year: 12 },
          { name: "Tóth Hanna", year: 11 },
          { name: "Nagy István", year: 10 },
        ],
      },
      createdAt: new Date("2024-11-08"),
      coaches: {
        connect: [{ id: coach2.id }, { id: coach4.id }],
      },
    },
  });

  // create two team for school2
  const team4 = await prisma.team.create({
    data: {
      name: "Vanilla JS Mesterek",
      status: "WAITING_FOR_SCHOOL_APPROVAL",
      Competition: {
        connect: { id: competition.id },
      },
      technologies: {
        connect: [{ id: tech5.id }],
      },
      school: {
        connect: { id: school2.id },
      },
      createdAt: new Date("2024-10-04"),
      coaches: {
        connect: [{ id: coach5.id }],
      },
      SubCategory: {
        connect: { id: subCategory1.id },
      },
      members: {
        create: [
          { name: "Kovács Gábor", year: 12 },
          { name: "Nagy Péter", year: 11 },
          { name: "Kiss János", year: 10 },
        ],
      },
      account: {
        create: {
          emails: {
            create: {
              email: "vanillajsmesterek@varlev3.hu",
            },
          },
          username: "vanillajsmesterek",
          ...saltAndHashPassword("teampassword4"),
          type: "TEAM" as AccountType,
        },
      },
    },
  });
  const team5 = await prisma.team.create({
    data: {
      name: "Angular Mesterek",
      status: "WAITING_FOR_SCHOOL_APPROVAL",
      Competition: {
        connect: { id: competition.id },
      },
      technologies: {
        connect: [{ id: tech3.id }],
      },
      school: {
        connect: { id: school2.id },
      },
      createdAt: new Date("2024-10-20"),
      coaches: {
        connect: [{ id: coach5.id }, { id: coach6.id }],
      },
      SubCategory: {
        connect: { id: subCategory1.id },
      },
      members: {
        create: [
          { name: "Kovács Gábor", year: 12 },
          { name: "Nagy Péter", year: 11 },
          { name: "Kiss János", year: 10 },
        ],
      },
      account: {
        create: {
          emails: {
            create: {
              email: "angular.mesterek@varlev3.hu",
            },
          },
          username: "angularmesterek",
          ...saltAndHashPassword("teampassword5"),
          type: "TEAM" as AccountType,
        },
      },
    },
  });
  const team6 = await prisma.team.create({
    data: {
      name: "PHP Mesterek",
      status: "WAITING_FOR_ORGANIZER_APPROVAL",
      Competition: {
        connect: { id: competition.id },
      },
      technologies: {
        connect: [{ id: tech2.id }],
      },
      school: {
        connect: { id: school2.id },
      },
      createdAt: new Date("2024-10-04"),
      coaches: {
        connect: [{ id: coach5.id }, { id: coach7.id }],
      },
      SubCategory: {
        connect: { id: subCategory1.id },
      },
      members: {
        create: [
          { name: "Kovács Gábor", year: 12 },
          { name: "Nagy Péter", year: 11 },
          { name: "Kiss János", year: 10 },
        ],
      },
      account: {
        create: {
          emails: {
            create: {
              email: "php.mesterek@varlev3.hu",
            },
          },
          username: "phpmesterek",
          ...saltAndHashPassword("teampassword6"),
          type: "TEAM" as AccountType,
        },
      },
    },
  });

  // seed team registered notifications for team4 and team5 and team6 for school2
  await prisma.notification.createMany({
    data: [
      {
        subject: "Új csapat regisztrált",
        message: "A Vanilla JS Mesterek csapat regisztrált egy versenyre.",
        topic: "TEAM_REGISTERED",
        type: "INFO",
        status: "UNREAD",
        createdAt: new Date("2024-11-08"),
        receiverAccountId: school2.accountId,
        senderAccountId: team4.accountId,
      },
      {
        subject: "Új csapat regisztrált",
        message: "Az Angular Mesterek csapat regisztrált egy versenyre.",
        topic: "TEAM_REGISTERED",
        type: "INFO",
        status: "UNREAD",
        createdAt: new Date("2024-10-20"),
        receiverAccountId: school2.accountId,
        senderAccountId: team5.accountId,
      },
      {
        subject: "Új csapat regisztrált",
        message: "A PHP Mesterek csapat regisztrált egy versenyre.",
        topic: "TEAM_REGISTERED",
        type: "INFO",
        status: "UNREAD",
        createdAt: new Date("2024-10-04"),
        receiverAccountId: school2.accountId,
        senderAccountId: team6.accountId,
      },
      {
        subject: "Iskolai jóváhagyás megtörtént",
        message: "Sikeresen jóváhagyta az iskolád a jelentkezésedet.",
        topic: "TEAM_APPROVED_BY_SCHOOL",
        type: "SUCCESS",
        status: "UNREAD",
        createdAt: new Date("2024-10-09"),
        receiverAccountId: team6.accountId,
        senderAccountId: school2.accountId,
      },
      {
        subject: "Iskolai jóváhagyás megtörtént",
        message: "Kódvadászok csapat el lett fogadva az iskolája által.",
        topic: "TEAM_APPROVED_BY_SCHOOL",
        type: "SUCCESS",
        status: "UNREAD",
        createdAt: new Date("2024-10-09"),
        receiverAccountId: organizer1.accountId,
        senderAccountId: school2.accountId,
      },
    ],
  });

  // seed notifications
  await prisma.notification.createMany({
    data: [
      {
        subject: "Új csapat regisztrált",
        message: "A WebVirtuózok csapat regisztrált egy versenyre.",
        topic: "TEAM_REGISTERED",
        type: "INFO",
        status: "UNREAD",
        createdAt: new Date("2024-11-08"),
        receiverAccountId: school1.accountId,
        senderAccountId: team3.accountId,
      },
      {
        subject: "Új csapat regisztrált",
        message: "A BitMesterek csapat regisztrált egy versenyre.",
        topic: "TEAM_REGISTERED",
        type: "INFO",
        status: "UNREAD",
        createdAt: new Date("2024-11-08"),
        receiverAccountId: school1.accountId,
        senderAccountId: team2.accountId,
      },
      {
        subject: "Új csapat regisztrált",
        message: "A Kódvadászok csapat regisztrált egy versenyre.",
        topic: "TEAM_REGISTERED",
        type: "INFO",
        status: "UNREAD",
        createdAt: new Date("2024-11-09"),
        receiverAccountId: school2.accountId,
        senderAccountId: team1.accountId,
      },
      {
        subject: "Iskolai jóváhagyás megtörtént",
        message: "Sikeresen jóváhagyta az iskolád a jelentkezésedet.",
        topic: "TEAM_APPROVED_BY_SCHOOL",
        type: "SUCCESS",
        status: "UNREAD",
        createdAt: new Date("2024-11-09"),
        receiverAccountId: team1.accountId,
        senderAccountId: school2.accountId,
      },
      {
        subject: "Iskolai jóváhagyás megtörtént",
        message: "Kódvadászok csapat el lett fogadva az iskolája által.",
        topic: "TEAM_APPROVED_BY_SCHOOL",
        type: "SUCCESS",
        status: "UNREAD",
        createdAt: new Date("2024-11-09"),
        receiverAccountId: organizer1.accountId,
        senderAccountId: school2.accountId,
      },
      {
        subject: "Kódvadászok csapatnak hiánypótlás szükséges",
        message: "Kérjük módosítsák a felhasznált tecnológiákat.",
        topic: "TEAM_REJECTED_BY_ORGANIZER",
        type: "ERROR",
        status: "UNREAD",
        createdAt: new Date("2024-11-10"),
        receiverAccountId: team1.accountId,
        senderAccountId: organizer1.accountId,
      },
    ],
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
