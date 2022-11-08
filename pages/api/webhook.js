import { buffer } from "micro";
import * as admin from "firebase-admin";

const serviceAccount = require("../../permission.json");
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const endpointSecret = process.env.STRIPE_SIGNIN_SECRET;

// initialization of app
const app = admin.app.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}) : admin.app();


//fullfill order task
const fullfilledorder = async (session) => {
    console.log("Your order is full-filled", session);

    return app.firestore().collection("users").doc(session.metadata.email).collection("orders").doc(session.id).set({
        amount: session.amount_total / 100,
        images: JSON.parse(session.metadata.images),
        timestamp: admin.firestore.FieldValue.serverTimestamp()
    })
        .then(() => {
            console.log("finally order process is done in firestore");
        });
}

export default async (req, res) => {
    if (req.method === "POST") {
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig = req.headers['stripe-signature'];
        let event;

        // verify event is come from stripe.
        try {
            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
        } catch (error) {
            console.log(error.message);
            return res.status(400).send(`Webhook error ${error.message}`)
        }

        // Handle checkout session completed event
        if (event.type === "checkout.session.completed") {
            const session = event.data.object;

            return fullfilledorder(session).then(() => res.status(200).end()).catch((err) => res.status(400).send(`webhook error ${err.message}`));
        }
    }
};

export const config = {
    api: {
        bodyParser: false,
        externalresolver: true
    }
}

