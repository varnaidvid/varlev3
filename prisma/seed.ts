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
              email: "nagyjanos@varlev3.hu",
            },
          },
          username: "nagyjanos",
          ...saltAndHashPassword("nagyjanos"),
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
          ...saltAndHashPassword("kiseva"),
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
              email: "neumann@varlev3.hu",
            },
          },
          username: "neumann",
          ...saltAndHashPassword("neumann"),
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
          ...saltAndHashPassword("jedlik"),
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

  const tech6 = await prisma.technology.create({
    data: {
      name: "Django",
    },
  });

  // create 3 categories
  const category1 = await prisma.category.create({
    data: {
      name: "Programozás",
      description: "Asztali, mobil és webes alkalmazásfejlesztő versenyek",
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: "Matematika",
      description: "Matematikával kapcsolatos versenyek",
    },
  });

  const competition1 = await prisma.competition.create({
    data: {
      name: "Dusza Árpád Országos Programozói Emlékverseny 2023",
      description: `
    <h2>A versenyről</h2>
    <p>Az idei versenyen a középiskolás diákok modern webes technológiák használatával mérhetik össze tudásukat. A résztvevők valós, ipari környezetben használt eszközökkel dolgozhatnak, a Next.js-től a Laravel-ig.</p>
    
    <h2>Amit kínálunk</h2>
    <ul>
        <li>Szakmai zsűri értékelése</li>
        <li>Értékes nyeremények</li>
        <li>Kapcsolatépítési lehetőség IT cégekkel</li>
        <li>Mentor program a döntőbe jutott csapatoknak</li>
    </ul>
    
    <h2>Követelmények</h2>
    <ul>
        <li>3 fős csapatok</li>
        <li>Középiskolai tanulói jogviszony</li>
        <li>Alapszintű programozási ismeretek</li>
    </ul>
    
    <p>A verseny során a csapatok egy komplex webalkalmazást fejlesztenek, ahol nem csak a technikai tudás, hanem a kreativitás és a csapatmunka is értékelésre kerül.</p>
`,
      maxTeamSize: 3,
      image:
        "https://ik.imagekit.io/varlev3/competition-images/pexels-markusspiske-1089438.jpg",
      deadline: new Date("2023-11-01"),
      technologies: {
        connect: [
          { id: tech1.id },
          { id: tech2.id },
          { id: tech3.id },
          { id: tech4.id },
          { id: tech5.id },
          { id: tech6.id },
        ],
      },
      categories: {
        connect: [{ id: category1.id }],
      },
      organizers: {
        connect: [{ id: organizer1.id }],
      },
      ended: true,
    },
  });

  const competition2 = await prisma.competition.create({
    data: {
      name: "Országos Középiskolai Web Programozó Verseny 2024",
      description: `
    <h2>A versenyről</h2>
    <p>Az idei versenyen a középiskolás diákok modern webes technológiák használatával mérhetik össze tudásukat. A résztvevők valós, ipari környezetben használt eszközökkel dolgozhatnak, a Next.js-től a Laravel-ig.</p>
    
    <h2>Amit kínálunk</h2>
    <ul>
        <li>Szakmai zsűri értékelése</li>
        <li>Értékes nyeremények</li>
        <li>Kapcsolatépítési lehetőség IT cégekkel</li>
        <li>Mentor program a döntőbe jutott csapatoknak</li>
    </ul>
    
    <h2>Követelmények</h2>
    <ul>
        <li>3 fős csapatok</li>
        <li>Középiskolai tanulói jogviszony</li>
        <li>Alapszintű programozási ismeretek</li>
    </ul>
    
    <p>A verseny során a csapatok egy komplex webalkalmazást fejlesztenek, ahol nem csak a technikai tudás, hanem a kreativitás és a csapatmunka is értékelésre kerül.</p>
`,
      maxTeamSize: 3,
      image:
        "https://ik.imagekit.io/varlev3/competition-images/ccjdeb3qm60w2i584aftxwxn_-fmbJH2Ay.png",
      deadline: new Date("2024-12-02"),
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
        connect: [{ id: category1.id }],
      },
      organizers: {
        connect: [{ id: organizer1.id }],
      },
    },
  });

  // create 2 subCategories for competition1
  await prisma.subCategory.create({
    data: {
      name: "Webfejlesztés",
      Competition: {
        connect: { id: competition1.id },
      },
    },
  });
  await prisma.subCategory.create({
    data: {
      name: "Mobilfejlesztés",
      Competition: {
        connect: { id: competition1.id },
      },
    },
  });
  await prisma.subCategory.create({
    data: {
      name: "Hagyományos",
      Competition: {
        connect: { id: competition1.id },
      },
    },
  });
  const subCategory1 = await prisma.subCategory.create({
    data: {
      name: "Webfejlesztés",
      Competition: {
        connect: { id: competition2.id },
      },
    },
  });
  await prisma.subCategory.create({
    data: {
      name: "Mobilfejlesztés",
      Competition: {
        connect: { id: competition2.id },
      },
    },
  });
  await prisma.subCategory.create({
    data: {
      name: "Hagyományos",
      Competition: {
        connect: { id: competition2.id },
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

  // for dusza döntő
  // every team already accepted

  // team KandOS
  // it's school (create it) "Kecskeméti SZC Kandó Kálmán Technikum"
  // team mebmers
  // Váradi Marcell - 13
  // Vincze Roland - 12
  // Vezsenyi Roland - 13
  // felkészítő tanár - Kátay Magdolna
  const kecskemetSchool = await prisma.school.create({
    data: {
      name: "Kecskeméti SZC Kandó Kálmán Technikum",
      address: "Kecskemét",
      contactName: "Gipsz Jakab",
      account: {
        create: {
          username: "kecskemet",
          ...saltAndHashPassword("kecskemet"),
          type: "SCHOOL",
          emails: {
            create: {
              email: "kecskemet@varlev3.hu",
            },
          },
        },
      },
    },
    include: {
      coaches: true,
    },
  });
  const kandOSTeam = await prisma.team.create({
    data: {
      name: "KandOS",
      status: "REGISTERED",
      school: {
        connect: { id: kecskemetSchool.id },
      },
      technologies: {
        connect: [{ id: tech1.id }, { id: tech2.id }],
      },
      Competition: {
        connect: { id: competition2.id },
      },
      account: {
        create: {
          username: "kandos",
          ...saltAndHashPassword("kandos"),
          type: "TEAM" as AccountType,
        },
      },
      SubCategory: {
        connect: { id: subCategory1.id },
      },
      members: {
        create: [
          { name: "Marcell Váradi", year: 13 },
          { name: "Roland Vincze", year: 12 },
          { name: "Roland Vezsenyi", year: 13 },
        ],
      },
      createdAt: new Date("2024-11-09"),
      coaches: {
        create: [
          {
            name: "Kátay Magdolna",
            schoolName: "Kecskeméti SZC Kandó Kálmán Technikum",
          },
        ],
      },
      applicationForm:
        "https://ik.imagekit.io/varlev3/competition-images/ccjdeb3qm60w2i584aftxwxn_-fmbJH2Ay.png",
    },
  });

  // team Hun-Cut
  // school "BMSZC Bolyai János Műszaki Technikum és Kollégium"
  // members
  // Szabó Bernát - 12
  // Czirják Ádám - 12
  // Zemen Dániel - 12
  // felkészítő tanár - Gombos Szabolcs && Mátyássy Balázs
  const bolyaiSchool = await prisma.school.create({
    data: {
      name: "BMSZC Bolyai János Műszaki Technikum és Kollégium",
      address: "Budapest",
      contactName: "Szabó Bernát",
      account: {
        create: {
          username: "bolyai",
          ...saltAndHashPassword("bolyai"),
          type: "SCHOOL",
          emails: {
            create: {
              email: "bolyai@varlev3.hu",
            },
          },
        },
      },
    },
    include: {
      coaches: true,
    },
  });
  const hunCutTeam = await prisma.team.create({
    data: {
      name: "Hun-Cut",
      status: "REGISTERED",
      school: {
        connect: { id: bolyaiSchool.id },
      },
      technologies: {
        connect: [{ id: tech1.id }, { id: tech2.id }],
      },
      Competition: {
        connect: { id: competition2.id },
      },
      account: {
        create: {
          username: "huncut",
          ...saltAndHashPassword("huncut"),
          type: "TEAM" as AccountType,
          emails: {
            create: {
              email: "huncut@varlev3.hu",
            },
          },
        },
      },
      SubCategory: {
        connect: { id: subCategory1.id },
      },
      members: {
        create: [
          { name: "Bernát Szabó", year: 12 },
          { name: "Ádám Czirják", year: 12 },
          { name: "Dániel Zemen", year: 12 },
        ],
      },
      createdAt: new Date("2024-11-25"),
      coaches: {
        create: [
          {
            name: "Gombos Szabolcs",
            schoolName: "BMSZC Bolyai János Műszaki Technikum és Kollégium",
          },
          {
            name: "Mátyássy Balázs",
            schoolName: "BMSZC Bolyai János Műszaki Technikum és Kollégium",
          },
        ],
      },
      applicationForm:
        "https://ik.imagekit.io/varlev3/competition-images/ccjdeb3qm60w2i584aftxwxn_-fmbJH2Ay.png",
    },
  });

  // team ${csapatnev}
  // school "Debreceni SZC Mechwart András Gépipari és Informatikai Technikum"
  // members
  // Buczkó Béla - 12.
  // Horváth Dávid - 12.
  // Vad Márton - 12.
  // coach - Péter Miklós
  const debrecenSchool = await prisma.school.create({
    data: {
      name: "Debreceni SZC Mechwart András Gépipari és Informatikai Technikum",
      address: "Debrecen",
      contactName: "Dr. Kovács István",
      account: {
        create: {
          username: "debrecen",
          ...saltAndHashPassword("debrecen"),
          type: "SCHOOL",
          emails: {
            create: {
              email: "debrecen@varlev3.hu",
            },
          },
        },
      },
    },
  });
  // team ${csapatnev}
  // school "Debreceni SZC Mechwart András Gépipari és Informatikai Technikum"
  // members
  // Buczkó Béla - 12.
  // Horváth Dávid - 12.
  // Vad Márton - 12.
  // coach - Péter Miklós
  const csapatNevTeam = await prisma.team.create({
    data: {
      name: "${csapatnev}",
      status: "REGISTERED",
      school: {
        connect: { id: debrecenSchool.id },
      },
      technologies: {
        connect: [{ id: tech1.id }, { id: tech2.id }],
      },
      Competition: {
        connect: { id: competition2.id },
      },
      account: {
        create: {
          username: "csapatnev",
          type: "TEAM" as AccountType,
          ...saltAndHashPassword("csapatnev"),
          emails: {
            create: {
              email: "csapatnev@varlev3.hu",
            },
          },
        },
      },
      SubCategory: {
        connect: { id: subCategory1.id },
      },
      members: {
        create: [
          { name: "Buczkó Béla", year: 12 },
          { name: "Horváth Dávid", year: 12 },
          { name: "Vad Márton", year: 12 },
        ],
      },
      createdAt: new Date("2024-11-24"),
      coaches: {
        create: [
          {
            name: "Péter Miklós",
            schoolName:
              "Debreceni SZC Mechwart András Gépipari és Informatikai Technikum",
          },
        ],
      },
    },
  });

  // StillNincsenCsapatnév team
  // school debreceni
  //   Gál Attila Péter - 11.
  // Pápa Attila - 11.
  // Magi Zsolt - 11
  // Nemes Tamás is the coach
  const nemesTamasCoach = await prisma.coach.create({
    data: {
      name: "Nemes Tamás",
      schoolName:
        "Debreceni SZC Mechwart András Gépipari és Informatikai Technikum",
    },
  });
  const stillNincsenCsapatnevTeam = await prisma.team.create({
    data: {
      name: "StillNincsenCsapatnév",
      status: "REGISTERED",
      school: {
        connect: { id: debrecenSchool.id },
      },
      technologies: {
        connect: [{ id: tech1.id }, { id: tech2.id }],
      },
      Competition: {
        connect: { id: competition2.id },
      },
      account: {
        create: {
          username: "stillniccsapatnev",
          type: "TEAM" as AccountType,
          ...saltAndHashPassword("stillniccsapatnev"),
          emails: {
            create: {
              email: "stillniccsapatnev@varlev3.hu",
            },
          },
        },
      },
      SubCategory: {
        connect: { id: subCategory1.id },
      },
      members: {
        create: [
          { name: "Gál Attila Péter", year: 11 },
          { name: "Pápa Attila", year: 11 },
          { name: "Magi Zsolt", year: 11 },
        ],
      },
      createdAt: new Date("2024-11-26"),
      coaches: {
        connect: {
          id: nemesTamasCoach.id,
        },
      },
    },
  });

  // Bináris Betyárok team
  // Debreceni SZC Mechwart András Gépipari és Informatikai Technikum school
  // Wágner Ferenc - 11.
  // Bődi Zoltán - 11.
  // Szentjóbi Gergő - 11.
  // Nemes Tamás is the coach
  const binarisBetyarokTeam = await prisma.team.create({
    data: {
      name: "Bináris Betyárok",
      status: "REGISTERED",
      school: {
        connect: { id: debrecenSchool.id },
      },
      technologies: {
        connect: [{ id: tech1.id }, { id: tech2.id }],
      },
      Competition: {
        connect: { id: competition2.id },
      },
      account: {
        create: {
          username: "binarbetyarok",
          type: "TEAM" as AccountType,
          ...saltAndHashPassword("binarbetyarok"),
          emails: {
            create: {
              email: "binarbetyarok@varlev3.hu",
            },
          },
        },
      },
      SubCategory: {
        connect: { id: subCategory1.id },
      },
      members: {
        create: [
          { name: "Wágner Ferenc", year: 11 },
          { name: "Bődi Zoltán", year: 11 },
          { name: "Szentjóbi Gergő", year: 11 },
        ],
      },
      createdAt: new Date("2024-11-25"),
      coaches: {
        connect: {
          id: nemesTamasCoach.id,
        },
      },
    },
  });

  // varlev3 team
  // bmszc bolyai is the school
  // Várnai Dávid - 13.
  // Várszegi Barnabás - 13.
  // Lénárt Dániel - 13.
  // Szilasi István is the coach

  // school Miskolci SZC Kandó Kálmán Informatikai Technikum
  const miskolcSchool = await prisma.school.create({
    data: {
      name: "Miskolci SZC Kandó Kálmán Informatikai Technikum",
      address: "Miskolc",
      contactName: "Dr. Béla Balázs",
      account: {
        create: {
          username: "miskolc",
          ...saltAndHashPassword("miskolc"),
          type: "SCHOOL",
          emails: {
            create: {
              email: "miskolc@varlev3.hu",
            },
          },
        },
      },
    },
  });

  // Amatőrök team
  //   Futó Zsombor - 9.
  // Szabó Máté Krisztián - 9.
  // Szűcs Noel Gergő - 9
  // Kasza László Róbert is the coach
  const amatorokTeam = await prisma.team.create({
    data: {
      name: "Amatőrök",
      status: "REGISTERED",
      school: {
        connect: { id: miskolcSchool.id },
      },
      technologies: {
        connect: [{ id: tech1.id }, { id: tech2.id }],
      },
      Competition: {
        connect: { id: competition2.id },
      },
      account: {
        create: {
          username: "amatorok",
          type: "TEAM" as AccountType,
          ...saltAndHashPassword("amatorok"),
          emails: {
            create: {
              email: "amatorok@varlev3.hu",
            },
          },
        },
      },
      SubCategory: {
        connect: { id: subCategory1.id },
      },
      members: {
        create: [
          { name: "Futó Zsombor", year: 9 },
          { name: "Szabó Máté Krisztián", year: 9 },
          { name: "Szűcs Noel Gergő", year: 9 },
        ],
      },
      createdAt: new Date("2024-11-26"),
      coaches: {
        create: [
          {
            name: "Kasza László Róbert",
            schoolName: "Miskolci SZC Kandó Kálmán Informatikai Technikum",
          },
        ],
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
        connect: { id: competition1.id },
      },
      account: {
        create: {
          emails: {
            create: {
              email: "kodvadaszok@varlev3.hu",
            },
          },
          username: "kodvadaszok",
          ...saltAndHashPassword("kodvadaszok"),
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
        connect: { id: competition1.id },
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
          ...saltAndHashPassword("bitmesterek"),
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
        connect: { id: competition1.id },
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
          ...saltAndHashPassword("webvirtuozok"),
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
        connect: { id: competition1.id },
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
      status: "WAITING_FOR_ORGANIZER_APPROVAL",
      Competition: {
        connect: { id: competition1.id },
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
      applicationForm:
        "https://ik.imagekit.io/varlev3/competition-images/h8l8i5xy8o7wdgydufw31hq1_ukF1x6N3o.jpg",
    },
  });
  const team6 = await prisma.team.create({
    data: {
      name: "PHP Mesterek",
      status: "WAITING_FOR_ORGANIZER_APPROVAL",
      Competition: {
        connect: { id: competition1.id },
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
        subject: "Csapat regisztráció",
        message: "A Vanilla JS Mesterek csapat regisztrált egy versenyre.",
        topic: "TEAM_REGISTERED",
        type: "INFO",
        status: "UNREAD",
        createdAt: new Date("2024-11-08"),
        receiverAccountId: school2.accountId,
        senderAccountId: team4.accountId,
      },
      {
        subject: "Csapat regisztráció",
        message: "Az Angular Mesterek csapat regisztrált egy versenyre.",
        topic: "TEAM_REGISTERED",
        type: "INFO",
        status: "UNREAD",
        createdAt: new Date("2024-10-20"),
        receiverAccountId: school2.accountId,
        senderAccountId: team5.accountId,
      },
      {
        subject: "Csapat regisztráció",
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
    ],
  });

  // seed notifications
  await prisma.notification.createMany({
    data: [
      {
        subject: "Csapat regisztráció",
        message: "A WebVirtuózok csapat regisztrált egy versenyre.",
        topic: "TEAM_REGISTERED",
        type: "INFO",
        status: "UNREAD",
        createdAt: new Date("2024-11-08"),
        receiverAccountId: school1.accountId,
        senderAccountId: team3.accountId,
      },
      {
        subject: "Csapat regisztráció",
        message: "A BitMesterek csapat regisztrált egy versenyre.",
        topic: "TEAM_REGISTERED",
        type: "INFO",
        status: "UNREAD",
        createdAt: new Date("2024-11-08"),
        receiverAccountId: school1.accountId,
        senderAccountId: team2.accountId,
      },
      {
        subject: "Csapat regisztráció",
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
