import Header from "../components/Header"
import { motion } from "framer-motion";
import { addToCart, detailItem } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid"
import Image from "next/image";
import CashLogo from "../assets/images/cash.png";
import ReturnLogo from "../assets/images/return.png";
import WarrantyLogo from "../assets/images/warranty.png";
import DeliveryLogo from "../assets/images/delivery.png";
import DetailPageAdd from "../assets/images/detail.jpg";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";

function Detail() {
    const route = useRouter();
    const dispatch = useDispatch();
    const myDetailItem = useSelector(detailItem);
    const [numberOfStar, setNumberOfStar] = useState(1);
    const [item, setItem] = useState({ img: myDetailItem.img, title: myDetailItem.title, price: myDetailItem.price, description: myDetailItem.description, category: myDetailItem.category, id: myDetailItem.id })

    useEffect(() => {
        setNumberOfStar(Math.floor(Math.random() * 5) + 1)
    }, [])

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

    const ServicesList = {
        C: "Pay on Delivery",
        R: "10 Days Returnable",
        W: "Amazon Delivered",
        D: "6 Month Warranty"
    }
    const OffersList = {
        "no cost emi": "Avail No Cost EMI on select cards for orders above ₹3000",
        "Bank Offer": "Upto ₹170.00 discount on select Credit CardsUpto ₹170.00 discount on select Credit Cards",
        "Partner Offers": "Get GST invoice and save up to 28% on business purchases. Sign up for get without  GST."
    }
    const handleAddToCart = () => {
        const product = {
            title: item.title,
            price: item.price,
            description: item.description,
            category: item.category,
            img: item.img,
            id: item.id
        }
        dispatch(addToCart(product));
        notify();
    }
    return (
        <div>
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
            <Header />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
            >
                <main className=" max-w-screen-3x1 px-10 pt-10 flex flex-col gap-6 lg:flex-row">
                    {/* leftSidebar */}
                    <div className="flex justify-center sm:justify-start items-center">
                        <div className="rounded-md relative w-[50vh] h-[50vh] overflow-hidden m-0  bg-gray-200">
                            <img src={item.img} className="block object-contain rounded-md absolute h-full w-full top-0 left-0 p-5" alt="image" />
                        </div>
                    </div>
                    {/* rightSidebar-1*/}
                    <div className="relative">
                        <p className="sm:text-2xl mt-5 font-extrabold">{item.title}</p>
                        <div className="flex absolute top-0 ">
                            {
                                Array(numberOfStar).fill(" ").map((_, i) => (
                                    <StarIcon key={i} className="h-5 text-yellow-400" />
                                ))
                            }
                        </div>
                        <div className="my-4 shadow-md p-2 hover:bg-yellow-400 transition-all duration-1000 hover:cursor-pointer border-yellow-400 text-2xl border flex flex-col sm:flex-row justify-center items-center">
                            <p className="capitalize font-bold">price: {item.price} ₹/-  </p>
                            <p>Inclusive of all taxes</p>
                        </div>
                        <hr />
                        <span className="font-bold text-2xl">Services:</span>
                        <div className="flex gap-3">
                            {Object.entries(ServicesList).map((service, index) => {
                                return <div key={index} className="my-5   flex justify-center items-center flex-col">
                                    <Image
                                        className="hover:rotate-[360deg] hover:cursor-pointer transition-all duration-500"
                                        src={service[0] === "C" && CashLogo || service[0] === "R" && ReturnLogo || service[0] === "W" && WarrantyLogo || service[0] === "D" && DeliveryLogo}
                                        width={50}
                                        height={50}
                                    />
                                    <p className="capitalize text-blue-400">{service[1]}</p>
                                </div>
                            })
                            }
                        </div>
                        <hr />
                        <span className="font-bold text-2xl">Offers:</span>
                        <div className="flex flex-col items-center sm:flex-row">
                            {Object.entries(OffersList).map((offer, index) => {
                                return <div key={index} className="w-40 border-yellow-400 p-4 hover:scale-105 hover:cursor-pointer transition-all duration-700 border shadow-2xl m-4">
                                    <span className="capitalize font-bold text-sm">{offer[0]}</span>
                                    <span className="inline-block p-2 text-xs">{offer[1]}</span>
                                </div>
                            })}
                        </div>
                    </div>
                    {/* rightSidebar-2*/}
                    <div className="flex flex-col gap-5">
                        <div className="relative border-2 rounded-md px-5">
                            <div className="flex justify-center items-center p-4 ml-4">
                                <p className="font-bold text-3xl">Total Price: {item.price} ₹/-   </p>
                            </div>
                            <span className="text-yellow-500 font-bold mx-5">FREE delivery</span>
                            <span className="block break-words mx-5 mb-5">{item.description}</span>
                            <hr />
                            {/* <span className="m-5 block">{item.title} ({item.category})</span> */}
                            <span className="m-5">Sold by JPT - {item.category} and Fulfilled by Amazon. </span>
                            <div className="w-full p-3">
                                <button onClick={handleAddToCart} className="mt-2 w-full  block button focus:outline-none focus:ring-2 focus:ring-yellow-500 active:from-yellow-500 capitalize" >Add to cart</button>
                                <button className="mt-2 w-full  block button focus:outline-none focus:ring-2 focus:ring-yellow-500 active:from-yellow-500 capitalize" onClick={() => route.push("/")} >Back to home</button>
                                <button onClick={() => route.push("/checkout")} className="mt-2 w-full  block button focus:outline-none focus:ring-2 focus:ring-yellow-500 active:from-yellow-500 capitalize" >Go to cart</button>
                            </div>
                        </div>
                    </div>

                </main>
                <div className="flex justify-center items-center">
                    <Image src={DetailPageAdd} height={200} width={1150} objectFit="cover" />
                </div>
            </motion.div>
        </div>
    )
}

export default Detail