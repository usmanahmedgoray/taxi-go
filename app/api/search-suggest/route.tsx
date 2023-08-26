import { NextResponse } from "next/server"
const BaseURL = "https://api.mapbox.com/search/searchbox/v1/suggest"

export async function GET(request:any){
    const {searchParams} = new URL(request.url)
    const searchText  =  searchParams.get('q')
    const res = await fetch(`${BaseURL}?q=${searchText}?language=en&limit=3&session_token=550e8400-e29b-41d4-a716-446655440000&country=US&access_token=${process.env.MAPBOX_API_TOKEN}`,{
        headers:{
            "Content-type":"application/json"
        }
    })

    const searchResults = await res.json()
    return NextResponse.json({data:searchResults})    
}