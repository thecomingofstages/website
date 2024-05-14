import { Section } from "../base";
import { Bubble } from "./components/bubbles";
import { missionBubble } from "./components/bubbles/1-mission";
import { futureBubble } from "./components/bubbles/2-future";
import { howToBubble } from "./components/bubbles/3-howto";

const bubbles = [missionBubble, futureBubble, howToBubble];

export const DonateSection = () => {
  return (
    <div id="support">
      <Section className={"flex flex-col items-center justify-center gap-6"}>
        <div className="gap-2 flex flex-col items-center justify-center text-center">
          <h2 className="text-6xl font-bold font-serif italic">SUPPORT US</h2>
          <span className="text-medium text-xl">
            ทำไมถึงควรร่วมบริจาคกับเรา
          </span>
        </div>
        <div className="flex flex-col md:flex-row gap-10 justify-center items-center w-full">
          {bubbles.map((bubble) => (
            <Bubble key={bubble.title} {...bubble} />
          ))}
        </div>
      </Section>
    </div>
  );
};
