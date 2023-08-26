'use client';

import React, { useEffect, useState } from 'react'
import AutoCompleteBooking from './AutoCompleteBooking'
import Cars from './Cars';
import Cards from './Cards';

const Booking = () => {
  const [screenHeight, setScreenHeight] = useState<number>()
  useEffect(() => {
    setScreenHeight(window.innerHeight * 0.68);
  }, [])

  return (
    <div className='my-4 mx-6 relative'>
      <h1 className='text-2xl font-semibold my-6'>Booking</h1>
      <div className='border p-4 relative overflow-auto' style={{ height: screenHeight }}>
        <AutoCompleteBooking />
        <Cars />
        <Cards />
        <div className='flex justify-center items-center my-4'>
        <button className='bg-yellow-500 px-3 py-2 text-center rounded-sm active:bg-yellow-400'>Booking</button>
        </div>
      </div>
    </div>
  )
}

export default Booking