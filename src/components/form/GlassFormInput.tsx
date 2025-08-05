"use client";
import { useState, forwardRef, useMemo, InputHTMLAttributes } from "react";
import { Icon } from "@iconify/react";

// Define the props interface for type safety and better DX
export interface GlassFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: string;
  mainClassName?: string;
}

const GlassFormInput = forwardRef<HTMLInputElement, GlassFormInputProps>(
  (
    {
      label,
      error,
      icon,
      type = "text",
      className = "",
      mainClassName = "",
      ...props
    },
    ref
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const togglePasswordVisibility = useMemo(
      () => () => setIsPasswordVisible((prev) => !prev),
      []
    );

    const inputType = type === "password" && isPasswordVisible ? "text" : type;
    const borderColor = error
      ? "#FF0000"
      : isFocused
      ? "#675BA3"
      : "#3F4155";

    return (
      <div className={`relative w-full ${mainClassName}`}>
        {label && (
          <label className="block mb-1 font-normal text-lg">{label}</label>
        )}
        <div
          className={`relative overflow-hidden flex items-center rounded-2xl glass-input`}
          style={{
            borderColor,
          }}
        >
          {icon && (
            <span className="absolute right-0 text-gray-500 pr-3">
              <Icon icon={icon} width={20} />
            </span>
          )}
          <input
            ref={ref}
            type={inputType}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`w-full text-base pl-6 pr-10 py-2 bg-transparent focus:outline-none ${className}`}
            style={{
              color: "#FFFFFF",
            }}
            {...props}
          />
          {type === "password" && (
            <button
              type="button"
              className="absolute inset-y-0 right-3 text-gray-400 cursor-pointer"
              onClick={togglePasswordVisibility}
              aria-label="Toggle Password Visibility"
              tabIndex={-1}
            >
              <Icon
                icon={isPasswordVisible ? "mdi:eye-outline" : "mdi:eye-off-outline"}
                width={20}
              />
            </button>
          )}
        </div>
        {error && <span className="text-red-600 text-sm mt-1 block">{error}</span>}
      </div>
    );
  }
);

GlassFormInput.displayName = "GlassFormInput";

export default GlassFormInput;
