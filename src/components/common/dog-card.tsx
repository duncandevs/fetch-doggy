import { Dog } from "@/domains/search/types"
import Image from "next/image"
import React from "react"

interface DogCardProps {
    dog: Dog
}

export const DogCard: React.FC<DogCardProps> = ({ dog }) => {
    return <div className="w-[280px] h-[392px] w-60 rounded-md border-solid border"> 
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
            <p className="text-lg font-semibold">{dog.name}</p>
        </div>
    </div>
}