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
            name: "Know us",
            path: "#know-us",
          },
          { name: "Vision & Mission", path: "#vision" },
          {
            name: "Concept",
            path: "#our-play",
          },
          { name: "Support", path: "#support" },
          {
            name: "Departments",
            path: "#departments",
          },
          {
            name: "Contact",
            path: "#contact",
          },
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
