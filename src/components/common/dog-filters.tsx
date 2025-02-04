import { useDogFilters } from "@/domains/search/hooks";
import { XIcon } from "lucide-react";

const Pill = ({ title, deleteHandler }:{title:string, deleteHandler?: (title:string) => void}) => (
    <div className="p-2 pl-4 pr-4 bg-gray-200 rounded-[20px] flex items-center gap-2">
        <p className="font-[600]">{title}</p>
        {deleteHandler && <XIcon size={20} onClick={() => deleteHandler(title)} className="stroke-gray-500 hover:stroke-black"/>}
    </div>
);

export const DogFilters = () => {
    const { filters, removeDogBreedFilter } = useDogFilters();

    return <ul className="flex flex-wrap gap-4">
        {filters?.breeds?.map((filter)=>(
            <li key={filter}>
                <Pill title={filter} deleteHandler={removeDogBreedFilter}/>
            </li>
        ))}
    </ul>
}