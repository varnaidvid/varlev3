"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export type Member = {
  id: string;
  name: string;
  year: number;
  email: string | null;
  isReserve: boolean;
  teamId: string;
};

export type Coach = {
  id: string;
  name: string;
  teamId: string;
};

export type Application = {
  id: string;
  status: string;
  createdAt: Date;
  teamId: string;
  competitionId: string;
  Competition: {
    id: string;
    name: string;
    description: string;
    image: string;
    deadline: Date;
  };
};

export type Team = {
  id: string;
  name: string;
  updatedAt: Date;
  createdAt: Date;
  schoolName: string; // or you can replace it with abbr. "schoolId" to use it as reference
  school: {
    name: string;
  };
  accountId: string;
  members: Member[];
  coaches: Coach[];
  applications: Application[];
};

export const columns: ColumnDef<Team>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Csapat neve" />
    ),
    cell: ({ row }) => row.getValue("name"),
  },
  {
    id: "school",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Iskola" />
    ),
    cell: ({ row }) => row.original.school.name,
  },
  {
    id: "members",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Csapattagok" />
    ),
    cell: ({ row }) => {
      const members = row.original.members;
      return (
        <div className="space-y-1">
          {members.map((member: Member) => (
            <div key={member.id}>{member.name}</div>
          ))}
        </div>
      );
    },
  },
  {
    id: "competitions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Versenyek" />
    ),
    cell: ({ row }) => {
      const applications = row.original.applications;
      return (
        <div className="space-y-1">
          {applications.map((application: Application) => (
            <div key={application.id}>{application.Competition.name}</div>
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
      const date: Date = row.getValue("createdAt");
      return date.toLocaleDateString();
    },
  },
];
