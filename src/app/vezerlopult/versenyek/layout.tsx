import withRole from "@/utils/withRole";
import React from "react";

export default async function VersenyekLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await withRole(["ORGANIZER"]);

  return children;
}
