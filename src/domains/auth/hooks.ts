import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { getUserSession } from "./utils";
import { Credentials } from "./types";

export const useUserSession = () => {
    const [userSession, setUserSession] = useState<Credentials>()
    const session = getUserSession();
    
    useEffect(()=>{
        if(session) setUserSession(session)
    }, [session]);

    return { session: userSession }
};
  

export function useRequireAuth() {
    const [isChecking, setIsChecking] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const session = getUserSession();

        if (!session) {
            router.replace("/login"); // Redirect to login
        } else {
            setIsAuthenticated(true);
        }
        setIsChecking(false);
    }, [router]);

    return { isChecking, isAuthenticated };
};


