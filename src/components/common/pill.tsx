import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";

interface PillProps {
    value:string, 
    deleteHandler?: (value: string) => void,
    className?: string;
};

export const Pill = ({ value, deleteHandler, className }: PillProps) => (
    <div className={
        cn("p-2 pl-4 pr-4 bg-gray-200 rounded-[20px] flex items-center gap-2", className)
    }>
        <p className="font-[600]">{value}</p>
        {deleteHandler && <XIcon size={20} onClick={() => deleteHandler(value)} className="stroke-gray-500 hover:stroke-black"/>}
    </div>
);