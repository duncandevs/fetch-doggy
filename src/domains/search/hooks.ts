import { useQuery, useQueryClient } from '@tanstack/react-query';
import { DoggyApi } from './api';
import { FetchDogIdsPayload, Dog, Sort } from './types';
import { useEffect, useState } from 'react';
import { DEFAULT_SEARCH_SIZE } from "@/domains/search/constants";

export const DoggyCache = {
    dogBreeds: ['dogBreeds'],
    getDogs: (page:number) => ["dogs", page],
    getDog: (id: string) => ['dog', id],
    getDogIds: (filters: FetchDogIdsPayload, page: number) => ["dogIds", filters, page],
    dogFilters: ["dogFilters"]
}


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
    });

    useEffect(()=>{
        dogs?.forEach((dog: Dog) => queryClient.setQueryData(DoggyCache.getDog(dog.id), dog));
    }, [dogs]);

    return {
        dogs,
        ...props
    }
};

export const useDogSearch = (payload: FetchDogIdsPayload, page: number) => {
    const { dogIds } = useGetDogIds(payload, page);
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

export const useSearchPageNumber = (initialPage: number = 0) => {
    const [page, setPage] = useState(initialPage);
    const previousPage = () => {
        if(page > 0 ) setPage(page - 1)
    };
    const nextPage = () => {
        setPage(page + 1)
    };

    return {
        page,
        nextPage,
        previousPage
    }
};

export const useDogFilters = () => {
  const queryClient = useQueryClient();
  const { data: filters } = useQuery<FetchDogIdsPayload>({
    queryKey: DoggyCache.dogFilters,
    queryFn: () => ({}) // Default empty filters
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
    removeDogBreedFilter
  };
};