import { useState, ChangeEvent } from "react";

interface UseMaxLengthProps {
  maxLength?: number;
  initialValue?: string;
}

interface UseMaxLengthReturn {
  value: string;
  charCount: number;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  remainingChars: number | undefined;
}

export const useMaxLength = ({
  maxLength,
  initialValue = "",
}: UseMaxLengthProps): UseMaxLengthReturn => {
  const [value, setValue] = useState<string>(initialValue);
  const [charCount, setCharCount] = useState<number>(initialValue.length);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value;

    // Only update value if maxLength is not set or if the length is within the maxLength limit
    if (!maxLength || newValue.length <= maxLength) {
      setValue(newValue);
      setCharCount(newValue.length);
    }
  };

  return {
    value,
    charCount,
    handleChange,
    remainingChars: maxLength ? maxLength - charCount : undefined,
  };
};
