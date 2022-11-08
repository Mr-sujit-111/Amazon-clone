const stripe = require('stripe')(process.env.STRIPE_SECRET);


export default async (req, res) => {
    const { items, email } = req.body;
    console.log(email);

    const transformedItems = items.map(item => ({
        price_data: {
            currency: 'inr',
            unit_amount: +item.price * 100,
            product_data: {
                name: item.title,
                images: [item.img],
                description: item.description,
            },
        },
        quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_address_collection: {
            allowed_countries: ['US', "CA", "IN"]
        },
        line_items: transformedItems,
        mode: 'payment',
        success_url: `${process.env.BASE_URL}/success`,
        cancel_url: `${process.env.BASE_URL}/checkout`,
        metadata: {
            email,
            images: JSON.stringify(items.map(item => item.img))
        },
    });
    res.status(200).json({ id: session.id })
};