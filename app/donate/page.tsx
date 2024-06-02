import { DonateForm } from "./Form";
import { DonateHeader } from "./Header";

export default function DonatePage() {
  return (
    <>
      <DonateHeader
        title={"บริจาคให้โครงการ The Coming of Stages (เด็กไทยติดเวที)"}
      >
        {/* todo: add donate description */}
      </DonateHeader>
      <DonateForm />
    </>
  );
}
