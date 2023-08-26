"use client";
import { useEffect, useState } from 'react'
import Booking from './Component/Booking/Booking'
import MapBoxmap from './Component/Maps/MapBoxmap'
import { UseLocationContext } from '@/Context/UseLocationContext'
import { SourceCoordinatesContext } from '@/Context/SourceCoordinatesContext';
import { DestinyCoordinatesContext } from '@/Context/DestinyCoordinatesContext';

export default function Home() {
  // Declare the use State Hooks
  const [userLocation, setUserLocation] = useState<any>({})
  const [sourceCoordinates, setSourceCoordinates] = useState<any>([])
  const [destinyCoordinates, setDestinyCoordinates] = useState<any>([])

  // get user Location using navigator Web API
  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation({
        lat: pos.coords.latitude,
        lnt: pos.coords.longitude
      })
    })

  }

  useEffect(() => {
    getUserLocation()
  }, [])

  return (
    <>
      <UseLocationContext.Provider value={{ userLocation, setUserLocation }}>
        <SourceCoordinatesContext.Provider value={{sourceCoordinates,setSourceCoordinates}}>
          <DestinyCoordinatesContext.Provider value={{destinyCoordinates,setDestinyCoordinates}}>
            <div className='grid grid-cols-1 md:grid-cols-3'>
              <Booking />
              <MapBoxmap className="cols-span-2 mt-7" />
            </div>
          </DestinyCoordinatesContext.Provider>
        </SourceCoordinatesContext.Provider>
      </UseLocationContext.Provider>
    </>
  )
}
