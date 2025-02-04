"use client";
import React from "react";
import { useDogSearch } from "@/domains/search/hooks";
import { Dog } from "@/domains/search/types";

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
    const [page, setPage] = React.useState(0);
    const { dogs } = useDogSearch({}, page);
    const incrementPage = () => {
        setPage(page + 1)
    }

    return <div>
        <h1>Welcome to the Search Page</h1>
        <p>Page ${page}</p>
        <button onClick={() => incrementPage()}>
            next page
        </button>
        <div className="flex flex-col space-y-8">
            <h1>{dogs?.length}</h1>
            {dogs?.map((dog: Dog, idx: number)=> <DogDetails dog={dog} key={`Dog-${idx}`}/>)}
        </div>
    </div>
}