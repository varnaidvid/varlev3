"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { format } from "date-fns";
import { hu } from "date-fns/locale";
import { Team } from "@prisma/client";

// Define the application statuses with their colors
const statusColors = {
  REGISTERED: "bg-yellow-100 text-yellow-800",
  APPROVED_BY_SCHOOL: "bg-blue-100 text-blue-800",
  APPROVED_BY_ORGANIZER: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
};

// you dont even have to ask, i have attached my data model. this table should have every feature: pagination, view modes, searching, filters, sorting, action button (actions should be delete, reject application, approve application, editing.
//     the fields:
//     team name, team participants, team technoligies (in little cute badges), application status (also in badges, colored), created_at date, coaches, school name and updated at too

// data model:
// [
//     {
//       "id": "cm3987qqa000eboixpcvpitrz",
//       "name": "Kódvadászok",
//       "status": "APPROVED_BY_SCHOOL",
//       "updatedAt": "2024-11-08T21:05:50.866Z",
//       "createdAt": "2024-11-08T21:05:50.866Z",
//       "schoolName": "cm3987qnp0004boixajoewhza",
//       "accountId": "cm3987qqa000fboix5bww9mdj",
//       "competitionId": "cm3987qpp000dboixlx7hrfon",
//       "members": [
//         {
//           "id": "cm3987qqa000gboixfha350aj",
//           "name": "Horváth Anna",
//           "year": 12,
//           "email": null,
//           "isReserve": false,
//           "teamId": "cm3987qqa000eboixpcvpitrz"
//         },
//         {
//           "id": "cm3987qqa000hboixvfyfbtel",
//           "name": "Török Bence",
//           "year": 11,
//           "email": null,
//           "isReserve": false,
//           "teamId": "cm3987qqa000eboixpcvpitrz"
//         },
//         {
//           "id": "cm3987qqa000iboixaz30mq4b",
//           "name": "Németh Csaba",
//           "year": 10,
//           "email": null,
//           "isReserve": false,
//           "teamId": "cm3987qqa000eboixpcvpitrz"
//         }
//       ],
//       "coaches": [
//         {
//           "id": "cm3987qqa000jboixod0nmzhv",
//           "name": "Molnár Gábor",
//           "teamId": "cm3987qqa000eboixpcvpitrz",
//           "schoolName": "cm3987qnp0004boixajoewhza"
//         }
//       ],
//       "school": {
//         "id": "cm3987qnp0004boixajoewhza",
//         "name": "Neumann János Gimnázium",
//         "address": "1144 Budapest, Kerepesi út 124.",
//         "contactName": "Dr. Kovács István",
//         "contactEmail": "igazgato@neumann-bp.hu",
//         "accountId": "cm3987qnp0005boixelmr5vv4"
//       }
//     },
//     {
//       "id": "cm3987qr3000kboixu627osuh",
//       "name": "BitMesterek",
//       "status": "APPROVED_BY_ORGANIZER",
//       "updatedAt": "2024-11-08T21:05:50.895Z",
//       "createdAt": "2024-11-08T21:05:50.895Z",
//       "schoolName": "cm3987qo60006boixrwnnuses",
//       "accountId": "cm3987qr3000lboixsxgl168p",
//       "competitionId": "cm3987qpp000dboixlx7hrfon",
//       "members": [
//         {
//           "id": "cm3987qr3000mboixyd2jt89x",
//           "name": "Varga Dániel",
//           "year": 12,
//           "email": null,
//           "isReserve": false,
//           "teamId": "cm3987qr3000kboixu627osuh"
//         },
//         {
//           "id": "cm3987qr3000nboix71udoefc",
//           "name": "Szilágyi Eszter",
//           "year": 11,
//           "email": null,
//           "isReserve": false,
//           "teamId": "cm3987qr3000kboixu627osuh"
//         },
//         {
//           "id": "cm3987qr3000oboix3imv8dht",
//           "name": "Fekete Ferenc",
//           "year": 11,
//           "email": null,
//           "isReserve": false,
//           "teamId": "cm3987qr3000kboixu627osuh"
//         },
//         {
//           "id": "cm3987qr3000pboixwxa0s4gd",
//           "name": "Papp Petra",
//           "year": 10,
//           "email": null,
//           "isReserve": true,
//           "teamId": "cm3987qr3000kboixu627osuh"
//         }
//       ],
//       "coaches": [
//         {
//           "id": "cm3987qr3000qboix97tgikly",
//           "name": "Takács Zoltán",
//           "teamId": "cm3987qr3000kboixu627osuh",
//           "schoolName": "cm3987qo60006boixrwnnuses"
//         }
//       ],
//       "school": {
//         "id": "cm3987qo60006boixrwnnuses",
//         "name": "Jedlik Ányos Gimnázium",
//         "address": "9021 Győr, Szent István út 7.",
//         "contactName": "Dr. Szabó Mária",
//         "contactEmail": "igazgato@jedlik.hu",
//         "accountId": "cm3987qo60007boixishiwkpc"
//       }
//     },
//     {
//       "id": "cm3987qrl000rboixqz750ru3",
//       "name": "WebVirtuózok",
//       "status": "REGISTERED",
//       "updatedAt": "2024-11-08T21:05:50.913Z",
//       "createdAt": "2024-11-08T21:05:50.913Z",
//       "schoolName": "cm3987qo60006boixrwnnuses",
//       "accountId": "cm3987qrl000sboixcqu79bev",
//       "competitionId": "cm3987qpp000dboixlx7hrfon",
//       "members": [
//         {
//           "id": "cm3987qrl000tboixgady2oyj",
//           "name": "Kiss Gergő",
//           "year": 12,
//           "email": null,
//           "isReserve": false,
//           "teamId": "cm3987qrl000rboixqz750ru3"
//         },
//         {
//           "id": "cm3987qrl000uboixeb6gqeyp",
//           "name": "Tóth Hanna",
//           "year": 11,
//           "email": null,
//           "isReserve": false,
//           "teamId": "cm3987qrl000rboixqz750ru3"
//         },
//         {
//           "id": "cm3987qrl000vboixacbv9f2j",
//           "name": "Nagy István",
//           "year": 10,
//           "email": null,
//           "isReserve": false,
//           "teamId": "cm3987qrl000rboixqz750ru3"
//         }
//       ],
//       "coaches": [
//         {
//           "id": "cm3987qrl000wboix4jz3let1",
//           "name": "Szabó János",
//           "teamId": "cm3987qrl000rboixqz750ru3",
//           "schoolName": "cm3987qnp0004boixajoewhza"
//         }
//       ],
//       "school": {
//         "id": "cm3987qo60006boixrwnnuses",
//         "name": "Jedlik Ányos Gimnázium",
//         "address": "9021 Győr, Szent István út 7.",
//         "contactName": "Dr. Szabó Mária",
//         "contactEmail": "igazgato@jedlik.hu",
//         "accountId": "cm3987qo60007boixishiwkpc"
//       }
//     }
//   ]

export const columns: ColumnDef<Team>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Csapat neve" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "school",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Iskola" />
    ),
    cell: ({ row }) => {
      const school = row.getValue("school") as Team["school"];
      return <div>{school.name}</div>;
    },
  },
  {
    accessorKey: "members",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Résztvevők" />
    ),
    cell: ({ row }) => {
      const members = row.getValue("members") as Team["members"];
      return (
        <div className="flex flex-col gap-1">
          {members.map((member, index) => (
            <div key={index} className="text-sm">
              {member.name}
              {member.isReserve && (
                <Badge variant="secondary" className="ml-2">
                  Tartalék
                </Badge>
              )}
            </div>
          ))}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Státusz" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as keyof typeof statusColors;
      return (
        <Badge className={statusColors[status]}>
          {status === "REGISTERED" && "Regisztrált"}
          {status === "APPROVED_BY_SCHOOL" && "Iskola által jóváhagyott"}
          {status === "APPROVED_BY_ORGANIZER" && "Szervező által jóváhagyott"}
          {status === "REJECTED" && "Elutasított"}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    accessorKey: "coaches",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Felkészítő tanárok" />
    ),
    cell: ({ row }) => {
      const coaches = row.getValue("coaches") as Team["coaches"];
      return (
        <div className="flex flex-col gap-1">
          {coaches.map((coach, index) => (
            <div key={index}>{coach.name}</div>
          ))}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    id: "technologies",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Technológiák" />
    ),
    cell: ({ row }) => {
      const technologies = row.original. as string[];
      return (
        <div className="flex flex-wrap gap-2">
          {technologies.map((technology, index) => (
            <Badge key={index} variant="secondary">
              {technology}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Létrehozva" />
    ),
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;
      return format(new Date(createdAt), "yyyy. MMMM d.", { locale: hu });
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Frissítve" />
    ),
    cell: ({ row }) => {
      const updatedAt = row.getValue("updatedAt") as string;
      return format(new Date(updatedAt), "yyyy. MMMM d.", { locale: hu });
    },
  },
];
