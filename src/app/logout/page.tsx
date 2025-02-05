"use client"
import { clearPersistedCache, logout } from "@/domains/auth/utils";
import { useQueryClient } from '@tanstack/react-query';

export default function Logout (){
    // Clear the cache and logout user
    const queryClient = useQueryClient();
    queryClient.clear();
    clearPersistedCache();
    logout();

    return null
}