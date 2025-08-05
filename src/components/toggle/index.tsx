import { useEffect, useState, HTMLAttributes } from "react";

export interface ToggleProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  id: string;
  toggle: boolean;
  setToggled: (toggled: boolean) => void;
}

export default function Toggle({
  className = "",
  id,
  toggle,
  setToggled,
  ...props
}: ToggleProps) {
  const [checked, setChecked] = useState<boolean>(toggle);

  useEffect(() => {
    setChecked(toggle);
  }, [toggle]);

  const handleToggle = () => {
    setChecked((prevChecked) => {
      const newChecked = !prevChecked;
      setToggled(newChecked);
      return newChecked;
    });
  };

  return (
    <div
      className={`py-1 rounded-full w-[4.3em] bg-gray-300 dark:bg-neutral-600 transition-all cursor-pointer ${className}`}
      onClick={handleToggle}
      role="switch"
      aria-checked={checked}
      {...props}
    >
      <input
        type="checkbox"
        name="checkbox"
        id={id}
        checked={checked}
        className="hidden"
        readOnly
      />
      <div
        className={`w-6 h-6 rounded-full  transition-transform duration-150 ease-in-out ${
          checked ? "translate-x-[170%] bg-blue-500" : "translate-x-1 bg-white"
        }`}
      />
    </div>
  );
}
