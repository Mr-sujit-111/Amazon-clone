import Image from "next/image";
import Currency from 'react-currency-formatter';
import { useDispatch } from "react-redux";
import { addToCart, removeToCart } from "../store/cartSlice";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CheckoutItem({ category, title, price, description, img, id }) {
    const dispatch = useDispatch();

    const addItemAlert = () => toast.success('Item added in cart!', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
    });
    const removeItemAlert = () => toast.error('Item removed from cart!', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
        icon: "✔"
    });

    const handleAddtocart = () => {
        const product = {
            category, title, price, description, img, id
        }
        dispatch(addToCart(product));
        setTimeout(() => {
            window.scrollTo(0, document.body.scrollHeight);
        }, 200);
        addItemAlert();
    }

    const handleremoveToCart = () => {
        dispatch(removeToCart({ id }));
        removeItemAlert();
    }
    return (
        <>
            <div className="flex flex-col sm:grid grid-cols-5 m-3 p-5 `" style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
                <Image src={img} height={200} width={200} objectFit="contain" />
                <div className="col-span-3 mx-5">
                    <p>{title}</p>
                    <p>{category}</p>
                    <p className="my-2 line-clamp-3">{description}</p>
                    <Currency
                        quantity={price}
                        currency="INR"
                    />
                </div>
                <div className="flex flex-col space-y-2 my-3 justify-center">
                    <button className="mt-2 button focus:outline-none focus:ring-2 focus:ring-yellow-500 active:from-yellow-500" onClick={handleAddtocart}>Add to cart</button>
                    <button className="mt-2 button focus:outline-none focus:ring-2 focus:ring-yellow-500 active:from-yellow-500" onClick={handleremoveToCart}>Remove to cart</button>
                </div>
            </div >
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    )
}

export default CheckoutItem