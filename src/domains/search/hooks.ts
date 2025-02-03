import { useQuery } from '@tanstack/react-query';
import { DoggyApi } from './api';
import { FetchDogIdsPayload } from './types';

export const DoggyCache = {
    dogBreeds: ['dogBreeds'],
    getDogIds: (filters: FetchDogIdsPayload) => ["dogs", filters],
    getDog: (id: string) => ['dog', id],
}


export const useDogBreeds = () => {
    const { data:dogBreeds, ...props } = useQuery({
        queryKey: DoggyCache.dogBreeds,
        queryFn: DoggyApi.fetchDogBreeds,
    });
    return {
        dogBreeds,
        ...props
    }
};

export const useDogs = (payload?: FetchDogIdsPayload) => {
    const fetcher = async () => DoggyApi.fetchDogIds(payload);
    const { data: dogs, ...props } = useQuery({
        queryKey: DoggyCache.getDogIds(payload || {}),
        queryFn: fetcher,
    });
    return {
        dogs,
        ...props
    }
};