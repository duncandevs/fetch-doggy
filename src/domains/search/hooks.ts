import { useQuery, useQueryClient } from '@tanstack/react-query';
import { DoggyApi } from './api';
import { FetchDogIdsPayload, Dog } from './types';
import { useEffect } from 'react';

export const DoggyCache = {
    dogBreeds: ['dogBreeds'],
    dogs: ["dogs"],
    getDog: (id: string) => ['dog', id],
    getDogIds: (filters: FetchDogIdsPayload) => ["dogIds", filters],
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

export const useGetDogIds = (payload: FetchDogIdsPayload) => {
    const { data, ...props } = useQuery({
        queryKey: DoggyCache.getDogIds(payload || {}),
        queryFn: () => DoggyApi.fetchDogIds(payload),
        enabled: !!payload
    });

    return {
        dogIds: data?.resultIds,
        ...props
    }
};

export const useGetDogs = (ids: string[]) => {
    const queryClient = useQueryClient();
    const { data: dogs, ...props } = useQuery({
        queryKey: DoggyCache.dogs,
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

export const useDogSearch = (payload: FetchDogIdsPayload) => {
    const { dogIds } = useGetDogIds(payload);
    const { dogs } = useGetDogs(dogIds);
    return {
        dogs
    }
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
}   