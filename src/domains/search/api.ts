import axios from "axios";
import { FetchDogIdsPayload } from "./types";

const doggyClient = axios.create({
    baseURL: 'https://frontend-take-home-service.fetch.com',
    responseType: 'json',
    withCredentials: true
});

const fetchDogBreeds = async () => {
    try {
        const res = await doggyClient.get('/dogs/breeds');
        return res.data;
    } catch (error) {
        throw(error)
    }
};

const fetchDogIds = async (payload?: FetchDogIdsPayload) => {
    try {
        const res = await doggyClient.get('/dogs/search', {
            params: {...payload}
        });
        return res.data;
    } catch (error) {
        throw(error);
    }
};


const fetchDogs = async ({ ids }: {ids: string[]}) => {
    try {
        const res = await doggyClient.post('/dogs', ids);
        return res.data;
    } catch (error) {
        throw(error)
    }
};

const fetchDogMatch = async ({ ids }: {ids: string[]}) => {
    try {
        const res = await doggyClient.post('/dogs/match', ids);
        return res.data;
    } catch (error) {
        throw(error)
    }
};


export const DoggyApi = {
    fetchDogBreeds,
    fetchDogIds,
    fetchDogs,
    fetchDogMatch
}
