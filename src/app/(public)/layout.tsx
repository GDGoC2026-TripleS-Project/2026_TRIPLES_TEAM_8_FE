// import TopNavBar from "@/components/layout/TopNavBar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* <TopNavBar /> */}
      <main>{children}</main>
    </div>
  );
}
