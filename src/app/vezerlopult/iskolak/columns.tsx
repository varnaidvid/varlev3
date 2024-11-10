"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { School } from "@prisma/client";

export const columns: ColumnDef<School>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Iskola neve" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cím" />
    ),
    cell: ({ row }) => {
      const address = row.getValue("address") as string;
      return <div>{address}</div>;
    },
  },
  {
    accessorKey: "contactName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kapcsolattartó neve" />
    ),
    cell: ({ row }) => {
      const contactName = row.getValue("contactName") as string;
      return <div>{contactName}</div>;
    },
  },
  {
    accessorKey: "contactEmail",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kapcsolattartó email" />
    ),
    cell: ({ row }) => {
      const contactEmail =
        (
          row.original as School & {
            account?: { emails?: { email: string }[] };
          }
        ).account?.emails?.[0]?.email ?? "";
      return <div>{contactEmail}</div>;
    },
  },
  {
    accessorKey: "coaches",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Felkészítő tanárok" />
    ),
    cell: ({ row }) => {
      const coaches = (row.original as School & { coaches: { id: string }[] })
        .coaches.length;
      return <Badge variant="secondary">{coaches}</Badge>;
    },
  },
  {
    accessorKey: "teams",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Csapatok" />
    ),
    cell: ({ row }) => {
      const teams = (row.original as School & { teams: { id: string }[] }).teams
        .length;
      return <Badge variant="secondary">{teams}</Badge>;
    },
  },
];
