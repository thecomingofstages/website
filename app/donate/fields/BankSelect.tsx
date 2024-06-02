"use client";

import * as React from "react";

import { CommandList } from "cmdk";
import { Check, ChevronsUpDown } from "lucide-react";

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
import { ThaiBank, ThaiBankKeys, thaiBanks } from "@/lib/banks";
import { cn } from "@/lib/utils";

export interface BankSelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

function BankView({ image, short_name, color, official_name_thai }: ThaiBank) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={short_name}
        className="rounded p-1 w-6 h-6 mr-3"
        style={{
          backgroundColor: color,
        }}
      />
      {official_name_thai}
    </>
  );
}

const bankFilter = (value: string, search: string) => {
  const bank = thaiBanks[value as ThaiBankKeys];
  if (bank) {
    return bank.official_name_thai.includes(search) ? 1 : 0;
  }
  return 0;
};

export function BankSelect({ value, onChange, disabled }: BankSelectProps) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-start"
            disabled={disabled}
          >
            {value && thaiBanks[value as ThaiBankKeys] ? (
              <BankView {...thaiBanks[value as ThaiBankKeys]} />
            ) : (
              "เลือกธนาคาร..."
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command filter={bankFilter}>
            <CommandInput placeholder="ค้นหาธนาคาร..." />
            <CommandList>
              <CommandEmpty>ไม่พบชื่อธนาคาร</CommandEmpty>
              <CommandGroup className="overflow-auto max-h-[200px] lg:max-h-[400px]">
                {Object.values(thaiBanks).map((bank) => (
                  <CommandItem
                    key={bank.short_name}
                    value={bank.short_name}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                    className="py-2"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === bank.short_name ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <BankView {...bank} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
