import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { useDogFilters, useGetDogBreeds } from "@/domains/search/hooks";

export const SearchCommand = () => {
  const { dogBreeds } = useGetDogBreeds();
  const [isCommandBoxShown, setIsCommandBoxShown] = useState(false);
  const [filteredList, setFilteredList] = useState(dogBreeds);
  const [searchInput, setSearchInput] = useState("");
  const { addDogBreedFilter } = useDogFilters();
  const searchRef = useRef<HTMLDivElement>(null);

  const onInputClick = () => setIsCommandBoxShown(true);

  useEffect(() => {
    if (!searchInput.trim()) {
      setFilteredList(dogBreeds); // Reset to full list if input is empty
    } else {
      setFilteredList(
        dogBreeds.filter((item: string) =>
          item.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    }
  }, [searchInput, dogBreeds]);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsCommandBoxShown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full relative" ref={searchRef}>
      <div className="min-h-16 h-full bg-purple-100 flex items-center">
        <Input
          onClick={onInputClick}
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          placeholder="Search breeds..."
        />
      </div>
      {isCommandBoxShown && (
        <div
          className="bg-white w-full max-h-64 overflow-y-auto absolute w-[1024px] mt-[-12px] pb-4"
          style={{ zIndex: 2 }}
        >
          <div className="p-2">
            <p className="text-sm">Breeds</p>
          </div>
          <hr />
          <ul className="p-4 flex flex-col gap-4">
            {filteredList?.map((breed: string) => (
              <li key={breed} className="hover:bg-gray-200 p-2 rounded-md" onClick={() => addDogBreedFilter(breed)}>
                {breed}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
