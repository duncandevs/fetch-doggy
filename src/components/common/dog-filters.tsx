import { useDogFilters } from "@/domains/search/hooks";
import { Pill } from "./pill";

export const DogFilters = () => {
    const { filters, removeDogBreedFilter } = useDogFilters();

    return <ul className="flex flex-wrap gap-4">
        {filters?.breeds?.map((filter)=>(
            <li key={filter}>
                <Pill value={filter} deleteHandler={removeDogBreedFilter} />
            </li>
        ))}
    </ul>
}