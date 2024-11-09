import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/ui/data-table-view-options";
import { DataTableFacetedFilter } from "@/components/ui/data-table-faceted-filter";
import { School } from "@prisma/client";

export function DataTableToolbar<TData>({
  table,
  //   schools,
}: {
  table: Table<TData>;
  //   schools: School[];
}) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const statuses = [
    { label: "Regisztrált", value: "REGISTERED" },
    { label: "Iskola által jóváhagyott", value: "APPROVED_BY_SCHOOL" },
    { label: "Szervező álta jóváhagyott", value: "APPROVED_BY_ORGANIZER" },
    { label: "Iskola által elutasított", value: "DENIED_BY_SCHOOL" },
    { label: "Szervező által elutasított", value: "DENIED_BY_ORGANIZER" },
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
        {/* { // TODO: i isnt working for some reason
          table.getColumn("school") && (
            <DataTableFacetedFilter
              column={table.getColumn("school")}
              title="Iskola"
              options={schools.map((school) => ({
                label: school.name,
                value: school.name,
              }))}
            />
          )
        } */}
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
