import React, { useState } from 'react'
import CarsList from "@/data/CarList"
import Image from 'next/image'

const Cars = () => {
    const [selectedCar, setSelectedCar] = useState<number>()
    return (
        <div className='mt-3'>
            <h2 className='font-semibold'>Select Cars</h2>
            <div className='grid grid-cols-2 mt-3'>
                {CarsList?.map((item, index) => {
                    return (
                        <div key={item.id} className={`m-2 p-2 border hover:border-yellow-300 cursor-pointer rounded-md ${index==selectedCar?"border-yellow-400 border-2":null}`} onClick={()=>setSelectedCar(index)}>
                            <Image src={item.image} alt={item.name} width={90} height={76} className='w-full' priority/>
                            <div className='flex justify-between items-center p-2 relative'>
                                <h2 className='text-base'>{item.name}</h2>
                                <span>{item.charges * 70 } Rs</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Cars