import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router';
import React from 'react'
import Header from '../components/Header'

function Success() {
    const route = useRouter();
    return (
        <div className='bg-gray-100 h-screen' >
            <Header />
            <div className='flex items-center justify-center w-full h-80'>
                <main className='max-w-screen-lg'>
                    <div className='flex flex-col p-10 bg-white'>
                        <div className="flex items-center space-x-2 mb-5">
                            <CheckCircleIcon className='h-10 text-green-500' />
                            <h1 className='text-3xl'>
                                Thank You , Your order has been confirmed !
                            </h1>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam impedit laborum error tempore voluptatibus reiciendis magni commodi necessitatibus ea eius.   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum minima eligendi in quo ex sit quidem veritatis fugit atque repudiandae.</p>
                        <button onClick={() => route.push("/orderlist")} className="mt-2 button focus:outline-none focus:ring-2 focus:ring-yellow-500 active:from-yellow-500 font-bold">Go to Your Order</button>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Success