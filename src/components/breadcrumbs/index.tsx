import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";

const breadcrumbsVariants = cva(
  "flex items-center space-x-1 text-sm font-medium",
  {
    variants: {
      variant: {
        default: "text-gray-600 dark:text-gray-400",
        subtle: "text-gray-500 dark:text-gray-500",
        bold: "text-gray-900 dark:text-gray-100 font-semibold",
        colored: "text-blue-600 dark:text-blue-400",
      },
      size: {
        sm: "text-xs",
        default: "text-sm",
        lg: "text-base",
        xl: "text-lg",
      },
      separator: {
        default: "text-gray-400 dark:text-gray-600",
        subtle: "text-gray-300 dark:text-gray-700",
        colored: "text-blue-400 dark:text-blue-500",
        custom: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      separator: "default",
    },
  }
);

const breadcrumbItemVariants = cva(
  "transition-colors duration-200 ease-in-out",
  {
    variants: {
      variant: {
        default: "hover:text-gray-900 dark:hover:text-gray-100",
        subtle: "hover:text-gray-700 dark:hover:text-gray-300",
        bold: "hover:text-gray-700 dark:hover:text-gray-300",
        colored: "hover:text-blue-800 dark:hover:text-blue-300",
      },
      isActive: {
        true: "text-gray-900 dark:text-gray-100 font-medium cursor-default",
        false: "cursor-pointer",
      },
    },
    defaultVariants: {
      variant: "default",
      isActive: false,
    },
  }
);

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
  onClick?: () => void;
}

export interface BreadcrumbsProps
  extends React.HTMLAttributes<HTMLElement>,
    Omit<VariantProps<typeof breadcrumbsVariants>, "separator"> {
  items: BreadcrumbItem[];
  separator?: "slash" | "chevron" | "arrow" | "dot" | "custom";
  customSeparator?: React.ReactNode;
  maxItems?: number;
  showHomeIcon?: boolean;
  homeIcon?: string;
  homeLabel?: string;
  truncateLongLabels?: boolean;
  maxLabelLength?: number;
  asChild?: boolean;
}

const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  (
    {
      className,
      variant,
      size,
      separator: separatorVariant = "slash",
      customSeparator,
      items,
      maxItems,
      showHomeIcon = false,
      homeIcon = "mdi:home",
      homeLabel = "Home",
      truncateLongLabels = false,
      maxLabelLength = 20,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? "span" : "nav";

    // Add home item if requested
    const allItems = showHomeIcon
      ? [{ label: homeLabel, href: "/", icon: homeIcon }, ...items]
      : items;

    // Limit items if maxItems is specified
    const displayItems =
      maxItems && allItems.length > maxItems
        ? [
            ...allItems.slice(0, 1),
            { label: "...", href: undefined, icon: undefined },
            ...allItems.slice(-(maxItems - 2)),
          ]
        : allItems;

    // Truncate long labels if requested
    const processedItems = displayItems.map((item) => ({
      ...item,
      label:
        truncateLongLabels && item.label.length > maxLabelLength
          ? `${item.label.substring(0, maxLabelLength)}...`
          : item.label,
    }));

    const getSeparator = (index: number) => {
      if (index === processedItems.length - 1) return null;

      if (customSeparator) return customSeparator;

      const separatorClasses = cn(
        "mx-2",
        breadcrumbsVariants({ separator: "default", className: "" })
      );

      switch (separatorVariant) {
        case "chevron":
          return <Icon icon="mdi:chevron-right" className={separatorClasses} />;
        case "arrow":
          return <Icon icon="mdi:arrow-right" className={separatorClasses} />;
        case "dot":
          return <span className={cn(separatorClasses, "text-lg")}>•</span>;
        case "custom":
          return null;
        default:
          return <span className={separatorClasses}>/</span>;
      }
    };

    const handleItemClick = (item: BreadcrumbItem, index: number) => {
      if (index === processedItems.length - 1) return; // Don't navigate on last item

      if (item.onClick) {
        item.onClick();
      } else if (item.href) {
        window.location.href = item.href;
      }
    };

    return (
      <Comp
        ref={ref}
        aria-label="Breadcrumb"
        className={cn(breadcrumbsVariants({ variant, size, className }))}
        {...props}
      >
        <ol className="flex items-center space-x-1">
          {processedItems.map((item, index) => {
            const isActive = index === processedItems.length - 1;
            const isClickable = !isActive && (item.href || item.onClick);

            return (
              <li key={index} className="flex items-center">
                <span
                  className={cn(
                    breadcrumbItemVariants({
                      variant,
                      isActive,
                      className: isClickable ? "" : "pointer-events-none",
                    })
                  )}
                  onClick={() => handleItemClick(item, index)}
                  role={isClickable ? "button" : undefined}
                  tabIndex={isClickable ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (isClickable && (e.key === "Enter" || e.key === " ")) {
                      e.preventDefault();
                      handleItemClick(item, index);
                    }
                  }}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.icon && (
                    <Icon
                      icon={item.icon}
                      className="mr-1 h-4 w-4 inline-block"
                    />
                  )}
                  {item.label}
                </span>
                {getSeparator(index)}
              </li>
            );
          })}
        </ol>
      </Comp>
    );
  }
);
Breadcrumbs.displayName = "Breadcrumbs";

// Individual breadcrumb item component for more granular control
export interface BreadcrumbItemProps
  extends React.HTMLAttributes<HTMLLIElement>,
    VariantProps<typeof breadcrumbItemVariants> {
  children: React.ReactNode;
  isActive?: boolean;
  href?: string;
  onClick?: () => void;
  icon?: string;
}

const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  (
    {
      className,
      variant,
      isActive = false,
      href,
      onClick,
      icon,
      children,
      ...props
    },
    ref
  ) => {
    const isClickable = !isActive && (href || onClick);

    const handleClick = () => {
      if (onClick) {
        onClick();
      } else if (href) {
        window.location.href = href;
      }
    };

    return (
      <li ref={ref} className={cn("flex items-center", className)} {...props}>
        <span
          className={cn(
            breadcrumbItemVariants({ variant, isActive }),
            isClickable ? "cursor-pointer" : "pointer-events-none"
          )}
          onClick={handleClick}
          role={isClickable ? "button" : undefined}
          tabIndex={isClickable ? 0 : undefined}
          onKeyDown={(e) => {
            if (isClickable && (e.key === "Enter" || e.key === " ")) {
              e.preventDefault();
              handleClick();
            }
          }}
          aria-current={isActive ? "page" : undefined}
        >
          {icon && <Icon icon={icon} className="mr-1 h-4 w-4 inline-block" />}
          {children}
        </span>
      </li>
    );
  }
);
BreadcrumbItem.displayName = "BreadcrumbItem";

// Separator component for custom separators
export interface BreadcrumbSeparatorProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  variant?: VariantProps<typeof breadcrumbsVariants>["separator"];
}

const BreadcrumbSeparator = React.forwardRef<
  HTMLSpanElement,
  BreadcrumbSeparatorProps
>(({ className, variant = "default", children, ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "mx-2",
        breadcrumbsVariants({ separator: variant, className: "" }),
        className
      )}
      aria-hidden="true"
      {...props}
    >
      {children || "/"}
    </span>
  );
});
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export {
  Breadcrumbs,
  BreadcrumbItem,
  BreadcrumbSeparator,
  breadcrumbsVariants,
  breadcrumbItemVariants,
};
