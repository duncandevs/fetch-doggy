"use client";
import React from "react";
import { useDogSearch, useSearchPageNumber } from "@/domains/search/hooks";
import { Dog } from "@/domains/search/types";
import "./styles.css";

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
            <div className="min-h-full h-screen w-[250px] bg-red-100">
                <p>Testing</p>
            </div>
        </div> */}
        <div>
            <div className="h-32 bg-gray-100 fixed w-full">
                <p>Search Bar</p>
            </div>
            <div className="flex pt-32">
                <div className="min-h-full h-screen w-[250px] bg-red-100 fixed">
                    <p>Testing</p>
                </div>
                <div className="w-[calc(100vw-250px)] h-[calc(100vh-200px)] ml-[250px]">
                    <div className="grid gap-4 p-4 auto-grid overflow-y-auto">
                        {Array.from({ length: 40 }).map((i, idx)=><div className="w-[280px] h-[392px] w-60 bg-green-100" key={idx}></div>)}
                    </div>
                </div>
            </div>
        </div>
    </div>
}