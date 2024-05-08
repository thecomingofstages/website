import { DonateForm } from "./Form";

export const runtime = "edge";

export default function DonatePage() {
  return (
    <div className="flex flex-col flex-1">
      <nav className="w-full bg-white/10 p-4">Back to home</nav>
      <div className="flex flex-col items-center justify-center flex-1">
        <main className="w-full max-w-3xl py-8 px-4">
          <section className="p-6 space-y-2">
            <h1 className="text-4xl font-bold">บริจาค</h1>
            <p>องค์กรของเราเป็นองค์กรที่ไม่แสวงหาผลกำไร การบลาๆๆๆๆๆ</p>
          </section>
          <DonateForm />
        </main>
      </div>
    </div>
  );
}
