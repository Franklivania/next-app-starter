"use client";
import React, { useState, useEffect, useMemo, ReactNode } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export interface Tab {
  label: string;
  component: ReactNode;
  color?: string;
  inActive?: boolean;
  [key: string]: unknown; // for extra flexibility
}

export type TabsPosition = "left" | "center" | "right";

export interface TabsProps {
  tabs: Tab[];
  position?: TabsPosition;
  activateParams?: boolean;
  className?: string;
  tabButtonClassName?: string;
  tabIndicatorClassName?: string;
  onTabChange?: (activeTabIndex: number, tab: Tab) => void;
  initialTabIndex?: number;
  paramKey?: string; // for custom query param key, default "tab"
}

function getFormattedLabel(label: string): string {
  return label.toLowerCase().replace(/\s+/g, "-");
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  position = "center",
  activateParams = false,
  className = "",
  tabButtonClassName = "",
  tabIndicatorClassName = "",
  onTabChange,
  initialTabIndex,
  paramKey = "tab",
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Compute initial tab index
  const initialTabLabel = useMemo(() => {
    if (!activateParams) return null;
    return searchParams?.get(paramKey);
  }, [searchParams, activateParams, paramKey]);

  const initialActiveTab = useMemo(() => {
    if (typeof initialTabIndex === "number") return initialTabIndex;
    if (initialTabLabel) {
      const idx = tabs.findIndex(
        (tab) => getFormattedLabel(tab.label) === initialTabLabel
      );
      return idx !== -1 ? idx : 0;
    }
    return 0;
  }, [initialTabLabel, tabs, initialTabIndex]);

  const [activeTab, setActiveTab] = useState<number>(initialActiveTab);

  // Keep activeTab in sync with searchParams if activateParams
  useEffect(() => {
    if (!activateParams) return;
    const label = getFormattedLabel(tabs[activeTab]?.label ?? "");
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    params.set(paramKey, label);
    // Next.js router.replace for shallow update
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, activateParams, tabs, paramKey, pathname]);

  // If searchParams change (e.g. browser navigation), update activeTab
  useEffect(() => {
    if (!activateParams) return;
    const label = searchParams?.get(paramKey);
    if (label) {
      const idx = tabs.findIndex(
        (tab) => getFormattedLabel(tab.label) === label
      );
      if (idx !== -1 && idx !== activeTab) setActiveTab(idx);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, activateParams, tabs, paramKey]);

  const handleTabClick = (index: number) => {
    if (tabs[index]?.inActive) {
      toast.info("Hang tight! This feature is coming soon.");
      return;
    }
    setActiveTab(index);
    onTabChange?.(index, tabs[index]);
    if (activateParams) {
      const label = getFormattedLabel(tabs[index].label);
      const params = new URLSearchParams(searchParams?.toString() ?? "");
      params.set(paramKey, label);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  const positionClass =
    position === "left"
      ? "mr-auto"
      : position === "right"
        ? "ml-auto"
        : "mx-auto";

  return (
    <div className={className}>
      <section
        className={`relative flex w-max px-1 py-2 bg-white ${positionClass} rounded-xl`}
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            className={`relative w-32 whitespace-nowrap lg:w-26 2xl:w-32 py-1.5 text-sm lg:text-base capitalize z-10 cursor-pointer transition-colors ${
              activeTab === index
                ? `font-medium ${tab.color ? `text-${tab.color}` : "text-black"}`
                : "font-medium text-gray-600"
            } ${tabButtonClassName}`}
            onClick={() => handleTabClick(index)}
            disabled={tab.inActive}
            aria-selected={activeTab === index}
            tabIndex={tab.inActive ? -1 : 0}
            type="button"
          >
            {tab.label}
          </button>
        ))}
        <div
          className={`absolute bottom-[0.185em] left-1 w-32 lg:w-26 2xl:w-32 h-[4%] rounded-lg bg-neutral-500 transition-transform duration-200 ease-in-out ${tabIndicatorClassName}`}
          style={{ transform: `translateX(${activeTab * 100}%)` }}
          aria-hidden="true"
        />
      </section>
      <div className="mt-4">{tabs[activeTab]?.component}</div>
    </div>
  );
};

export default Tabs;

/**
 * Example usage:
 *
 * import Tabs from "./tabs";
 *
 * const tabData = [
 *   {
 *     label: "Tab 1",
 *     component: <div>Content for Tab 1</div>,
 *   },
 *   {
 *     label: "Tab 2",
 *     component: <div>Content for Tab 2</div>,
 *   },
 *   {
 *     label: "Tab 3",
 *     component: <div>Content for Tab 3</div>,
 *     color: "blue-600", // optional, for active tab text color
 *   },
 * ];
 *
 * export default function ExampleTabs() {
 *   return (
 *     <Tabs
 *       tabs={tabData}
 *       position="center" // or "left" or "right"
 *       className="my-8"
 *       tabButtonClassName="px-2"
 *       tabIndicatorClassName="bg-blue-500"
 *       activateParams={true}
 *       paramKey="tab"
 *     />
 *   );
 * }
 */
