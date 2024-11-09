"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { ApplicationStatusBadge } from "@/components/ui/application-status";
import { format } from "date-fns";
import { hu } from "date-fns/locale";
import { TeamWithDetails } from "@/server/api/routers/team";
import { ApplicationStatus } from "@prisma/client";

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
      const status = row.getValue("status") as ApplicationStatus;
      return <ApplicationStatusBadge status={status} />;
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
