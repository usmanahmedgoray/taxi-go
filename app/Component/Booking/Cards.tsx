import React, { useState } from 'react'
import CardList from '@/data/CardList'
import Image from 'next/image'

const Cards = () => {
    const [selectedCard, setSelectedCard] = useState<number>()
    return (
        <div className='mt-3'>
            <h2 className='font-semibold'>Payment Method</h2>
            <div className='grid grid-cols-2 mt-3'>
                {CardList?.map((item, index) => {
                    return (
                        <div key={item.id} className={` flex justify-around items-center m-2 p-2 border hover:border-yellow-300 cursor-pointer rounded-md ${index == selectedCard ? "border-yellow-400 border-2" : null}`} onClick={() => setSelectedCard(index)}>
                            <Image src={item.image} alt={item.name} width={40} height={26} priority />
                            <h2 className='text-base'>{item.name}</h2>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Cards