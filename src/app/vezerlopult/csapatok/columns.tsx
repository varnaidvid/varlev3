// app/teams/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

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
  accountId: string;
  members: Member[];
  coaches: Coach[];
  applications: Application[];
};

export const columns: ColumnDef<Team>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Team Name <ArrowUpDown />
      </Button>
    ),
  },
  {
    accessorKey: "schoolName",
    header: "School Name",
  },
  {
    id: "memberCount",
    header: "Members",
    cell: ({ row }) => row.original.members.length, // Show the count of members
  },
  {
    id: "coachCount",
    header: "Coaches",
    cell: ({ row }) => row.original.coaches.length, // Show the count of coaches
  },
  {
    id: "competitionsAppliedCount",
    header: "Competitions Applied For",
    cell: ({ row }) => row.original.applications.length, // Show the count of applications
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Created At <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleString(), // Format createdAt date
  },
];
