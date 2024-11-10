import {
  Users,
  Gauge,
  Trophy,
  Cpu,
  Blocks,
  School,
  Cog,
  Folder,
} from "lucide-react";

const teamNav = [
  {
    name: "Beállítások",
    url: "/vezerlopult/beallitasok",
    icon: Cog,
  },
];
const schoolNav = [
  {
    name: "Jelentkezett csapatok",
    url: "/vezerlopult/csapatok",
    icon: Users,
  },
  {
    name: "Beállítások",
    url: "/vezerlopult/beallitasok",
    icon: Cog,
  },
];
const organizerNav = [
  {
    name: "Versenyek",
    url: "/vezerlopult/versenyek",
    icon: Trophy,
  },
  {
    name: "Kategóriák",
    url: "/vezerlopult/kategoriak",
    icon: Folder,
  },
  {
    name: "Alkategóriák",
    url: "/vezerlopult/alkategoriak",
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
