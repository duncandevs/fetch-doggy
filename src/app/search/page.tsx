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
import { SortFilters } from "@/components/common/sort-filter";


export default function SearchPage () {
    const {        
        page,
    } = useSearchPagination(0);
    const { filters } = useDogFilters();
    console.log("filters: ", filters)
    const { dogs } = useDogSearch(page);

    return <div className="flex h-full">
        <div>
            <div className="hidden md:flex bg-gray-50 w-full p-8 space-y-8">
                <div className="w-full h-full flex items-center gap-8">
                    <Button variant="outline">
                        <ListFilter />
                        <p>{filters?.breeds?.length}</p>
                    </Button>
                    <p className="text-gray-600 w-32">25 results</p>
                    <div className="w-full">
                        <SearchCommand />
                    </div>
                    <div className="w-64 h-16 flex items-center gap-2 w-fit">
                        <p className="mr-4 font-semibold text-gray-500">Sort</p>
                        <SortFilters />
                    </div>
                </div>
                <DogFilters />
            </div>
            <hr />
            <div className="flex w-screen">
                <div className="min-h-full w-[300px] p-8 hidden md:flex">
                    <SideMenu />
                </div>
                <div className="lg:w-[calc(100vw-300px)] m-auto">
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