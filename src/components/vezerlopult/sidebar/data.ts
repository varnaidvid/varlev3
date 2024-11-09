import { Users, Gauge, Trophy, Cpu, Blocks, School, Cog } from "lucide-react";

const teamNav = [
  {
    name: "Beállítások",
    url: "/vezerlopult/beallitasok",
    icon: Cog,
  },
];
const schoolNav = [
  {
    name: "Beállítások",
    url: "/vezerlopult/beallitasok",
    icon: Cog,
  },
  {
    name: "Jelentkezett csapatok",
    url: "/vezerlopult/csapatok",
    icon: Users,
  },
];
const organizerNav = [
  {
    name: "Versenyek",
    url: "/vezerlopult/felhasznalok",
    icon: Trophy,
  },
  {
    name: "Kategóriák",
    url: "/vezerlopult/kategoriak",
    icon: Blocks,
  },
  {
    name: "Technológiák",
    url: "/vezerlopult/technologiak",
    icon: Cpu,
  },
  {
    name: "Iskolák",
    url: "/vezerlopult/iskolak",
    icon: School,
  },
];

export { teamNav, schoolNav, organizerNav };
