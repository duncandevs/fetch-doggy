import axios from "axios";

export default async function Search () {
    try {
        const request = await axios.get("https://frontend-take-home-service.fetch.com/dogs/breeds")
        console.log(request.status, request.statusText)   
    } catch (error) {
        console.log(error)
    }
    return <div>
        <h1>Welcome to the Search Page</h1>
    </div>
}