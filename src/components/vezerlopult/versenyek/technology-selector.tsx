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
import { formTwoSchema } from "@/lib/zod/team-crud";
import { z } from "zod";

export default function TechnologySelector({
  form,
  technologies,
}: {
  form: UseFormReturn<z.infer<typeof formTwoSchema>>;
  technologies: { id: string; name: string }[];
}) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (technology: { id: string; name: string }) => {
    // this is an array of objects (name, id)
    const technologies = form.getValues("technologies") || [];

    if (technologies?.map((tech) => tech.id).includes(technology.id)) {
      form.setValue(
        "technologies",
        technologies.filter((tech) => tech.id !== technology.id),
      );
    } else {
      form.setValue("technologies", [...technologies, technology]);
    }

    const selectedTechnologies = technologies.filter((tech) =>
      (form.getValues("technologies") || [])
        .map((t: { id: string }) => t.id)
        .includes(tech.id),
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
              {selectedTechnologies.length > 0
                ? `${selectedTechnologies.length} kiválasztva`
                : "Válasszon technológiákat..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Technológiák keresése..." />
              <CommandEmpty>Nincs találat.</CommandEmpty>
              <CommandGroup>
                {technologies.map((technology) => (
                  <CommandItem
                    key={technology.id}
                    onSelect={() => handleSelect(technology)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedTechnologies.some(
                          (item) => item.id === technology.id,
                        )
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {technology.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedTechnologies.map((tech) => (
            <Badge key={tech.id} variant="secondary" className="text-sm">
              {tech.name}
              <button
                className="ml-1 hover:text-destructive"
                onClick={() => handleSelect(tech)}
              >
                ×
              </button>
            </Badge>
          ))}
        </div>
      </>
    );
  };
}
