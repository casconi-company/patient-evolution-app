"use client";

import { PropsWithChildren } from "react";
import { Button } from "../Button";
import { CloseIcon } from "../icons";

interface ModalProps {
  title: string;
  onCloseModal?: () => void;
}

const Modal = ({
  onCloseModal,
  title,
  children,
}: PropsWithChildren<ModalProps>) => {
  return (
    <div
      id="default-modal"
      tabIndex={-1}
      aria-hidden="false"
      className="overflow-y-auto overflow-x-hidden fixed top-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-zinc-900 bg-opacity-90"
    >
      <div className="relative p-4 w-full max-w-200 max-h-full flex h-full justify-center items-center">
        <div className="relative bg-zinc-700 rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal"
              onClick={onCloseModal}
            >
              <CloseIcon />
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
