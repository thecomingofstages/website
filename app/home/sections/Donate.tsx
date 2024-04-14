import { useState } from "react";

import { Section } from "./base";

export const DonateSection = () => {
  return (
    <Section>
      <h2 className="text-6xl font-bold font-head">Donate</h2>
      <p>
        We are a non-profit organization and rely on donations to keep our
        servers running.
      </p>
    </Section>
  );
};
