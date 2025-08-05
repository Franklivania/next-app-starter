import React, {
  useState,
  forwardRef,
  ForwardedRef,
  HTMLAttributes,
} from "react";
import { cva, VariantProps } from "class-variance-authority";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";

// type DragDropVariant = "plain" | "colored";
// type DragDropSize = "full" | "half" | "compact";
type DragDropState = "idle" | "active";

interface DragAndDropFileProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onDrop">,
    VariantProps<typeof dragDropStyles> {
  onFileDrop: (file: File | File[] | null) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  icon?: string;
  className?: string;
}

const dragDropStyles = cva(
  "relative flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer transition-colors",
  {
    variants: {
      variant: {
        plain: "border-gray-300",
        colored: "border-green-650",
      },
      state: {
        idle: "border-gray-300 text-gray-500 dark:border-neutral-600 dark:text-gray-400",
        active: "border-green-500 bg-green-50 text-green-700",
      },
      size: {
        full: "w-full",
        half: "w-[50%]",
        compact: "w-52 h-52",
      },
    },
    defaultVariants: {
      state: "idle",
      variant: "plain",
      size: "full",
    },
  }
);

const DragAndDropFile = forwardRef<HTMLDivElement, DragAndDropFileProps>(
  (
    {
      onFileDrop,
      accept = "",
      multiple = false,
      maxSize = 5 * 1024 * 1024,
      icon = "",
      variant = "plain",
      size = "full",
      className = "",
      ...props
    }: DragAndDropFileProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const [dragState, setDragState] = useState<DragDropState>("idle");
    const [fileName, setFileName] = useState<string>(
      "Click to upload or drag and drop"
    );
    const [file, setFile] = useState<File | null>(null);

    // Common file validation logic
    const validateFiles = (files: File[]): File[] => {
      return files.filter((file: File) => {
        if (accept && !file.type.match(accept.replace(/\s/g, ""))) {
          toast.error("Invalid file type.");
          return false;
        }
        if (maxSize && file.size > maxSize) {
          toast.error(
            `File size exceeds the limit of ${(maxSize / 1024 / 1024).toFixed(
              2
            )}MB.`
          );
          return false;
        }
        return true;
      });
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragState("active");
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragState("idle");
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragState("idle");

      const files: File[] = Array.from(e.dataTransfer.files);
      const validFiles: File[] = validateFiles(files);

      if (validFiles.length > 0) {
        const selectedFile: File = validFiles[0];
        setFileName(selectedFile.name);
        setFile(selectedFile); // Save the file state
        onFileDrop(multiple ? validFiles : selectedFile);
      }
    };

    const handleClick = () => {
      const input: HTMLInputElement = document.createElement("input");
      input.type = "file";
      input.accept = accept || "*/*";
      input.multiple = multiple || false;

      input.onchange = (e: Event) => {
        const target = e.target as HTMLInputElement | null;
        if (!target || !target.files) return;
        const files: File[] = Array.from(target.files);
        const validFiles: File[] = validateFiles(files);

        if (validFiles.length > 0) {
          const selectedFile: File = validFiles[0];
          setFileName(selectedFile.name);
          setFile(selectedFile); // Save the file state
          onFileDrop(multiple ? validFiles : selectedFile);
        }
      };

      input.click();
    };

    // Function to handle file removal
    const handleRemoveFile = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setFile(null);
      setFileName("Click to upload or drag and drop");
      onFileDrop(null); // Trigger callback with null to notify file removal
    };

    return (
      <div
        ref={ref}
        className={cn(
          dragDropStyles({ state: dragState, variant, size }),
          className
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        {...props}
      >
        {/* Delete Icon */}
        {file && (
          <button
            type="button"
            onClick={handleRemoveFile}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            tabIndex={0}
            aria-label="Remove file"
          >
            <Icon icon="tabler:trash" width={24} />
          </button>
        )}

        <div className="flex flex-col items-center text-center">
          {icon && (
            <Icon icon={icon} width={56} className="text-green-650 mb-2" />
          )}
          <p className="font-medium text-sm">{fileName}</p>
        </div>
      </div>
    );
  }
);

DragAndDropFile.displayName = "DragAndDropFile";

export default DragAndDropFile;

/**
 * How to use the DragAndDropFile component:
 * 
 * Example:
 * 
 * import DragAndDropFile from "@/components/dragDrop";
 * import { useState } from "react";
 * 
 * function Example() {
 *   const [file, setFile] = useState<File | File[] | null>(null);
 * 
 *   return (
 *     <DragAndDropFile
 *       onFileDrop={setFile}
 *       accept="image/*"
 *       multiple={false}
 *       maxSize={2 * 1024 * 1024} // 2MB
 *       icon="tabler:upload"
 *       variant="colored"
 *       size="compact"
 *     />
 *   );
 * }
 * 
 * Props:
 * - onFileDrop: (file: File | File[] | null) => void (required)
 * - accept?: string (optional, accepted file types, e.g. "image/*")
 * - multiple?: boolean (optional, allow multiple files)
 * - maxSize?: number (optional, max file size in bytes)
 * - icon?: string (optional, iconify icon name)
 * - variant?: "plain" | "colored" (optional, default "plain")
 * - size?: "full" | "half" | "compact" (optional, default "full")
 * - className?: string (optional, extra classes)
 */
