"use client";
import { useState } from "react";
import axios from "axios";
import { redirect } from "next/navigation";

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
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}