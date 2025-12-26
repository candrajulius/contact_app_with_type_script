import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact App - Register",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
