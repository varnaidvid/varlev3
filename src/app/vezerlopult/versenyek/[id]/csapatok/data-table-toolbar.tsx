import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/ui/data-table-view-options";
import { DataTableFacetedFilter } from "@/components/ui/data-table-faceted-filter";

export function DataTableToolbar<TData>({
  table,
  schools,
  teamName,
}: {
  table: Table<TData>;
  schools: string[];
  teamName?: string;
}) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [searchInput, setSearchInput] = React.useState<string>(teamName ?? "");
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (teamName) {
      setSearchInput(teamName);
      table.getColumn("name")?.setFilterValue(teamName);
    }
  }, [teamName, table]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchInput(value);
    table.getColumn("name")?.setFilterValue(value);
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set("name", value);
    } else {
      params.delete("name");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const statuses = [
    { label: "Iskolai jóváhagyásra vár", value: "WAITING_FOR_SCHOOL_APPROVAL" },
    { label: "Iskola által jóváhagyott", value: "APPROVED_BY_SCHOOL" },
    {
      label: "Szervezői jóváhagyásra vár",
      value: "WAITING_FOR_ORGANIZER_APPROVAL",
    },
    { label: "Hiánypótlásra vár", value: "REJECTED_BY_ORGANIZER" },
    { label: "Regisztrált", value: "REGISTERED" },
  ];

  const coaches = Array.from(
    new Set(
      table
        .getPreFilteredRowModel()
        .rows.flatMap((row) =>
          (row.original as { coaches: { name: string }[] }).coaches.map(
            (coach) => coach.name,
          ),
        ),
    ),
  ).map((coach) => ({ label: coach, value: coach }));

  return (
    <div className="flex flex-col items-center justify-between">
      <Input
        placeholder="Csapat keresése..."
        value={searchInput}
        onChange={handleSearchChange}
        className="h-8 w-[150px] lg:w-[250px]"
      />

      <div className="flex flex-1 items-center space-x-2">
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Státusz"
            options={statuses}
          />
        )}
        {table.getColumn("schoolName") && (
          <DataTableFacetedFilter
            column={table.getColumn("schoolName")}
            title="Iskola"
            options={schools.map((school) => ({
              label: school,
              value: school,
            }))}
          />
        )}
        {table.getColumn("coaches") && (
          <DataTableFacetedFilter
            column={table.getColumn("coaches")}
            title="Felkészítő tanárok"
            options={coaches}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
              setSearchInput("");
              // remove all search params from URL
              router.push(pathname);
            }}
            className="h-8 px-2 lg:px-3"
          >
            Szűrés törlése
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
