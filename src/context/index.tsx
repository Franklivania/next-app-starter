"use client";
import React from "react";
import QueryContextProvider from "./query-context";
import { Toaster } from "sonner";

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      <QueryContextProvider>{children}</QueryContextProvider>
    </>
  );
}
