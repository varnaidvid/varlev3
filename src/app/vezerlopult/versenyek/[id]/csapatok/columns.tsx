"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { format } from "date-fns";
import { hu } from "date-fns/locale";
import { TeamWithDetails } from "@/server/api/routers/team";
import { Technology } from "@prisma/client";

// Define the application statuses with their colors
const statusColors = {
  REGISTERED: "bg-yellow-100 text-yellow-800",
  APPROVED_BY_SCHOOL: "bg-blue-100 text-blue-800",
  APPROVED_BY_ORGANIZER: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
};

export const columns: ColumnDef<TeamWithDetails>[] = [
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
      const school = row.getValue("school") as TeamWithDetails["school"];
      return <div>{school.name}</div>;
    },
  },
  {
    accessorKey: "members",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Résztvevők" />
    ),
    cell: ({ row }) => {
      const members = row.getValue("members") as TeamWithDetails["members"];
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
      const coaches = row.getValue("coaches") as TeamWithDetails["coaches"];
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
      const technologies = row.original.technologies as Technology[];
      return (
        <div className="flex flex-wrap gap-2">
          {technologies.map((technology, index) => (
            <Badge key={index} variant="secondary">
              {technology.name}
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
