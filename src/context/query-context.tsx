import { QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import React from "react";

export default function QueryContextProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
