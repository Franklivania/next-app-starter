import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "relative overflow-hidden transition-all duration-200 ease-in-out",
  {
    variants: {
      variant: {
        default:
          "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
        elevated: "bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl",
        outlined:
          "bg-transparent border-2 border-gray-300 dark:border-gray-600",
        ghost:
          "bg-transparent border-none hover:bg-gray-50 dark:hover:bg-gray-800/50",
        interactive:
          "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 active:scale-[0.98]",
      },
      size: {
        sm: "p-3 rounded-lg",
        default: "p-4 rounded-xl",
        lg: "p-6 rounded-2xl",
        xl: "p-8 rounded-3xl",
      },
      design: {
        default: "rounded-xl",
        curved: "rounded-2xl",
        rounded: "rounded-full",
        square: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      design: "default",
    },
  }
);

const cardHeaderVariants = cva("", {
  variants: {
    size: {
      sm: "pb-2",
      default: "pb-3",
      lg: "pb-4",
      xl: "pb-6",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const cardContentVariants = cva("", {
  variants: {
    size: {
      sm: "py-2",
      default: "py-3",
      lg: "py-4",
      xl: "py-6",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const cardFooterVariants = cva("", {
  variants: {
    size: {
      sm: "pt-2",
      default: "pt-3",
      lg: "pt-4",
      xl: "pt-6",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { className, variant, size, design, asChild = false, children, ...props },
    ref
  ) => {
    const Comp = asChild ? "span" : "div";
    return (
      <Comp
        className={cn(cardVariants({ variant, size, design, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
Card.displayName = "Card";

export interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardHeaderVariants> {
  children: React.ReactNode;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col space-y-1.5",
          cardHeaderVariants({ size, className })
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CardHeader.displayName = "CardHeader";

export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn(
          "text-lg font-semibold leading-none tracking-tight text-gray-900 dark:text-gray-100",
          className
        )}
        {...props}
      >
        {children}
      </h3>
    );
  }
);
CardTitle.displayName = "CardTitle";

export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, children, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(
        "text-sm text-gray-600 dark:text-gray-400 leading-relaxed",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
});
CardDescription.displayName = "CardDescription";

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardContentVariants> {
  children: React.ReactNode;
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardContentVariants({ size, className }))}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CardContent.displayName = "CardContent";

export interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardFooterVariants> {
  children: React.ReactNode;
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between",
          cardFooterVariants({ size, className })
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CardFooter.displayName = "CardFooter";

export interface CardImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspectRatio?: "square" | "video" | "wide" | "ultrawide";
}

const CardImage = React.forwardRef<HTMLImageElement, CardImageProps>(
  ({ className, aspectRatio = "video", ...props }, ref) => {
    const aspectRatioClasses = {
      square: "aspect-square",
      video: "aspect-video",
      wide: "aspect-[16/10]",
      ultrawide: "aspect-[21/9]",
    };

    return (
      <div className={cn("overflow-hidden", aspectRatioClasses[aspectRatio])}>
        <img
          ref={ref}
          className={cn(
            "w-full h-full object-cover transition-transform duration-300 hover:scale-105",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
CardImage.displayName = "CardImage";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
  cardVariants,
};
