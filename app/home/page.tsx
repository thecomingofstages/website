import Navbar from "../์Navbar";
import { LandingSection } from "./sections/Landing";
import { WhoSection } from "./sections/Who";

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
        <WhoSection />
      </main>
    </div>
  );
}
