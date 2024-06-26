import { Metadata } from "next";

import Navbar from "../Navbar";
import { ConceptOfOurPlaySection } from "./sections/Conceptofourplay";
import { ContactSection } from "./sections/Contact";
import { DepartmentsSection } from "./sections/Departments";
import { DonateSection } from "./sections/Donate";
import { GettingToKnowUsSection } from "./sections/Know";
import { LandingSection } from "./sections/Landing";
import { VisionSection } from "./sections/Vision";

export const metadata: Metadata = {
  title: "หน้าหลัก",
};

export default function HomePage() {
  return (
    <>
      <Navbar
        navigationType={"single"}
        items={[
          {
            name: "Getting to know us",
            path: "#know-us",
          },
          { name: "Vision & Mission", path: "#vision" },
          {
            name: "Concept of our play",
            path: "#our-play",
          },
          { name: "Support us", path: "#support" },
        ]}
      />
      <main>
        <LandingSection />
        <GettingToKnowUsSection />
        <VisionSection />
        <ConceptOfOurPlaySection />
        <DonateSection />
        <DepartmentsSection />
        <ContactSection />
      </main>
    </>
  );
}
