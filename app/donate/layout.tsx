export default function DonateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col items-center justify-center flex-1">
        <main className="w-full max-w-4xl py-8 px-4 gap-2">{children}</main>
      </div>
    </div>
  );
}
