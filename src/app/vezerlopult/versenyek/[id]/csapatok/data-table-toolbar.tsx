import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/ui/data-table-view-options";
import { DataTableFacetedFilter } from "@/components/ui/data-table-faceted-filter";

export function DataTableToolbar<TData>({
  table,
  schools,
}: {
  table: Table<TData>;
  schools: string[];
}) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const statuses = [
    { label: "Iskolai jóváhagyásra vár", value: "WAITING_FOR_SCHOOL_APPROVAL" },
    { label: "Iskola által jóváhagyott", value: "APPROVED_BY_SCHOOL" },
    {
      label: "Szervezői jóváhagyásra vár",
      value: "WAITING_FOR_ORGANIZER_APPROVAL",
    },
    { label: "Szervező által elutasított", value: "REJECTED_BY_ORGANIZER" },
    { label: "Regisztrált", value: "REGISTERED" },
  ];

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Csapat keresése..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Státusz"
            options={statuses}
          />
        )}
        {
          // TODO: i isnt working for some reason
          table.getColumn("schoolName") && (
            <DataTableFacetedFilter
              column={table.getColumn("schoolName")}
              title="Iskola"
              options={schools.map((school) => ({
                label: school,
                value: school,
              }))}
            />
          )
        }
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
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
