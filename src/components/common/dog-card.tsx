import { Dog } from "@/domains/search/types"
import { MapPin } from "lucide-react"
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