import { Github, LogOut} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import React from "react";

interface HeaderDropdown {
    children: any
    fullName: string
};
export const HeaderDropdown: React.FC<HeaderDropdown> = ({ children, fullName }) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white m-4">
            <DropdownMenuLabel>{fullName}</DropdownMenuLabel>
            <DropdownMenuGroup>
                <Link href="https://github.com/duncandevs/fetch-doggy" target="_blank" passHref>
                    <DropdownMenuItem>
                        <Github />
                        <span>Go to project</span>
                    </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <Link href="/logout" passHref>
                    <DropdownMenuItem>
                        <LogOut />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </Link>
            </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
);