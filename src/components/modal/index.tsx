"use client";

import { Fragment, useEffect, useState } from "react";
import Backdrop from "./Backdrop";
import ModalHeader from "./ModalHeader";
import { useClickOutside } from "@/hooks/useClickOutside";

export type ModalVariant = 'default' | 'side' | 'float';

interface ModalProps {
  children: React.ReactNode;
  show: boolean;
  title: string;
  desc?: string;
  variant?: ModalVariant;
  size?: 'small' | 'medium' | 'large';
  closeModal: () => void;
  className?: string;
}

export default function Modal({
  children,
  show,
  title,
  desc,
  variant = 'default',
  size = 'medium',
  closeModal,
  className = '',
}: ModalProps) {
  const [delayShow, setDelayShow] = useState(false);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setDelayShow(true), 100);
      return () => clearTimeout(timer);
    } else {
      setDelayShow(false);
    }
  }, [show]);

  const ref = useClickOutside(closeModal, show);

  // Size classes
  const sizeClasses = {
    small: {
      default: 'w-[90%] max-w-md',
      side: 'w-[35%]',
      float: 'max-w-sm'
    },
    medium: {
      default: 'w-[95%] max-w-2xl',
      side: 'w-[50%]',
      float: 'max-w-md'
    },
    large: {
      default: 'w-[95%] max-w-5xl',
      side: 'w-[65%]',
      float: 'max-w-lg'
    }
  };

  // Variant-specific components
  if (variant === 'side') {
    return (
      <Fragment>
        <Backdrop show={show} onClose={closeModal} />
        <div
          className={`h-screen bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-6 z-[999] py-4 fixed top-0 right-0 flex flex-col items-start transition-all duration-300 ease-out shadow-2xl
            ${delayShow ? "translate-x-0" : "translate-x-full"}
            ${sizeClasses[size].side}
            ${className}
          `}
          ref={ref}
        >
          <ModalHeader
            title={title}
            desc={desc}
            closeModal={closeModal}
            isSideModal={true}
          />
          <div className="w-full flex-1 overflow-y-auto py-4 modal-scrollbar">
            {children}
          </div>
        </div>
      </Fragment>
    );
  }

  if (variant === 'float') {
    return (
      <Fragment>
        <Backdrop show={show} onClose={closeModal} />
        <div
          className={`w-full ${sizeClasses[size].float} h-fit max-h-[90vh] overflow-hidden rounded-2xl z-[999] py-4 px-4 fixed top-6 right-6 flex flex-col bg-white dark:bg-gray-800 dark:text-gray-100 shadow-2xl
            transition-all duration-300 ease-out
            ${delayShow ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
            ${className}
          `}
          ref={ref}
        >
          <ModalHeader 
            title={title} 
            desc={desc} 
            closeModal={closeModal} 
          />
          <div className="w-full flex-1 overflow-y-auto py-2 modal-scrollbar">
            {children}
          </div>
        </div>
      </Fragment>
    );
  }

  // Default modal
  return (
    <Fragment>
      <Backdrop show={show} onClose={closeModal} />
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[999] transition-all duration-300 ease-out
          ${delayShow ? "opacity-100 scale-100" : "opacity-0 scale-95"}
          ${sizeClasses[size].default}
          ${className}
        `}
        ref={ref}
      >
        <div className="w-full h-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-6 py-6 flex flex-col gap-4 rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden">
          <ModalHeader 
            title={title} 
            desc={desc} 
            closeModal={closeModal} 
          />
          <div className="w-full flex-1 overflow-y-auto modal-scrollbar">
            {children}
          </div>
        </div>
      </div>
    </Fragment>
  );
}


/**
 * How to use the Modal component:
 * 
 * Example:
 * 
 * import Modal from './modal';
 * import { useState } from 'react';
 * 
 * function Example() {
 *   const [open, setOpen] = useState(false);
 * 
 *   return (
 *     <>
 *       <button onClick={() => setOpen(true)}>
 *         Open Modal
 *       </button>
 *       <Modal
 *         show={open}
 *         closeModal={() => setOpen(false)}
 *         title="Modal Title"
 *         desc="Optional description for your modal."
 *       >
 *         <div>
 *           Your modal content goes here.
 *         </div>
 *       </Modal>
 *     </>
 *   );
 * }
 * 
 * Props:
 * - show: boolean (controls modal visibility)
 * - closeModal: function (called to close the modal)
 * - title: string (modal header title)
 * - desc?: string (optional description)
 * - size?: 'sm' | 'md' | 'lg' | 'xl' (optional, default 'md')
 * - className?: string (optional, extra classes for modal)
 * - children: React.ReactNode (modal content)
 */
