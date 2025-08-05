import React, { useEffect, useRef, useState, useCallback } from "react";
import { Icon } from "@iconify/react";

export type ActionItem = {
  id: string | number;
  icon?: React.ReactNode | string;
  label: string;
  [key: string]: any;
};

export type ActionsProps = {
  actions?: ActionItem[];
  show: boolean;
  setShow: (show: boolean) => void;
  positionThreshold?: number;
  containerClass?: string;
  buttonClass?: string;
  isIconReverse?: boolean;
  onActionClick?: (action: ActionItem) => void;
};

/**
 * Example usage:
 *
 * <Actions
 *   actions={[
 *     { id: "1", icon: "mdi:home", label: "Home" },
 *     { id: "2", icon: "mdi:settings", label: "Settings" }
 *   ]}
 *   show={true}
 *   setShow={(show) => console.log(show)}
 *   onActionClick={(action) => console.log(action)}
 * />
 */

const Actions: React.FC<ActionsProps> = ({
  actions = [],
  show,
  setShow,
  positionThreshold = 0.7,
  containerClass = "",
  buttonClass = "",
  isIconReverse = false,
  onActionClick,
}) => {
  const actionRef = useRef<HTMLDivElement | null>(null);
  const [isBottom, setIsBottom] = useState(false);

  const checkPosition = useCallback(() => {
    if (actionRef.current) {
      const rect = actionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      setIsBottom(rect.top > viewportHeight * positionThreshold);
    }
  }, [positionThreshold]);

  useEffect(() => {
    if (!show) return;

    checkPosition();
    const handleResizeOrScroll = checkPosition;

    window.addEventListener("resize", handleResizeOrScroll);
    window.addEventListener("scroll", handleResizeOrScroll);

    return () => {
      window.removeEventListener("resize", handleResizeOrScroll);
      window.removeEventListener("scroll", handleResizeOrScroll);
    };
  }, [show, checkPosition]);

  const handleActionClick = (action: ActionItem) => {
    if (onActionClick) onActionClick(action);
    setShow(false);
  };

  return (
    <div
      ref={actionRef}
      className={`absolute ${isBottom ? "bottom-2" : "-top-2"} right-full min-w-48 w-max h-max flex flex-col bg-white border border-gray-200 z-50 rounded shadow-md transition-all duration-150 ease-in-out overflow-hidden 
        ${show ? "scale-100 opacity-100" : "scale-0 opacity-0"} 
        ${containerClass}`}
      aria-haspopup="true"
      aria-expanded={show}
      style={{
        transformOrigin: isBottom ? "bottom left" : "top left",
      }}
    >
      {actions.map((action, idx) => (
        <button
          key={action.id}
          type="button"
          className={`w-full flex gap-4 px-4 py-2 cursor-pointer hover:bg-gray-100 transition ${isIconReverse ? "items-start w-max flex-row-reverse" : "items-center flex-row"} ${buttonClass} ${idx !== actions.length - 1 ? "border-b border-gray-200" : ""}`}
          onClick={() => handleActionClick(action)}
        >
          {action.icon ? (
            <span className="text-base">
              {typeof action.icon === "string" ? (
                <Icon icon={action.icon} width={24} height={24} />
              ) : (
                action.icon
              )}
            </span>
          ) : null}
          <span className="whitespace-nowrap">{action.label}</span>
        </button>
      ))}
    </div>
  );
};

export default Actions;
