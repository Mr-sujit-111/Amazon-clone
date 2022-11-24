import { useEffect } from "react";
import { StarIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import { useState } from "react";
import Currency from 'react-currency-formatter';
import { useDispatch } from "react-redux";
import { addDetailPageItem, addToCart } from "../store/cartSlice";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";


function ProductItem({ id, title, price, description, category, img }) {
    const route = useRouter();
    const dispatchItem = useDispatch();
    const [numberOfStar, setNumberOfStar] = useState(1);
    const notify = () => toast.success('Item added in cart!', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide
    });

    useEffect(() => {
        setNumberOfStar(Math.floor(Math.random() * 5) + 1)
    }, [])


    const dispatch = useDispatch();

    const handleAddToCart = () => {
        const product = {
            title,
            price,
            description,
            category,
            img,
            id
        }
        dispatch(addToCart(product));
        notify();
    }

    const handleDetailPageClick = () => {
        route.push("/detail");
        dispatchItem(addDetailPageItem({ id, title, price, description, category, img }))
    }

    return (

        <div className="relative flex flex-col m-5 bg-white p-10 rounded-md" >
            <ToastContainer
                position="bottom-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="flex absolute top-2">
                {
                    Array(numberOfStar).fill(" ").map((_, i) => (
                        <StarIcon key={i} className="h-5 text-yellow-400" />
                    ))
                }
            </div>
            <p className="absolute top-2 right-2 text-xs italic text-gray-400">{category}</p>
            <p className="my-3 line-clamp-2">{title}</p>
            <Image src={img} height={200} width={200} objectFit="contain" />

            <p className="text-xs my-2 line-clamp-2">{description}</p>
            <div className="mb-5">
                <Currency
                    quantity={price}
                    currency="INR"
                />
            </div>
            <button className="mt-2 button focus:outline-none focus:ring-2 focus:ring-yellow-500 active:from-yellow-500" onClick={handleAddToCart}>Add to cart</button>
            <button className="mt-2 button focus:outline-none focus:ring-2 focus:ring-yellow-500 active:from-yellow-500" onClick={handleDetailPageClick}>View details</button>
        </div>
    )
}

export default ProductItem