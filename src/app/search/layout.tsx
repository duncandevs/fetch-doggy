"use client"
import { FavoritesSideDialog } from "@/components/common/favorites-dialog";
import { MatchDialog } from "@/components/common/match-dialog";
import { Button } from "@/components/ui/button";
import { useFavorites, useGetDogById } from "@/domains/search/hooks";
import Avatar from "boring-avatars";
import { Dog as DogIcon, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { DoggyApi } from "@/domains/search/api";
import { CenteredDialog } from "@/components/common/center-dialog";
import { Dog } from "@/domains/search/types";

interface LayoutProps {
    children: any
};

export default function Layout ({ children }: LayoutProps) {
    const { favorites, favoriteDogs } = useFavorites();
    const faveIds = favoriteDogs?.map((d)=>d?.id);
    const faveLength = Object.values(favorites)?.filter((i)=>!!i).length;
    const [isFavoritesDialogOpen, setIsFavoritesDialogOpen] = useState(false);
    const [isMatchDialogOpen, setIsMatchDialogOpen] = useState(false);
    const [matchedDog, setMatchedDog] = useState<Dog>();
    
    const handleMatch = async () => {
        try {
            const result: string = await DoggyApi.fetchDogMatch({ ids: faveIds });
            const match: Dog = favoriteDogs?.find((i) => i?.id === result.match);
            setIsFavoritesDialogOpen(false);
            if(match) setMatchedDog(match);   
        } catch (error) {
            console.log('match results: ', error)
        }
    };

    useEffect(()=>{
        if(matchedDog) setIsMatchDialogOpen(true)
    }, [matchedDog])

    return <div className="flex flex-col">
        <FavoritesSideDialog isOpen={isFavoritesDialogOpen} setIsOpen={setIsFavoritesDialogOpen} title="Favorites" handleMatch={handleMatch} />
        <MatchDialog isOpen={isMatchDialogOpen} setIsOpen={setIsMatchDialogOpen} dog={matchedDog}/>
        <div className="flex fixed items-center w-full h-16 bg-yellow-100 pr-12" style={{zIndex: 10}}>
            <div className="ml-4 flex items-center gap-4">
                <DogIcon height={64} width={48} />
                <p className="text-2xl font-semibold">Doggy</p>
            </div>
            <Avatar size={40} className="ml-auto mr-4" name="Duncan Maina"/>
            <div onClick={()=>setIsFavoritesDialogOpen(true)}>
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