"use client"
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/domains/search/hooks";
import Avatar from "boring-avatars";
import { Dog, Heart } from "lucide-react";

interface LayoutProps {
    children: any
};

export default function Layout ({ children }: LayoutProps) {
    const { favorites } = useFavorites();
    const faveLength = Object.values(favorites)?.filter((i)=>!!i).length

    return <div className="flex flex-col">
        <div className="flex fixed items-center w-full h-16 bg-yellow-100 pr-12" style={{zIndex: 10}}>
            <div className="ml-4 flex items-center gap-4">
                <Dog height={64} width={48} />
                <p className="text-2xl font-semibold">Doggy</p>
            </div>
            <Avatar size={40} className="ml-auto mr-4" name="Duncan Maina"/>
            <div>
                {!!faveLength && <div className="ml-8 mt-[-4] absolute w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                    <p className="text-[8px] text-white">{faveLength}</p>
                </div>}
                <Button size="icon" className="rounded-full h-[40px] w-[40px]">
                    <Heart />
                </Button>
            </div>
        </div>
        <div className="mt-16 h-screen">
            {children}
        </div>
    </div>
}