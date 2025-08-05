"use client";

import { useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "@iconify/react";

interface AccordionItemProps {
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem = memo<AccordionItemProps>(
  ({ title, content, isOpen, onToggle }) => (
    <div
      className="mb-4 rounded-lg bg-amber-150 overflow-hidden border-[1px] border-green-550"
      style={{ boxShadow: "3px 4px 0px 0px #000000" }}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none cursor-pointer"
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${title}`}
      >
        <h3 className="font-sans font-semibold text-base text-dark md:text-xl leading-[100%] ">
          {title}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Icon
            icon="eva:plus-fill"
            className="text-amber-750"
            width={24}
            height={24}
            aria-hidden="true"
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`accordion-content-${title}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="font-sans px-6 py-4 text-dark/80 font-normal text-base">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
);
AccordionItem.displayName = "AccordionItem";

interface AccordionProps {
  items: { title: string; content: React.ReactNode }[];
  allowMultiple?: boolean;
  className?: string;
}

/**
 * Accordion component for showing collapsible content panels.
 *
 * @example
 * ```tsx
 * import { Accordion } from "@/components/accordion";
 *
 * const faqItems = [
 *   { title: "What is your return policy?", content: "You can return any item within 30 days." },
 *   { title: "How do I track my order?", content: "Tracking info will be emailed to you." },
 *   { title: "Can I purchase items again?", content: "Yes, just add them to your cart!" },
 * ];
 *
 * export default function FAQ() {
 *   return (
 *     <Accordion items={faqItems} allowMultiple />
 *   );
 * }
 * ```
 */
export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className = "",
}) => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = useCallback(
    (index: number) => {
      setOpenItems((prev) => {
        const next = new Set(prev);
        if (next.has(index)) {
          next.delete(index);
        } else {
          if (!allowMultiple) next.clear();
          next.add(index);
        }
        return next;
      });
    },
    [allowMultiple]
  );

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      {items.map((item, idx) => (
        <AccordionItem
          key={idx}
          title={item.title}
          content={item.content}
          isOpen={openItems.has(idx)}
          onToggle={() => toggleItem(idx)}
        />
      ))}
    </div>
  );
};
