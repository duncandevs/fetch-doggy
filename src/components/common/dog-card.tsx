import { Dog } from "@/domains/search/types"
import { Heart, MapPin } from "lucide-react"
import Image from "next/image"
import React, { useEffect } from "react"
import { Button } from "../ui/button"
import { useFavorites } from "@/domains/search/hooks"
import { cn } from "@/lib/utils"

interface DogCardProps {
    dog: Dog
}

export const DogCard: React.FC<DogCardProps> = ({ dog }) => {
    const { favorites, toggleFavorite } = useFavorites();
    useEffect(()=>{
        console.log('Favorites: ', favorites)
    }, [favorites]);

    const handleFavorite = () => toggleFavorite(dog?.id);
    const isFavorited = favorites[dog?.id]

    return <div className="group w-[280px] h-[392px] w-60 rounded-md border-solid border"> 
        <Button className={cn(
                "absolute m-2",
                "hidden group-hover:flex",
                isFavorited && "flex bg-pink-400"
            )} size="icon" onClick={handleFavorite}>
            <Heart  />
        </Button>
        <Image 
            src={dog.img} 
            alt={dog.name} 
            placeholder="blur" 
            blurDataURL={dog.img} 
            width={280} 
            height={300} 
            className="w-fill h-[300px] rounded-md"
        />
        <div className="p-4">
            <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">{dog.name}</p>
                <p>{dog.breed}</p>
            </div>
            <div className="flex items-center justify-between">
                <p className="font-semibold">Age: {dog.age}</p>
                <div className="flex items-center">
                    <MapPin height={18} className="stroke-blue-500"/>
                    <p className="text-sm">{dog.zip_code}</p> 
                </div>
            </div>
        </div>
    </div>
}