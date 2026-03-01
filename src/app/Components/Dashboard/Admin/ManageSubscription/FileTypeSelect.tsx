"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";

interface FileTypeSelectProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const FILE_TYPES = ["IMAGE", "PDF", "AUDIO", "VIDEO"];

const FileTypeSelect: React.FC<FileTypeSelectProps> = ({
  value = [],
  onChange,
}) => {
  const [open, setOpen] = React.useState(false);

  const toggleType = (type: string) => {
    if (value.includes(type)) {
      onChange(value.filter((v) => v !== type));
    } else {
      onChange([...value, type]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full min-h-10 justify-between"
        >
          <div className=" flex flex-wrap gap-1 flex-1 text-left">
            {value.length ? (
              value.map((type) => (
                <Badge
                  key={type}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {type}
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground">
                Select file types...
              </span>
            )}
          </div>

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0" align="start">
        <Command>
          <CommandList>
            <CommandEmpty>No file types found.</CommandEmpty>

            <CommandGroup>
              {FILE_TYPES.map((type) => (
                <CommandItem
                  key={type}
                  value={type}
                  onSelect={() => toggleType(type)}
                  className="flex w-full items-center justify-between"
                >
                  <span>{type}</span>

                  <Check
                    className={cn(
                      "h-4 w-4 text-green-500",
                      value.includes(type) ? "opacity-100" : "opacity-0",
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
};

export default FileTypeSelect;
