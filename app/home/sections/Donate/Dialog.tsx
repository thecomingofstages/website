"use cient";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { DonateForm } from "./Form";

export function DonateDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Test</Button>
      </DialogTrigger>
      <DialogContent
        className="p-0"
        // onInteractOutside={(e) => {
        //   e.preventDefault();
        // }}
        // onOpenAutoFocus={(e) => {
        //   e.preventDefault();
        // }}
      >
        <div className="overflow-auto lg:max-h-[90vh] py-2">
          <DialogHeader className="px-6 py-4">
            <DialogTitle>บริจาค</DialogTitle>
            <DialogDescription>
              ร่วมบริจาคเงินเพื่อสนับสนุนการพัฒนาและดำเนินงานของเรา
            </DialogDescription>
          </DialogHeader>
          <div className="border-b border-muted w-full"></div>
          <DonateForm className="px-6 py-4" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
