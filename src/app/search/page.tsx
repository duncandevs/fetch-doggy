"use client";
import { useDogSearch, useGetDogById } from "@/domains/search/hooks";
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
    const { dogs } = useDogSearch({
        sort: "breed:asc",
        from: 25,
    })


    return <div>
        <h1>Welcome to the Search Page</h1>
        <div>
            {dogs?.map((dog: Dog, idx: number)=> <DogDetails dog={dog} key={`Dog-${idx}`}/>)}
        </div>
    </div>
}