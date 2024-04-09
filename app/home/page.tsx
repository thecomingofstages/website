import Navbar from "../์Navbar";
import { GettingToKnowUsSection } from "./sections/Know";
import { LandingSection } from "./sections/Landing";

export default function HomePage() {
  return (
    <div>
      <Navbar
        navigationType={"single"}
        items={[
          { name: "About us", path: "#about" },
          { name: "Upcoming", path: "#upcoming" },
          { name: "Contribute", path: "#contribute" },
        ]}
      />
      <main>
        <LandingSection />
        <GettingToKnowUsSection />
      </main>
    </div>
  );
}
