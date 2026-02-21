import "./global.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "G.read",
  icons: {
    icon: "/common/icon-gread.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <div id="app-shell">{children}</div>
      </body>
    </html>
  );
}
