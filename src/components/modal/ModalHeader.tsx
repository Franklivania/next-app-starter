import { Icon } from "@iconify/react";
import { Fragment } from "react";

interface ModalHeaderProps {
  title: string;
  desc?: string;
  isSideModal?: boolean;
  closeModal: () => void;
}

export default function ModalHeader({
  title,
  desc,
  isSideModal = false,
  closeModal,
}: ModalHeaderProps) {
  return (
    <Fragment>
      {isSideModal ? (
        <div className="w-full py-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h2>
            {desc && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {desc}
              </p>
            )}
          </div>

          <button
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer rounded-md flex items-center justify-center transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={closeModal}
            aria-label="Close modal"
          >
            <Icon icon="mdi:close" width={20} />
          </button>
        </div>
      ) : (
        <header className="flex items-start justify-between">
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h3>
            {desc && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 max-w-md">
                {desc}
              </p>
            )}
          </div>

          <button
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer rounded-md flex items-center justify-center transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={closeModal}
            aria-label="Close modal"
          >
            <Icon icon="akar-icons:circle-x-fill" width={20} />
          </button>
        </header>
      )}
    </Fragment>
  );
}
