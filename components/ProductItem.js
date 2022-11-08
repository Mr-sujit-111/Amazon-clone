import react from "react";
import { StarIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import { useState } from "react";
import Currency from 'react-currency-formatter';
import Primelogo from "../assets/images/Prime-tag.png";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ProductItem({ id, title, price, description, category, img }) {
    const [numberOfStar] = useState(Math.floor(Math.random() * (5 - 1 + 1)) + 1);
    const [isPrime] = useState(Math.random() > 0.5);

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
    return (
        <div className="relative flex flex-col m-5 bg-white p-10 rounded-md" >
            <p className="absolute top-2 right-2 text-xs italic text-gray-400">{category}</p>
            <p className="my-3 line-clamp-2">{title}</p>
            <Image src={img} height={200} width={200} objectFit="contain" />
            {/*  <div className="flex">
                {
                    Array(numberOfStar).fill().map((_, i) => (
                        <StarIcon key={i} className="h-5 text-yellow-400" />
                    ))
                }
            </div> */}
            {/* {isPrime && (<p>prime service</p>)} */}
            <p className="text-xs my-2 line-clamp-2">{description}</p>
            <div className="mb-5">
                <Currency
                    quantity={price}
                    currency="INR"
                />
            </div>
            {/* {isPrime && <div className="flex items-center space-x-2 -mt-5"><Image width={100} height={60} src={Primelogo} objectFit="contain" /> <p className=" text-gray-500">Free Delivery</p></div>} */}
            <button className="mt-2 button focus:outline-none focus:ring-2 focus:ring-yellow-500 active:from-yellow-500" onClick={handleAddToCart}>Add to cart</button>
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
        </div>
    )
}

export default ProductItem