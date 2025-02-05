"use client"
import { FC } from "react";
import { useFavorites } from "@/domains/search/hooks";
import { Dog } from "@/domains/search/types";
import Image from "next/image";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { SideDialog } from "./side-dialog";

type FavoritesSideDialogProps = SideDialogProps & {
    handleMatch: () =>void 
  }
  
  export const FavoritesSideDialog : FC<FavoritesSideDialogProps> = ({handleMatch, ...props}) => {
    const { favoriteDogs, removeFavorite } = useFavorites();
    return <SideDialog {...props}>
        <div className="overflow-y-scroll h-screen pb-64">
          <ul className="flex flex-col gap-4 mt-8">
            {favoriteDogs?.map((dog: Dog) => (
                <li key={dog?.id} className="flex hover:bg-gray-100 p-4 rounded-md justify-between">
                  <div className="flex items-center  space-x-4">
                    <Image src={dog.img} width={64} height={64} className="rounded-md w-[64px] h-[64px]" alt={dog.name}/>
                    <div>
                      <p className="font-semibold">{dog?.name}</p>
                      <p className="text-sm">{dog.age} yrs old</p>
                    </div>
                  </div>
                  <Heart className="ml-auto m-4 stroke-none fill-pink-500 hover:fill-pink-800" onClick={()=>removeFavorite(dog?.id)}/>
                </li>
              ))}
          </ul>
          <Button className="w-full mt-8 bg-pink-400 hover:bg-pink-600" onClick={handleMatch}>Click to find a Match</Button>
        </div>
    </SideDialog>
  }