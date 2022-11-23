import Image from "next/image";
import Currency from 'react-currency-formatter';
import { useDispatch } from "react-redux";
import { addDetailPageItem, addToCart, removeToCart } from "../store/cartSlice";
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";

function CheckoutItem({ repeatNumber, category, title, price, description, img, id }) {
    const route = useRouter();
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

    const handleAddToCart = () => {
        const product = {
            category, title, price, description, img, id
        }
        dispatch(addToCart(product));
        /* setTimeout(() => {
            window.scrollTo(0, document.body.scrollHeight);
        }, 200); */
        addItemAlert();
    }

    const handleRemoveToCart = () => {
        dispatch(removeToCart({ id }));
        removeItemAlert();
    }

    const handleViewDetailClick = () => {
        route.push("/detail");
        dispatch(addDetailPageItem({ id, title, price, description, category, img }))
    }
    return (
        <>
            <div className="relative flex flex-col sm:grid grid-cols-5 m-3 p-5 `" style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}>
                <Image src={img} height={200} width={200} objectFit="contain" />
                <div className="col-span-3 mx-5">
                    <p>{title}</p>
                    <p className="w-8 font-bold flex justify-center items-center h-8 rounded-full bg-yellow-400 absolute top-2 right-2">{repeatNumber}</p>
                    <p>{category}</p>
                    <p className="my-2 line-clamp-3">{description}</p>
                    <Currency
                        quantity={price}
                        currency="INR"
                    />
                </div>
                <div className="flex flex-col space-y-2 my-3 justify-center">
                    <button className="mt-2 button focus:outline-none focus:ring-2 focus:ring-yellow-500 active:from-yellow-500" onClick={handleAddToCart}>Add to cart</button>
                    <button className="mt-2 button focus:outline-none focus:ring-2 focus:ring-yellow-500 active:from-yellow-500" onClick={handleRemoveToCart}>Remove to cart</button>
                    <button className="mt-2 button focus:outline-none focus:ring-2 focus:ring-yellow-500 active:from-yellow-500" onClick={handleViewDetailClick}>View Detail</button>
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