"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface TabsContextType {
  activeTab: string;
  setActiveTab: (newTab: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

interface TabsProps {
  value: string;
  onValueChange?: (newTab: string) => void;
  children: ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  value,
  onValueChange,
  children,
  className,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Make it a controlled component - use the passed value prop
  const activeTab = value;

  useEffect(() => {
    // Only update URL when the tab changes
    const params = new URLSearchParams(searchParams.toString());
    if (activeTab !== params.get("tab")) {
      params.set("tab", activeTab);
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [activeTab, router, searchParams]);

  const setActiveTab = (newTab: string) => {
    // Notify parent component of changes
    if (onValueChange) {
      onValueChange(newTab);
    }
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

export const useTabsContext = (): TabsContextType => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("useTabsContext must be used within Tabs");
  }
  return context;
};
