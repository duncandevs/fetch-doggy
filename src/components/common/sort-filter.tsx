import { useDogFilters } from "@/domains/search/hooks";
import { SortField, Sort } from "@/domains/search/types";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

const sortFields: SortField[] = ["age", "breed", "name"];

const SortFilter = ({field, sort, setSortFilter }:{field: SortField, sort?: Sort, setSortFilter: (sort: Sort)=>void}) => {
    const filterAsc: Sort = `${field}:asc`;
    const filterDesc: Sort = `${field}:desc`;

    const handleSortFilter = () => {
        if(sort === filterAsc){
            setSortFilter(filterDesc)
        } else if(sort === filterDesc){
            setSortFilter(filterAsc)
        } else {
            setSortFilter(filterAsc)
        }
    }

    return (
        <div 
            onClick={handleSortFilter}
            className={
                cn(
                    "h-8 min-w-24 p-2 flex items-center justify-between rounded-sm w-fit",
                    "hover:bg-gray-200"
                )}>
            <p>{field}</p>
            <div>
                {sort === filterAsc && <ArrowUp height={16} />}
                {sort === filterDesc && <ArrowDown height={16} />}
            </div>
        </div>
    )
};

export const SortFilters = () => {
    const { filters, setSortFilter } = useDogFilters();

    return <div className="flex gap-4">
                {sortFields?.map((field)=> <SortFilter field={field} sort={filters.sort} key={field} setSortFilter={setSortFilter} />)}
        </div>
}