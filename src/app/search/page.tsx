"use client";
import React from "react";
import { useDogFilters, useDogSearch, useSearchPagination } from "@/domains/search/hooks";
import { Dog } from "@/domains/search/types";
import "./styles.css";
import { ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchCommand } from "@/components/common/search-command";
import { DogFilters } from "@/components/common/dog-filters";
import { DogCard } from "@/components/common/dog-card";
import { SideMenu } from "@/components/common/sidemenu";
import { SearchPagination } from "@/components/common/search-pagination";


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
    } = useSearchPagination(0);
    const { filters } = useDogFilters();
    const { dogs } = useDogSearch(page);

    return <div className="flex h-full">
        <div>
            <div className="flex gap-4">
                <button onClick={() => previousPage()}>
                    prev page
                </button>
                <button onClick={() => nextPage()}>
                    next page
                </button>
            </div>
            <div className="bg-gray-100 w-full p-8 space-y-8">
                <div className="w-full h-full bg-green-200 flex items-center gap-8">
                    <Button variant="outline">
                        <ListFilter />
                        <p>{filters?.breeds?.length}</p>
                    </Button>
                    <p className="text-gray-600 w-32">25 results</p>
                    <div className="w-full">
                        <SearchCommand />
                    </div>
                    <div className="w-64 h-16 bg-gray-400"></div>
                </div>
                <DogFilters />
            </div>
            <hr />
            <div className="flex w-screen">
                <div className="min-h-full w-[300px] p-8">
                    <SideMenu />
                </div>
                <div className="w-[calc(100vw-300px)] m-auto">
                    <div className="grid gap-4 p-4 auto-grid overflow-y-auto">
                        {dogs?.map((dog: Dog)=><DogCard dog={dog} key={dog.id}/>)}
                    </div>
                </div>
            </div>
            <div className="pb-8">
                <div className="ml-auto mr-32  w-64">
                    <SearchPagination />
                </div>
            </div>
        </div>
    </div>
}