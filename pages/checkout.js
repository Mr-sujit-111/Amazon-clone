import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import CheckoutItem from "../components/CheckoutItem";
import Header from "../components/Header";
import { addSelectedItem, selectedItems, totalPrice } from "../store/cartSlice";
import Currency from 'react-currency-formatter';
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { motion } from "framer-motion"
import { useEffect, useState } from "react";

const stripePromise = loadStripe(process.env.stripe_public_key);
function Checkout() {
    const items = useSelector(selectedItems);
    const session = useSession();
    const total = useSelector(totalPrice);
    const dispatch = useDispatch();

    const [iterableItems, setIterableItems] = useState(items);
    const [numberOfRepeat, setNumberOfRepeat] = useState()

    const handleProcedButtonClick = async () => {
        const stripe = await stripePromise;

        dispatch(addSelectedItem(items));

        /*  API CALL  */
        const checkoutSession = await axios.post('/api/checkout-session',
            {
                items: items,
                email: session.data.user.email
            })
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id
        });
        if (result.error) alert(result.error.message);
    };
    useEffect(() => {
        const key = "id";
        const arrayUniqueById = [...new Map(items.map(item =>
            [item[key], item])).values()];
        setIterableItems(arrayUniqueById)
        const lookup = items.reduce((a, e) => {
            a[e.id] = ++a[e.id] || 0;
            return a;
        }, {});
        setNumberOfRepeat(Object.entries(lookup));
    }, [items])



    return (
        <div className="bg-gray-200">
            <Header />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
            >
                <main className="lg:flex max-w-screen-2xl mx-auto">
                    {/* left section */}
                    <div className="flex-grow m-5 shadow-sm" >
                        <Image src="https://links.papareact.com/ikj" height={250} width={1150} objectFit="cover" />
                        <div className="flex  flex-col p-5 space-y-10 bg-white shadow-inner">
                            <div className="text-2xl border-b-2 pb-4 font-bold capitalize flex items-center gap-2">
                                <h1>{iterableItems?.length > 0 ? "shopping Cart List" : "Your shopping cart is empty"}</h1>
                                <ShoppingBagIcon className="h-5" />
                            </div>
                            {iterableItems?.map(({ category, title, price, description, img, id }, index) => {
                                let repeatNumber = 1;
                                numberOfRepeat?.filter(v => {
                                    if (+v[0] === id) {
                                        repeatNumber = +v[1] + 1;
                                    }
                                })
                                return <CheckoutItem key={index} repeatNumber={repeatNumber} category={category} title={title} price={price} description={description} img={img} id={id} />

                            })}
                        </div>
                    </div>
                    {/* right section */}
                    {iterableItems?.length > 0 && <>
                        <div className="flex flex-col bg-white p-10 shadow-md">
                            <h2 className="whitespace-nowrap">subtotal ({items?.length} items):</h2>
                            <span className="font-bold">
                                <Currency
                                    quantity={total}
                                    currency="INR"
                                />
                            </span>
                            <button
                                type="submit" role="link" onClick={handleProcedButtonClick} disabled={!session.data} className={`mt-2 button focus:outline-none focus:ring-2  ${!session.data ? "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed " : "focus:ring-yellow-500 active:from-yellow-500"} `}>
                                {!session.data ? "Sign-in to checkout" : "Proceed to checkout"}
                            </button>
                        </div>
                    </>
                    }
                </main >
            </motion.div>
        </div >
    )
}

export default Checkout