"use client"
import { FC } from "react";
import { Dialog, DialogTitle, DialogPanel } from "@headlessui/react";
import { useFavorites } from "@/domains/search/hooks";
import { Dog } from "@/domains/search/types";
import Image from "next/image";
import { Button } from "../ui/button";
import { Heart, XIcon } from "lucide-react";

interface SideDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen:boolean) => void;
  title: string;
  children?: any
}

export const SideDialog: FC<SideDialogProps> = ({ isOpen=false, setIsOpen, title, children}) => {
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Open Menu
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />
        
        <div className="fixed inset-y-0 right-0 flex max-w-sm w-full bg-white shadow-lg p-4">
          <DialogPanel className="w-full">
            <div className="flex items-center">
              <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
              <button
                onClick={() => setIsOpen(false)}
                className="absolute right-2 text-gray-500"
              >
                <XIcon className="hover:stroke-black"/>
              </button>
            </div>
            {children}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};