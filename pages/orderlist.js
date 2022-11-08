import { collection, getDocs, query } from "firebase/firestore";
import moment from "moment/moment";
import { getSession, useSession } from "next-auth/react";
import Header from "../components/Header"
import Order from "../components/Order";
import { db, fireStoredata } from "../firebase";

function orderlist({ orders }) {
    const session = useSession();
    return (
        <div>
            <Header />
            <main className="mx-auto max-w-screen-2x1 p-10">
                <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">Your Orders</h1>
                {session.data ? <p className="capitalize my-3"> Total Orders : {orders.length}</p> : <p>Sign-in to see your order</p>}
                <div className="mt-5 space-y-4">
                    {orders?.map(({ amount, id, images, items, timestamp }, index) => {
                        return <Order key={index}
                            amount={amount}
                            id={id}
                            images={images}
                            items={items}
                            timestamp={timestamp} />
                    })
                    }
                </div>
            </main>
        </div>
    )
}

export default orderlist

export async function getServerSideProps(context) {
    const stripe = require('stripe')(process.env.STRIPE_SECRET);

    // get users credentials
    const session = await getSession(context);

    if (!session) {
        return {
            props: {}
        }
    }
    const p1 = new Promise(function (resolve, reject) {
        fireStoredata.map(async () => {
            const orderQuery = query(collection(db, `users/${session.user.email}/orders`));
            const getOrderDocs = await getDocs(orderQuery);
            const orderData = getOrderDocs.docs.map((doc) => {
                return ({
                    ...doc.data(), id: doc.id
                })
            })
            resolve(orderData);
            return orderData
        })
    });

    const orders = p1.then(async function (value) {
        var productData = (value);
        console.log(value);
        const orderMetadata = await Promise.all(
            productData.map(async (order) => {
                return ({
                    id: order.id,
                    amount: order.amount,
                    images: order.images,
                    timestamp: moment(order.timestamp.toDate()).unix(),
                    items: (
                        await stripe.checkout.sessions.listLineItems(order.id, {
                            limit: 100,
                        })
                    ).data,
                })
            })
        );

        console.log(orderMetadata);
        return orderMetadata
    }).catch(function (e) {
        console.log(e);
        return {
            props: {
                orders: "catch"
            }
        }
    });
    return {
        props: {
            orders: await orders
        }
    }
}