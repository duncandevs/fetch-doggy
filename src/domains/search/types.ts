
type SortField = "breed" | "name" | "age";
type SortType = "asc" | "desc";
type Sort = `${SortField}:${SortType}`;
export type FetchDogIdsPayload = {
    breeds?: string[];
    zipCodes?: number[];
    ageMin?: number;
    ageMax?: number;
    size?: number;
    from?: number;
    sort?: Sort;
};

export interface Dog {
    id: string
    img: string
    name: string
    age: number
    zip_code: string
    breed: string
}