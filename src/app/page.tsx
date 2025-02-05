"use client";
import { redirect } from "next/navigation";
import { useRequireAuth } from "@/domains/auth/hooks";

export default function Home() {
  const { isChecking, isAuthenticated } = useRequireAuth();

  if(isChecking) return null;

  if(isAuthenticated){
    redirect('/search')
  }
}
