import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/ui/data-table-view-options";
import { DataTableFacetedFilter } from "@/components/ui/data-table-faceted-filter";

export function DataTableToolbar<TData>({ table }: { table: Table<TData> }) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [searchInput, setSearchInput] = React.useState<string>("");
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    setSearchInput("");
    table.getColumn("name")?.setFilterValue("");
  }, [table]);

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
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Iskola keresése..."
          value={searchInput}
          onChange={handleSearchChange}
          className="h-8 w-[150px] lg:w-[250px]"
        />
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
