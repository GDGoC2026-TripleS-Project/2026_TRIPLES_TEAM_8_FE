// import TopNavBar from "@/components/layout/TopNavBar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <TopNavBar /> */}
      <main>{children}</main>
    </>
  );
}
