"use client";

import { useState } from "react";
import { Section } from "../base";
import { DonateDialog } from "./Dialog";

export const DonateSection = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <Section>
      <h2 className="text-6xl font-bold font-head">Donate</h2>
      <p>
        We are a non-profit organization and rely on donations to keep our
        servers running.
      </p>
      <DonateDialog />
    </Section>
  );
};
