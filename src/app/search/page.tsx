"use client";
import { useDogBreeds } from "@/domains/search/hooks";

export default function SearchPage () {
    const { dogBreeds } = useDogBreeds();
    if(dogBreeds) console.log('dogBreeds: ', dogBreeds)
    return <div>
        <h1>Welcome to the Search Page</h1>
    </div>
}