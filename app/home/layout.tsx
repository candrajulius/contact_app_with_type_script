import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact App - Home",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
