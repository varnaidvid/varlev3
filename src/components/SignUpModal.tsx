"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function RegistrationModal() {
  const [open, setOpen] = useState(false);

  return (
    <div className="text-center">
      <div className="flex justify-start mx-6">
        <Button onClick={() => setOpen(true)}>
          Jelentkezés
        </Button>
      </div>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Jelentkezés a Versenyre</DialogTitle>
            <DialogDescription>
              Kérjük, töltsd ki az alábbi adatokat a jelentkezéshez!
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4">
            <div>
              <label className="block text-left font-semibold">Csapat neve</label>
              <input
                type="text"
                className="w-full border rounded-md p-2"
                placeholder="Pl. Szuper Csapat"
              />
            </div>
            <div>
              <label className="block text-left font-semibold">Iskola neve</label>
              <input
                type="text"
                className="w-full border rounded-md p-2"
                placeholder="Pl. Budapesti Gimnázium"
              />
            </div>
            <Button type="submit" onClick={() => setOpen(false)}>
              Küldés
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
