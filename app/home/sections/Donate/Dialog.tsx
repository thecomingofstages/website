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
        className="max-w-lg max-h-[90vh] h-full p-0"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <div className="overflow-y-scroll max-h-full space-y-4 p-10">
          <DialogHeader>
            <DialogTitle>บริจาค</DialogTitle>
            <DialogDescription>
              ร่วมบริจาคเงินเพื่อสนับสนุนการพัฒนาและดำเนินงานของเรา
            </DialogDescription>
          </DialogHeader>
          <div className="border-b border-muted w-full"></div>
          <DonateForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
