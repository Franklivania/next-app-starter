import Image from "next/image";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import type { HTMLAttributes, MouseEventHandler } from "react";

const avatarVariants = cva(
  "relative flex items-center justify-center overflow-hidden",
  {
    variants: {
      size: {
        sm: "w-8 h-8",
        md: "w-12 h-12",
        lg: "w-16 h-16",
        xl: "w-20 h-20",
        "2xl": "w-24 h-24",
        "3xl": "w-32 h-32",
      },
      rounded: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      size: "md",
      rounded: "full",
    },
  }
);

type AvatarProps = {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  onAvatarClick?: MouseEventHandler<HTMLDivElement>;
  className?: string;
  icon?: string;
} & HTMLAttributes<HTMLDivElement>;

const Avatar = ({
  src,
  alt = "Avatar",
  size = "md",
  rounded = "full",
  onAvatarClick,
  className,
  icon,
  ...props
}: AvatarProps) => {
  return (
    <div
      className={cn(avatarVariants({ size, rounded }), className)}
      {...props}
    >
      {/* Image Display */}
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100%"
          className="object-cover"
          priority
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-gray-200">
          {icon && <Icon icon={icon} className="w-2/3 h-2/3 text-gray-400" />}
        </div>
      )}

      {/* Overlay for clickable avatar */}
      {onAvatarClick && (
        <div
          onClick={onAvatarClick}
          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
        >
          <span className="text-white font-medium">
            {icon && <Icon icon={icon} className="w-6 h-6" />}
          </span>
        </div>
      )}
    </div>
  );
};

export default Avatar;
