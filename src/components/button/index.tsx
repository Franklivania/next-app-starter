import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-medium transition-all duration-150 ease-in-out hover:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-700 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-teal-700 text-white",
        accent: "bg-teal-700/40 text-white",
        outline: "bg-transparent text-teal-700 border border-teal-700",
        plain: "bg-transparent text-teal-700",
      },
      size: {
        default: "px-4 py-3",
        sm: "py-2.5 px-3 text-sm",
        lg: "py-4 px-8",
        icon: "p-2.5",
      },
      design: {
        default: "rounded-none",
        curved: "rounded-lg",
        rounded: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      design: "default",
    },
  }
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    children: React.ReactNode;
    isLoading?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      design,
      asChild = false,
      isLoading,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? "span" : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, design, className }))}
        ref={ref}
        {...props}
        disabled={isLoading}
      >
        {isLoading ? (
          <Icon
            icon="line-md:loading-loop"
            width={24}
            height={24}
            className="animate-spin"
            aria-label="Loading"
            role="status"
          />
        ) : (
          <>{children}</>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };