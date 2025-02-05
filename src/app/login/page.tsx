"use client";
import { useState } from "react";
import axios from "axios";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dog, Mail, User } from "lucide-react";
import { Label } from "@/components/ui/label";

const loginScreenImg = "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?q=80&w=3388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

export default function LoginPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const credentials = { name, email };
        try {
            const res = await axios.post('https://frontend-take-home-service.fetch.com/auth/login', credentials, {
                withCredentials: true
            })

            if(res.status !== 200){
                throw Error(`Failed to login: ${res.status}, ${res.statusText}`)
            }
            redirect('/search')
        } catch (error) {
            throw(error)
        }
    };

    return (
        <div className="flex">
            <Image src={loginScreenImg} width={500} height={900} objectFit="auto" alt="login" className="h-screen w-auto"/>
            <div className="flex flex-col w-full">
                <div className="p-8 flex gap-4 items-center h-16">
                    <Dog height={64} width={48} />
                    <p className="text-2xl font-semibold">Doggy</p>
                </div>
                <div className="flex h-full w-full items-center justify-center">
                    <div className="bg-yellow-100 w-[450px] h-[600px] rounded-lg p-12">
                        <div className="flex flex-col border-b border-gray-700 gap-4 p-1 pt-4 pb-4 mt-8">
                            <p className="text-2xl font-semibold">Sign in to Doggy</p>
                            <p className="text-gray-700">enter your email and name</p>
                        </div>
                        <form onSubmit={handleSubmit} className="flex flex-col mt-8 gap-8">
                            <div className="space-y-1">
                                <Label className="flex items-center gap-2"><User width={16}/> Full Name</Label>
                                <Input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required  className="bg-white"/>
                            </div>
                            <div className="space-y-1">
                                <Label className="flex items-center gap-2"><Mail width={16}/> Email</Label>
                                <Input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-white" />
                            </div>
                            <Button type="submit" className="mt-8" size="lg">Login</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}