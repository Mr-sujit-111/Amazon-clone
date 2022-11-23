import Image from "next/image"
import AmazonLogo from "../assets/images/amazon-logo.png";
import { InboxIcon, ShoppingCartIcon, MoonIcon } from '@heroicons/react/24/outline'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { selectedItems } from "../store/cartSlice";

function Header() {
    const session = useSession();
    const route = useRouter();
    const items = useSelector(selectedItems);
    const dispatch = useDispatch();

    const handleSellClick = (e) => {
        const filterValue = (e.target.innerText).toLowerCase();
    }

    return (
        <div>
            <div className="bg-[#131921]  p-3 flex">
                {/* icon-logo */}
                <div className=" hidden sm:flex items-center flex-grow sm:flex-grow-0 pt-2 pr-2">
                    <Image src={AmazonLogo}
                        onClick={() => route.push("/")}
                        width={150}
                        height={40}
                        className="cursor-pointer"
                    />
                </div>
                {/* search bar */}
                <div className="hidden sm:flex bg-yellow-400  flex-grow rounded-md cursor-pointer">
                    <input className="flex flex-grow rounded-l-md focus:outline-none p-3" type="text" name="" id="" />
                    <div className="icon h-10 w-11 p-2">
                        <InboxIcon />
                    </div>
                </div>
                {/* right section */}
                <div className="flex gap-3 mx-3 text-white text-md">
                    <div className="mx-3 " onClick={session.data ? signOut : signIn}>
                        {session.data ? <p>Hello, {session.data.user.name}</p> : "Sign-in"}
                        <p className="font-bold whitespace-pre hover:link">Account</p>
                    </div>
                    <div className="mx-3 cursor-pointer" onClick={() => route.push("/orderlist")}>
                        <p>Returns</p>
                        <p className="font-bold whitespace-pre hover:link">& Orders</p>
                    </div>
                    <div className="mx-3 flex justify-center items-center gap-2 relative cursor-pointer" onClick={() => route.push("/checkout")}>
                        <div>
                            <ShoppingCartIcon height={40} />
                        </div>
                        <span className="absolute bg-yellow-500 w-5  h-5 flex justify-center items-center rounded-full left-7 top-0 text-black font-bold">{items?.length}</span>
                        <p className="font-bold whitespace-pre hover:link hidden sm:inline ">Cart</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header