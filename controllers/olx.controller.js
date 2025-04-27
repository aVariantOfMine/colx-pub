const fetch_products = async (req, res) => {
    try {
        const products = await Olx.find();
        console.log('[+] fetching products...', products);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}

const post_product = async (req, res) => {
    try {
        const { name, contact, price, title, desc } = req.body;
        await Olx.create({
            title,
            desc,
            price,
            seller: name,
            seller_contact: contact,
        });
        res.redirect(`${URL}/olx/buy`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}

const set_sold = (req, res) => {

}

const get_product = (req, res) => {

}

const delete_product = (req, res) => {

}

const update_product = (req, res) => {

}

module.exports = {
    'fetch_products': fetch_products,
    'post_product': post_product,

    // not implemented
    'set_sold': set_sold,
    'get_product': get_product,
    'delete_product': delete_product,
    'update_product': update_product
}

