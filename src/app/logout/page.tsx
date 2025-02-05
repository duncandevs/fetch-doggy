"use client"
import { logout } from "@/domains/auth/utils";

export default function Logout (){
    logout();
    return null
}