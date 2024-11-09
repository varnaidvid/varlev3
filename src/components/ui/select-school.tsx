"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { School } from "@prisma/client";
import { useEffect, useState } from "react";

export default function SelectSchool({
  schools,
  onSelect,
  initialSchool,
}: {
  schools: School[];
  onSelect: (schoolId: string) => void;
  initialSchool?: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedName, setSelectedName] = useState<string | null>(
    initialSchool || null,
  );

  useEffect(() => {
    console.log(selectedName);
    if (selectedName) onSelect(selectedName);
    else onSelect("");
  }, [selectedName]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedName ? (
            schools.find((school) => school.name === selectedName)?.name
          ) : (
            <span className="text-muted-foreground">
              Válaszd ki az iskoládat...
            </span>
          )}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Iskolák keresése..." />
          <CommandList>
            <CommandEmpty>Nincs találat.</CommandEmpty>
            <CommandGroup>
              {schools.map((school) => (
                <CommandItem
                  key={school.name}
                  value={school.name}
                  onSelect={(currentValue: string) => {
                    setSelectedName(
                      selectedName === school.name ? "" : currentValue,
                    );
                    setOpen(false);
                  }}
                >
                  {school.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedName === school.name
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
