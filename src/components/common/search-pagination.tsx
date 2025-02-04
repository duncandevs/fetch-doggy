import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchPagination } from "@/domains/search/hooks";
import { cn } from "@/lib/utils";

  
export const SearchPagination = () => {
    const { previousPage, nextPage, page } = useSearchPagination();
    const pagesArray = Array.from({ length: 5 }, (_, i) => page + i);

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem className="cursor-pointer">
                    <PaginationPrevious onClick={previousPage} />
                </PaginationItem>
                {/* show the page short cut if number of pages is greater than 5 */}
                {page > 5 && <>
                    <PaginationItem>
                        <PaginationLink href={`?page=1`}>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                </>}
                {pagesArray?.map((p)=>(
                    <PaginationItem key={p}>
                        <PaginationLink href={`?page=${p}`} className={
                            cn(p === page && "bg-green-100")
                        }>{p}</PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem className="cursor-pointer">
                    <PaginationNext onClick={nextPage}  />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}