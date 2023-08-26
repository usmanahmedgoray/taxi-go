import React, { useEffect, useState,useContext } from 'react'
import { SourceCoordinatesContext } from '@/Context/SourceCoordinatesContext'
import { DestinyCoordinatesContext } from '@/Context/DestinyCoordinatesContext'

const MAPBOX_BASE_RETRIEVE_URL = "https://api.mapbox.com/search/searchbox/v1/retrieve/"
const session_token = "550e8400-e29b-41d4-a716-446655440000"

const AutoCompleteBooking = () => {
  // setup the Context API
  const {sourceCoordinate,setSourceCoordinates} = useContext(SourceCoordinatesContext)
  const {destinyCoordinates,setDestinyCoordinates} = useContext(DestinyCoordinatesContext)
  // Source
  const [source, setSource] = useState<any>("")
  const [sourceChange, setSourceChange] = useState<boolean>(false)
  const [addressList, setAddressList] = useState<any>([])
  
  // Destination
  const [destinyChange, setDestinyChange] = useState<boolean>(false)
  const [destiney, setDestiney] = useState<any>("")

  // handle and get the suggested AddressList
  const getAddressList = async () => {
    if (sourceChange) {

      const response = await fetch(`api/search-suggest?q=${source}`, {
        headers: {
          "Content-type": "application/json"
        }
      })
      const result = await response.json();
      console.log(result.data.suggestions)
      if (!source) {
        setAddressList([])
      }
      else {
        return setAddressList(result.data)
      }
      console.log(addressList);
    }
    else if (destinyChange) {
      const response = await fetch(`api/search-suggest?q=${destiney}`, {
        headers: {
          "Content-type": "application/json"
        }
      })
      const result = await response.json();
      console.log(result.data.suggestions)
      if (!destiney) {
        setAddressList([])
      }
      else {
        return setAddressList(result.data)
      }
      console.log(addressList);
    }

  }

  useEffect(() => {
    const delayDebounceTimeset = setTimeout(() => {
      getAddressList()
    }, 1000)

    return () => {
      clearInterval(delayDebounceTimeset)
    }
  }, [source, destiney])

  // Handle the source Files
  const handleSource = async (item: any) => {
    setSource(item.full_address);
    setAddressList([]);
    setSourceChange(false)

    // Retrieve the Source Coordinates
    const response = await fetch(`${MAPBOX_BASE_RETRIEVE_URL}${item.mapbox_id}?session_token=${session_token}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}`)

    const Result = await response.json()
    setSourceCoordinates({
      lnt: Result.features[0].geometry.coordinates[0],
      lat: Result.features[0].geometry.coordinates[1]
    })
  }
  // Handle the Destination
  const handleDestination = async (item: any) => {
    setDestiney(item.full_address);
    setAddressList([]);
    setDestinyChange(false)

    // Retrieve the Source Coordinates
    const response = await fetch(`${MAPBOX_BASE_RETRIEVE_URL}${item.mapbox_id}?session_token=${session_token}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}`)

    const Result = await response.json()
    setDestinyCoordinates({
      lnt: Result.features[0].geometry.coordinates[0],
      lat: Result.features[0].geometry.coordinates[1]
    })
    
  }
  // console.log(destinyCoordinates);
  
  return (
    <div>
      <div className="from my-2 relative">
        <label htmlFor="wherefrom" className='text-gray-500'>Where From</label>
        <input type="text" name="wherefrom" id="wherefrom" className='w-full border rounded-sm my-2 focus:border-yellow-300 outline-none p-2' onChange={(e) => { setSource(e.target.value); setSourceChange(true) }} value={source} />
        <div className={`${addressList?.suggestions ? "border" : ""} shadow-md rounded-lg`}>
          {addressList?.suggestions && sourceChange &&
            addressList.suggestions.map((item: any, index: number) => {
              return <h2 key={index} className=' my-2 p-2 cursor-pointer' onClick={() => { handleSource(item) }}>{item.full_address ? item.full_address : item.place_formatted}</h2>
            })
          }
        </div>

      </div>

      <div className="my-2 relative">
        <label htmlFor="whereto" className='text-gray-500'>Where To</label>
        <input type="text" name="whereto" id="whereto" className='w-full border rounded-sm my-2 focus:border-yellow-300 outline-none p-2' onChange={(e) => { setDestiney(e.target.value); setDestinyChange(true) }} value={destiney} />
        <div className={`${addressList?.suggestions ? "border" : ""} shadow-md rounded-lg`}>
          {addressList?.suggestions && destinyChange &&
            addressList.suggestions.map((item: any, index: number) => {
              return <h2 key={index} className='my-2 p-2 px-5 cursor-pointer' onClick={() => { handleDestination(item) }}>{item.full_address ? item.full_address : item.place_formatted}</h2>
            })
          }
        </div>
      </div>
    </div>
  )
}

export default AutoCompleteBooking