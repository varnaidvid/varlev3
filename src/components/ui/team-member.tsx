import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { Button } from "./button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";

const TeamMember = ({
  index,
  control,
  remove,
}: {
  index: number | "reserved";
  control: any;
  remove?: () => void;
}) => (
  <div className="mt-2">
    {typeof index === "number" && (
      <FormLabel>{index + 1}. csapattag:</FormLabel>
    )}

    <div className="flex items-start space-x-2">
      <FormField
        control={control}
        name={
          index === "reserved" ? "reserveMember.name" : `members.${index}.name`
        }
        render={({ field }) => (
          <FormItem className="flex-grow">
            <FormControl>
              <Input placeholder="Teljes név" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={
          index === "reserved" ? "reserveMember.year" : `members.${index}.year`
        }
        render={({ field }) => (
          <FormItem className="w-16">
            <FormControl>
              <div className="relative inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-lg border border-input text-sm shadow-sm">
                <input
                  type="number"
                  className="w-full pl-3 pr-8 tabular-nums [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  min={1}
                  max={13}
                  {...field}
                  onChange={(e) =>
                    field.onChange(
                      Math.min(13, parseInt(e.target.value, 10) || 1),
                    )
                  }
                />
                <div className="absolute right-0 top-0 flex h-full flex-col">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-1/2 w-6 rounded-none border-l px-1"
                    onClick={() =>
                      field.onChange(Math.min(13, (field.value || 1) + 1))
                    }
                  >
                    <ChevronUp className="h-3 w-3" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-1/2 w-6 rounded-none border-l border-t px-1"
                    onClick={() =>
                      field.onChange(Math.max(1, (field.value || 1) - 1))
                    }
                  >
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {remove && (
        <Button type="button" variant="outline" size="icon" onClick={remove}>
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Csapattag törlése</span>
        </Button>
      )}
    </div>
  </div>
);
export default TeamMember;
