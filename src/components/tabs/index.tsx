"use client";
import { useTabsContext } from "@/context/tabscontext";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface TabsListProps {
  children: ReactNode;
  className?: string;
}

export const TabsList: React.FC<TabsListProps> = ({ children, className }) => (
  <div className={cn("flex gap-4 border-b w-full", className)}>{children}</div>
);

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  children,
  className,
}) => {
  const { activeTab, setActiveTab } = useTabsContext();

  return (
    <button
      type="button"
      onClick={() => setActiveTab(value)}
      className={cn(
        "px-4 py-2 w-full text-md font-medium border-b-2 transition",
        activeTab === value
          ? "border-[#E08D40] text-[#1D2026]"
          : "border-transparent text-gray-500 hover:text-[#E08D40]",
        className
      )}
    >
      {children}
    </button>
  );
};

interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({
  value,
  children,
  className,
}) => {
  const { activeTab } = useTabsContext();

  if (value !== activeTab) return null;

  return <div className={cn("py-4", className)}>{children}</div>;
};
