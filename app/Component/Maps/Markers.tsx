import { UseLocationContext } from '@/Context/UseLocationContext';
import { SourceCoordinatesContext } from '@/Context/SourceCoordinatesContext';
import { DestinyCoordinatesContext } from '@/Context/DestinyCoordinatesContext';
import React, { useContext } from 'react'
import { Marker } from 'react-map-gl'
import { useUser } from '@clerk/nextjs';

const Markers = () => {
    // Handle Context APIs
    const { userLocation } = useContext(UseLocationContext)
    const { sourceCoordinates } = useContext(SourceCoordinatesContext)
    const { destinyCoordinates } = useContext(DestinyCoordinatesContext)
    // Get the Image Url
    const { user } = useUser();
    if (!user) {
        return null;
    }
    const profileImageUrl = user.imageUrl;
    // console.log(sourceCoordinates);
    // console.log(destinyCoordinates);


    return (
        <div>
            {/* Set the current poition markers */}
            <Marker longitude={userLocation?.lnt} latitude={userLocation?.lat} anchor="bottom" >
                <img src={profileImageUrl} className='w-12 rounded-full' />
            </Marker>

            {/* set the source markers */}
            {sourceCoordinates.length !== 0?
                <Marker longitude={sourceCoordinates?.lnt} latitude={sourceCoordinates?.lat} anchor="bottom" >
                    <img src={profileImageUrl} className='w-12 rounded-full' />
                </Marker>:null}
            {/* set the destination markers */}
            {destinyCoordinates.length !== 0?
                <Marker longitude={destinyCoordinates?.lnt} latitude={destinyCoordinates?.lat} anchor="bottom" >
                    <img src={profileImageUrl} className='w-12 rounded-full' />
                </Marker>:null}
        </div>
    )
}

export default Markers