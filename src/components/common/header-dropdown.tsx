import { DoorOpen, Info, LogOut} from "lucide-react";
import { EllipsisVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import React from "react";

interface HeaderDropdown {
    children: any
}
export const HeaderDropdown: React.FC<HeaderDropdown> = ({ children }) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white m-4">
            <DropdownMenuLabel>Project</DropdownMenuLabel>
            <DropdownMenuGroup>
                <Link href="https://github.com/duncandevs/story-writer-ai" target="_blank" passHref>
                    <DropdownMenuItem>
                        <Info />
                        <span>About</span>
                    </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <Link href="https://github.com/duncandevs/story-writer-ai" target="_blank" passHref>
                    <DropdownMenuItem>
                        <LogOut />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </Link>
            </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
);