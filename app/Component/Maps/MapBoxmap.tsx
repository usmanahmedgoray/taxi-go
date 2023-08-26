"use client"
import React, { useContext, useEffect, useRef } from 'react'
import Map from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { UseLocationContext } from '@/Context/UseLocationContext';
import Markers from './Markers';
import { SourceCoordinatesContext } from '@/Context/SourceCoordinatesContext';
import { DestinyCoordinatesContext } from '@/Context/DestinyCoordinatesContext';

const MapBoxmap = ({ className }: any) => {
  // handle Context API
  const { userLocation } = useContext(UseLocationContext)
  const { sourceCoordinates } = useContext(SourceCoordinatesContext)
  const { destinyCoordinates } = useContext(DestinyCoordinatesContext)

  // using useRef
  const refMarker = useRef<any>(null)
// Fly to for source Coordinates
  useEffect(() => {
    if (sourceCoordinates) {
      refMarker.current?.flyTo({
        center: [sourceCoordinates.lnt, sourceCoordinates.lat],
        duration: 2500
      })
    }
  }, [sourceCoordinates])
// Fly to for destiny Coordinates
  useEffect(() => {
    if (destinyCoordinates) {
      refMarker.current?.flyTo({
        center: [destinyCoordinates.lnt, destinyCoordinates.lat],
        duration: 2500
      })
    }
  }, [destinyCoordinates])

  return (
    <div className={`${className}`}>
      <h2 className='font-semibold text-xl my-4'>Map</h2>
      <Map
        ref={refMarker}
        mapboxAccessToken={`${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}`}
        initialViewState={{
          longitude: userLocation?.lnt,
          latitude: userLocation?.lat,
          zoom: 14
        }}
        style={{ width: 850, height: 430, overflow: "hidden", borderRadius: 12 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Markers />
      </Map>
    </div>
  )
}

export default MapBoxmap
