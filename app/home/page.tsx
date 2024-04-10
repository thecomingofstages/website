import Navbar from "../์Navbar";
import { GettingToKnowUsSection } from "./sections/Know";
import { LandingSection } from "./sections/Landing";

export default function HomePage() {
  return (
    <div>
      <Navbar
        navigationType={"single"}
        items={[
          { name: "getting to know us", path: "#know-us" },
          { name: "donations", path: "#donate" },
          { name: "our play", path: "#our-play" },
          { name: "contact", path: "#contact" },
        ]}
      />
      <main>
        <LandingSection />
        <GettingToKnowUsSection />
      </main>
    </div>
  );
}
