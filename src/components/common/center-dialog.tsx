import { Dialog, DialogTitle, DialogPanel } from "@headlessui/react";
import React from "react";

export interface CenterDialogProps {
    isOpen: boolean;
    setIsOpen: (isOpen:boolean) => void;
    title: string;
    children?: any
}

export const CenteredDialog: React.FC<CenterDialogProps> = ({ isOpen, setIsOpen, title, children }) => {
    return (
      <Dialog open={isOpen} onClose={()=>setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black bg-opacity-50" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
            <DialogTitle as="h3" className="text-lg font-semibold text-gray-900">
              {title}
            </DialogTitle>
            <div className="mt-4">{children}</div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={()=>setIsOpen(false)}
                className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"
              >
                Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    );
};