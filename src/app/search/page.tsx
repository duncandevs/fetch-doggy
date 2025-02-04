"use client";
import React from "react";
import { useDogFilters, useDogSearch, useSearchPageNumber } from "@/domains/search/hooks";
import { Dog } from "@/domains/search/types";
import "./styles.css";
import { ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchCommand } from "@/components/common/search-command";
import { DogFilters } from "@/components/common/dog-filters";


const DogDetails = ({ dog }:{dog: Dog}) => {
    if (!dog) return <p>Loading...</p>;

    return (
        <div>
            <h2>{dog.name}</h2>
            <p>Breed: {dog.breed}</p>
            <p>Age: {dog.age}</p>
        </div>
    );
};


export default function SearchPage () {
    const {        
        page,
        nextPage,
        previousPage
    } = useSearchPageNumber(0);

    const { dogs } = useDogSearch({}, page);
    const { filters } = useDogFilters();

    return <div className="flex h-full">
        {/* <h1>Welcome to the Search Page</h1>
        <p>Page ${page}</p>
        <div className="flex gap-4">
            <button onClick={() => previousPage()}>
                prev page
            </button>
            <button onClick={() => nextPage()}>
                next page
            </button>
        </div>
        <div className="flex flex-col space-y-8">
            <h1>{dogs?.length}</h1>
            {dogs?.map((dog: Dog, idx: number)=> <DogDetails dog={dog} key={`Dog-${idx}`}/>)}
        </div> */}
        {/* <div>
            <div className="min-h-full h-screen w-[300px] bg-red-100">
                <p>Testing</p>
            </div>
        </div> */}
        <div>
            <div className="bg-gray-100 w-full p-8 space-y-8">
                <div className="w-full h-full bg-green-200 flex items-center gap-8">
                    <Button variant="outline">
                        <ListFilter />
                        <p>15</p>
                    </Button>
                    <p className="text-gray-600 w-32">15 results</p>
                    <div className="w-full">
                        <SearchCommand />
                    </div>
                    <div className="w-64 h-16 bg-gray-400"></div>
                </div>
                <DogFilters />
            </div>
            <div className="flex w-screen">
                <div className="min-h-full h-screen w-[300px] bg-red-100 p-8">
                    <p>Testing</p>
                </div>
                <div className="w-[calc(100vw-300px)] m-auto">
                    <div className="grid gap-4 p-4 auto-grid overflow-y-auto">
                        {Array.from({ length: 40 }).map((i, idx)=><div className="w-[280px] h-[392px] w-60 bg-green-100" key={idx}></div>)}
                    </div>
                </div>
            </div>
        </div>
    </div>
}