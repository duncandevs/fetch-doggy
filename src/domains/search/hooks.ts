import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams, useRouter } from "next/navigation";
import { DoggyApi } from './api';
import { FetchDogIdsPayload, Dog, Sort } from './types';
import { DEFAULT_SEARCH_SIZE } from "@/domains/search/constants";

export const DoggyCache = {
    dogBreeds: ['dogBreeds'],
    getDogs: (page:number) => ["dogs", page],
    getDog: (id: string) => ['dog', id],
    getDogIds: (filters: FetchDogIdsPayload, page: number) => ["dogIds", filters, filters.sort, page],
    dogFilters: ["dogFilters"],
    favorites: ["favorites"],
};

export const useDogFilters = () => {
    const queryClient = useQueryClient();
    const { data: filters } = useQuery<FetchDogIdsPayload>({
      queryKey: DoggyCache.dogFilters,
      queryFn: () => ({
        sort: 'breed:asc'
      }), // Default empty filters,
      staleTime: Infinity,
    });
    const updateFilter = (key: keyof FetchDogIdsPayload, value: any) => {
      queryClient.setQueryData(DoggyCache.dogFilters, (prev: FetchDogIdsPayload = {}) => ({
        ...prev,
        [key]: value
      }));
    };
  
    const setBreedsFilter = (breeds: string[]) => updateFilter("breeds", breeds);
    const setZipCodesFilter = (zipCodes: number[]) => updateFilter("zipCodes", zipCodes);
    const setAgeMinFilter = (ageMin: number) => updateFilter("ageMin", ageMin);
    const setAgeMaxFilter = (ageMax: number) => updateFilter("ageMax", ageMax);
    const setSizeFilter = (size: number) => updateFilter("size", size);
    const setFromFilter = (from: number) => updateFilter("from", from);
    const setSortFilter = (sort: Sort) => updateFilter("sort", sort);
  
    const addDogBreedFilter = (breed: string) => {
      queryClient.setQueryData(DoggyCache.dogFilters, (prev: FetchDogIdsPayload = {}) => ({
        ...prev,
        breeds: prev.breeds ? [...new Set([...prev.breeds, breed])] : [breed]
      }));
    };
  
    const removeDogBreedFilter = (breed: string) => {
      queryClient.setQueryData(DoggyCache.dogFilters, (prev: FetchDogIdsPayload = {}) => ({
        ...prev,
        breeds: prev.breeds ? prev.breeds.filter((b) => b !== breed) : []
      }));
    };

    const addZipcodeFilter = (zipCode: string) => {
        queryClient.setQueryData(DoggyCache.dogFilters, (prev: FetchDogIdsPayload = {}) => ({
          ...prev,
          zipCodes: prev.zipCodes ? [...new Set([...prev.zipCodes, zipCode])] : [zipCode]
        }));
    };

    const removeZipcodeFilter = (zipCode: string) => {
        queryClient.setQueryData(DoggyCache.dogFilters, (prev: FetchDogIdsPayload = {}) => ({
          ...prev,
          zipCodes: prev.zipCodes ? prev.zipCodes.filter((b) => b !== zipCode) : []
        }));
    };

    useEffect(()=>{
      console.log(filters)
    }, [filters])
    
    return {
      filters: filters || {},
      setBreedsFilter,
      setZipCodesFilter,
      setAgeMinFilter,
      setAgeMaxFilter,
      setSizeFilter,
      setFromFilter,
      setSortFilter,
      addDogBreedFilter,
      removeDogBreedFilter,
      addZipcodeFilter,
      removeZipcodeFilter,
    };
};

export const useGetDogBreeds = () => {
    const { data:dogBreeds, ...props } = useQuery({
        queryKey: DoggyCache.dogBreeds,
        queryFn: DoggyApi.fetchDogBreeds,
    });
    return {
        dogBreeds,
        ...props
    }
};

export const useGetDogIds = (payload: FetchDogIdsPayload, page: number = 0) => {
    const fetchDogIds = async () => {
        return DoggyApi.fetchDogIds({ 
            ...payload, 
            from: page * DEFAULT_SEARCH_SIZE, 
            size: DEFAULT_SEARCH_SIZE 
        });
    };

    const { data, ...queryProps } = useQuery({
        queryKey: DoggyCache.getDogIds(payload, page),
        queryFn: fetchDogIds,
        enabled: !!payload,
        staleTime: 0,
    });

    return {
        dogIds: data?.resultIds || [],
        total: data?.total || 0, // Assume API returns total number of results
        ...queryProps,
    };
};


export const useGetDogs = (ids: string[], page:number = 0) => {
    const queryClient = useQueryClient();
    const { data: dogs, ...props } = useQuery({
        queryKey: DoggyCache.getDogs(page),
        queryFn: () => DoggyApi.fetchDogs({ ids }),
        enabled: ids?.length > 0,
        staleTime: 0,
    });

    useEffect(()=>{
        dogs?.forEach((dog: Dog) => queryClient.setQueryData(DoggyCache.getDog(dog.id), dog));
    }, [dogs]);

    return {
        dogs,
        ...props
    }
};

export const useDogSearch = (page: number) => {
    const { filters } = useDogFilters()
    const { dogIds } = useGetDogIds(filters, page);
    const { dogs } = useGetDogs(dogIds, page);
    return {
        dogs,
    };
};

export const useGetDogById = (id: string) => {
    const fetcher = async () => {
        const results = await DoggyApi.fetchDogs({ ids: [id] });
        return results?.[0]
    };
    const { data: dog, ...props } = useQuery({
        queryKey: DoggyCache.getDog(id),
        queryFn: fetcher,
        enabled: !!id
    });

    return {
        dog,
        ...props
    }
};

export const useSearchPagination = (initialPage: number = 0) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pageFromUrl = Number(searchParams.get("page")) || initialPage;
    const [page, setPage] = useState(pageFromUrl);
  
    const updatePage = (newPage: number) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", String(newPage));
      router.push(`?${params.toString()}`, { scroll: false }); // Keep scroll position
    };
  
    const previousPage = () => {
      if (page > 0) updatePage(page - 1);
    };
  
    const nextPage = () => {
      updatePage(page + 1);
    };

    useEffect(() => {
        setPage(pageFromUrl);
    }, [pageFromUrl]);
  
    return {
      page,
      nextPage,
      previousPage,
    };
};

// export const useFavorites = () => {
//   const queryClient = useQueryClient();
//   const { data: favorites } = useQuery({
//     queryKey: DoggyCache.favorites,
//     queryFn: ():Record<string, boolean> => ({}),
//     initialData: {},
//   });

//   const updateFavorite = (id:string, value: boolean) => {
//     queryClient.setQueryData(DoggyCache.favorites, (prev:Record<string, boolean> = {}) => ({
//       ...prev,
//       [id]: value,
//     }));
//   };

//   return {
//     favorites: favorites || {},
//     addFavorite: (id: string) => updateFavorite(id, true),
//     removeFavorite: (id: string) => updateFavorite(id, false),
//     toggleFavorite: (id: string) => updateFavorite(id, !favorites?.[id]),
//   };
// };

export const useFavorites = () => {
  const queryClient = useQueryClient();

  // Retrieve favorite dog IDs from React Query cache
  const { data: favorites } = useQuery({
    queryKey: DoggyCache.favorites,
    queryFn: (): Record<string, boolean> => ({}),
    initialData: {},
  });

  // Update favorite state in cache
  const updateFavorite = (id: string, value: boolean) => {
    queryClient.setQueryData(DoggyCache.favorites, (prev: Record<string, boolean> = {}) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Get all favorited dog IDs
  const favoriteDogIds = Object.keys(favorites || {}).filter((id) => favorites[id]);

  // Retrieve favorite dogs from React Query cache instead of fetching again
  const favoriteDogs = favoriteDogIds
    .map((id) => queryClient.getQueryData(DoggyCache.getDog(id))) // Get cached dog data
    .filter((dog) => dog !== undefined); // Filter out undefined results

  return {
    favorites: favorites || {},
    favoriteDogs, // Returns cached dog data instead of refetching
    addFavorite: (id: string) => updateFavorite(id, true),
    removeFavorite: (id: string) => updateFavorite(id, false),
    toggleFavorite: (id: string) => updateFavorite(id, !favorites?.[id]),
  };
};
