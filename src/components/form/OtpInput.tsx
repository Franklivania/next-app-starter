"use client";
import React, {
  useState,
  useRef,
  KeyboardEvent,
  ClipboardEvent,
  ChangeEvent,
  RefObject,
  FC,
} from "react";

export interface OtpInputProps {
  /**
   * Number of OTP digits (default: 5)
   */
  length?: number;
  /**
   * Called when all digits are filled
   */
  onComplete: (otp: string) => void;
  /**
   * Optional: disables all inputs
   */
  disabled?: boolean;
  /**
   * Optional: className for each input
   */
  inputClassName?: string;
}

/**
 * OtpInput - A simple OTP input component for numeric codes.
 *
 * @example
 * import React, { useState } from "react";
 * import OtpInput from "./OtpInput";
 *
 * export default function Demo() {
 *   const [otp, setOtp] = useState("");
 *   return (
 *     <div>
 *       <OtpInput
 *         length={6}
 *         onComplete={(val) => setOtp(val)}
 *       />
 *       <div>Entered OTP: {otp}</div>
 *     </div>
 *   );
 * }
 */
const OtpInput: FC<OtpInputProps> = ({
  length = 5,
  onComplete,
  disabled = false,
  inputClassName = "",
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Handle input change
  const handleChange = (
    value: string,
    index: number
  ) => {
    if (!/^\d*$/.test(value)) return; // Allow only digits

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Keep only the last digit
    setOtp(newOtp);

    // Move focus to the next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Call onComplete if all fields are filled
    if (newOtp.every((digit) => digit !== "")) {
      onComplete(newOtp.join(""));
    }
  };

  // Handle keydown (backspace)
  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index]) {
      if (index > 0) inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste event
  const handlePaste = (
    e: ClipboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, length);
    if (!/^\d*$/.test(pastedData)) return;

    const newOtp = pastedData.split("").slice(0, length);
    setOtp([...newOtp, ...Array(length - newOtp.length).fill("")]);
    if (newOtp.length > 0) {
      inputRefs.current[newOtp.length - 1]?.focus();
    }
    if (newOtp.length === length && onComplete) {
      onComplete(newOtp.join(""));
    }
  };

  return (
    <div className="flex gap-2 flex-wrap items-center">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange(e.target.value, index)
          }
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
            handleKeyDown(e, index)
          }
          onPaste={handlePaste}
          className={
            inputClassName ||
            "w-20 h-12 text-center text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green"
          }
          disabled={disabled}
          autoComplete="off"
          aria-label={`OTP digit ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default OtpInput;
