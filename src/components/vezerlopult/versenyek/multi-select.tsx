"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { UseFormReturn } from "react-hook-form";

export default function MultiSelect({
  form,
  name,
  items,
  placeholder,
  noItemsText,
}: {
  form: UseFormReturn<any>;
  name: string;
  items: { id: string; name: string }[];
  placeholder: string;
  noItemsText: string;
}) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (item: { id: string; name: string }) => {
    const currentValues = form.getValues(name) || [];
    if (currentValues.includes(item.id)) {
      form.setValue(
        name,
        currentValues.filter((id: string) => id !== item.id),
      );
    } else {
      form.setValue(name, [...currentValues, item.id]);
    }
  };

  const selectedItems = items.filter((item) =>
    (form.getValues(name) || []).includes(item.id),
  );

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selectedItems.length > 0
              ? `${selectedItems.length} kiválasztva`
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Keresés..." />
            <CommandEmpty>{noItemsText}</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem key={item.id} onSelect={() => handleSelect(item)}>
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedItems.some((selected) => selected.id === item.id)
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="mt-2 flex flex-wrap gap-2">
        {selectedItems.map((item) => (
          <Badge key={item.id} variant="secondary" className="text-sm">
            {item.name}
            <button
              className="ml-1 hover:text-destructive"
              onClick={() => handleSelect(item)}
            >
              ×
            </button>
          </Badge>
        ))}
      </div>
    </>
  );
}
