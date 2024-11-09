import { db } from "../src/server/db";
import { AccountType, PrismaClient } from "@prisma/client";
import { saltAndHashPassword } from "@/utils/password";

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
              email: "thevarlev3@gmail.com",
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
              email: "thevarlev3@gmail.com",
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
              email: "thevarlev3@gmail.com",
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
              email: "thevarlev3@gmail.com",
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
              email: "thevarlev3@gmail.com",
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
      coaches: {
        create: [
          { name: "Molnár Gábor", School: { connect: { id: school1.id } } },
        ],
      },
      applicationForm:
        "https://ik.imagekit.io/varlev3/competition-images/ccjdeb3qm60w2i584aftxwxn_-fmbJH2Ay.png",
    },
  });

  await prisma.team.create({
    data: {
      name: "BitMesterek",
      status: "APPROVED_BY_SCHOOL",
      Competition: {
        connect: { id: competition.id },
      },
      technologies: {
        connect: [{ id: tech3.id }, { id: tech4.id }],
      },
      school: {
        connect: { id: school2.id },
      },
      account: {
        create: {
          emails: {
            create: {
              email: "thevarlev3@gmail.com",
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
      coaches: {
        create: [
          { name: "Takács Zoltán", School: { connect: { id: school2.id } } },
        ],
      },
    },
  });

  await prisma.team.create({
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
        connect: { id: school2.id },
      },
      account: {
        create: {
          emails: {
            create: {
              email: "thevarlev3@gmail.com",
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
      coaches: {
        create: [
          { name: "Szabó János", School: { connect: { id: school1.id } } },
        ],
      },
    },
  });

  // seed notifications
  await prisma.notification.createMany({
    data: [
      {
        subject: "Új csapat regisztrált",
        message: "A WebVirtuózok csapat regisztrált a versenyre.",
        topic: "TEAM_REGISTERED",
        type: "INFO",
        status: "UNREAD",
        receiverAccountId: organizer1.accountId,
        senderAccountId: school2.accountId,
      },
      {
        subject: "Kódvadászok csapatnak hiánypótlás szükséges",
        message: "Kérjük módosítsák a felhasznált tecnológiákat.",
        topic: "TEAM_REJECTED_BY_ORGANIZER",
        type: "ERROR",

        status: "UNREAD",
        receiverAccountId: team1.accountId,
        senderAccountId: organizer1.accountId,
      },
      {
        subject: "Csapat teljesítette a hiánypótlást",
        message: "A Kódvadászok csapat jóváhagyásra került.",
        topic: "TEAM_UPDATE",
        type: "SUCCESS",

        status: "UNREAD",
        receiverAccountId: organizer1.accountId,
        senderAccountId: school2.accountId,
      },
      {
        subject: "Új csapat regisztrált",
        message: "A NemtOMKi csapat regisztrált a versenyre.",
        topic: "TEAM_REGISTERED",
        type: "INFO",

        status: "UNREAD",
        receiverAccountId: organizer1.accountId,
        senderAccountId: school1.accountId,
      },
      {
        subject: "Csapat jóváhagyva",
        message: "A NemtOMKi csapat jóváhagyásra került.",
        topic: "TEAM_APPROVED_BY_SCHOOL",
        type: "INFO",

        status: "UNREAD",
        receiverAccountId: organizer1.accountId,
        senderAccountId: school1.accountId,
      },
      {
        subject: "Csapat elutasítva",
        message:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec, auctor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        topic: "TEAM_REGISTERED",
        type: "INFO",

        status: "UNREAD",
        receiverAccountId: organizer1.accountId,
        senderAccountId: school1.accountId,
      },
      {
        subject: "Csapat jóváhagyva",
        message: "A NemtOMKi csapat jóváhagyásra került.",
        topic: "TEAM_APPROVED_BY_SCHOOL",
        type: "INFO",

        status: "UNREAD",
        receiverAccountId: organizer1.accountId,
        senderAccountId: school1.accountId,
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
