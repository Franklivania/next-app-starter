import React, {
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  ClipboardEvent,
  FocusEvent,
  ChangeEvent,
} from "react";

export interface GlassOtpInputProps {
  /**
   * Number of OTP digits
   * @default 4
   */
  length?: number;
  /**
   * Called when OTP value changes (as string)
   */
  onChange?: (otp: string) => void;
  /**
   * Optional className for each input box
   */
  className?: string;
  /**
   * Called when user submits (all digits filled and Enter pressed)
   */
  onSubmit?: (otp: string) => void;
  /**
   * Show error state
   */
  hasError?: boolean;
  /**
   * Optional: initial value for OTP
   */
  initialValue?: string;
  /**
   * Optional: disables all inputs
   */
  disabled?: boolean;
}

/**
 * Highly reusable OTP input component with glassmorphism style.
 *
 * @example
 * // Usage Example:
 * <GlassOtpInput
 *   length={6}
 *   onChange={(otp) => setOtp(otp)}
 *   onSubmit={(otp) => verifyOtp(otp)}
 *   hasError={otpError}
 * />
 */
const GlassOtpInput: React.FC<GlassOtpInputProps> = ({
  length = 4,
  onChange,
  className = "",
  onSubmit,
  hasError = false,
  initialValue = "",
  disabled = false,
}) => {
  // State for OTP digits
  const [otp, setOtp] = useState<string[]>(
    initialValue
      ? initialValue
          .slice(0, length)
          .split("")
          .concat(Array(length).fill(""))
          .slice(0, length)
      : Array(length).fill("")
  );
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // Refs for input elements
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Handle input change
  const handleChange = (value: string, index: number) => {
    if (value.length > 1 || (value && !/^[0-9]$/.test(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (onChange) {
      onChange(newOtp.join(""));
    }
    setSubmitAttempted(false); // Reset submit attempt on change
  };

  // Handle key down events
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "Backspace" && e.ctrlKey) {
      const newOtp = Array<string>(length).fill("");
      setOtp(newOtp);
      inputRefs.current[0]?.focus();
      if (onChange) {
        onChange("");
      }
      setSubmitAttempted(false);
    } else if (e.key === "Enter") {
      handleSubmit();
    }
  };

  // Handle paste event
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "");

    if (pastedData.length) {
      const newOtp = Array<string>(length).fill("");
      const pasteLength = Math.min(pastedData.length, length);

      for (let i = 0; i < pasteLength; i++) {
        newOtp[i] = pastedData[i];
      }

      setOtp(newOtp);
      const nextFocusIndex = Math.min(pasteLength, length - 1);
      inputRefs.current[nextFocusIndex]?.focus();
      if (onChange) {
        onChange(newOtp.join(""));
      }
      setSubmitAttempted(false);
    }
  };

  // Handle focus events
  const handleFocus = (index: number) => {
    setFocusedIndex(index);
    inputRefs.current[index]?.select();
  };

  // Handle blur
  const handleBlur = (_e: FocusEvent<HTMLInputElement>) => {
    setFocusedIndex(null);
  };

  // Handle submit attempt
  const handleSubmit = () => {
    setSubmitAttempted(true);
    if (otp.every((val: string) => val !== "")) {
      if (onSubmit) {
        onSubmit(otp.join(""));
      }
    }
  };

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Determine if input should show error state
  const getInputStateClasses = (index: number) => {
    const isError = hasError || (submitAttempted && otp[index] === "");
    const isFilled = otp[index] !== "";

    return [
      "relative w-12 h-12 flex items-center justify-center",
      "rounded-md transition-all duration-200",
      "border-2 border-ash",
      isError
        ? "border-red-500 ring-2 ring-red-500/20"
        : focusedIndex === index
          ? "border-blue-350 ring-2 ring-blue-350/20"
          : isFilled
            ? "border-gray-200"
            : "border-ash",
      "backdrop-blur-sm",
      focusedIndex === index ? "shadow-lg" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");
  };

  return (
    <div className="flex gap-2">
      {Array.from({ length }).map((_, index) => (
        <div
          key={index}
          className={getInputStateClasses(index)}
          onClick={() => inputRefs.current[index]?.focus()}
        >
          <input
            ref={(el) => {
              if (el) {
                inputRefs.current[index] = el;
              }
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={otp[index]}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(e.target.value, index)
            }
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            onFocus={() => handleFocus(index)}
            onBlur={handleBlur}
            className="
              w-full h-full text-center font-medium
              bg-transparent outline-none
              placeholder-gray-400
            "
            autoComplete="off"
            aria-label={`OTP digit ${index + 1}`}
            disabled={disabled}
          />
        </div>
      ))}
    </div>
  );
};

export default GlassOtpInput;

/**
 * Usage Example:
 *
 * import React, { useState } from "react";
 * import GlassOtpInput from "./GlassOTPInput";
 *
 * export default function Demo() {
 *   const [otp, setOtp] = useState("");
 *   const [error, setError] = useState(false);
 *
 *   const handleOtpChange = (val: string) => {
 *     setOtp(val);
 *     setError(false);
 *   };
 *
 *   const handleOtpSubmit = (val: string) => {
 *     if (val === "1234") {
 *       alert("OTP Verified!");
 *     } else {
 *       setError(true);
 *     }
 *   };
 *
 *   return (
 *     <div>
 *       <GlassOtpInput
 *         length={4}
 *         onChange={handleOtpChange}
 *         onSubmit={handleOtpSubmit}
 *         hasError={error}
 *       />
 *       <button
 *         onClick={() => handleOtpSubmit(otp)}
 *         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
 *       >
 *         Verify OTP
 *       </button>
 *     </div>
 *   );
 * }
 */
