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
//   enum ApplicationStatus {
//     WAITING_FOR_SCHOOL_APPROVAL
//     APPROVED_BY_SCHOOL

//     WAITING_FOR_ORGANIZER_APPROVAL
//     REJECTED_BY_ORGANIZER

//     REGISTERED
// }
// const statusColors = {
//   REGISTERED: "bg-yellow-100 text-yellow-800",
//   APPROVED_BY_SCHOOL: "bg-blue-100 text-blue-800",
//   APPROVED_BY_ORGANIZER: "bg-green-100 text-green-800",
//   DENIED_BY_ORGANIZER: "bg-red-100 text-red-800",
// };

const statusColors = {
  WAITING_FOR_SCHOOL_APPROVAL: "bg-yellow-100 text-yellow-800",
  APPROVED_BY_SCHOOL: "bg-blue-100 text-blue-800",
  WAITING_FOR_ORGANIZER_APPROVAL: "bg-yellow-100 text-yellow-800",
  REJECTED_BY_ORGANIZER: "bg-red-100 text-red-800",
  REGISTERED: "bg-green-100 text-green-800",
};

export const columns: ColumnDef<TeamWithDetails>[] = [
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
    accessorKey: "schoolName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Iskola" />
    ),
    cell: ({ row }) => {
      const school = row.getValue("schoolName") as string;
      return <div>{school}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Státusz" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as keyof typeof statusColors;
      return (
        <Badge className={`${statusColors[status]}`}>
          {status === "REGISTERED" && "Regisztrált"}
          {status === "APPROVED_BY_SCHOOL" && "Iskola által jóváhagyott"}
          {status === "WAITING_FOR_ORGANIZER_APPROVAL" &&
            "Szervezői jóváhagyásra vár"}
          {status === "REJECTED_BY_ORGANIZER" && "Szervező által elutasított"}
          {status === "WAITING_FOR_SCHOOL_APPROVAL" &&
            "Iskolai jóváhagyásra vár"}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jelentkezett" />
    ),
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;
      return format(new Date(createdAt), "yyyy. MMMM d.", { locale: hu });
    },
  },
];
