import fs from 'fs';

const cartsFile = 'src/dbjson/carts.json';
const productsFile = 'src/dbjson/products.json';

const readCarts = async () => {
    const data = fs.readFileSync(cartsFile);
    return JSON.parse(data);
};

const writeCarts = async (carts) => {
    fs.writeFileSync(cartsFile, JSON.stringify(carts, null, 2));
};

const readProducts = async () => {
    const data = fs.readFileSync(productsFile);
    return JSON.parse(data);
};

async function PostCart(req, res) {
    try {
        const carts = await readCarts();
        const newCart = {
            id: (carts.length + 1).toString(),
            products: []
        };
        carts.push(newCart);
        await writeCarts(carts);
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).send('Error creating cart');
    }
}

async function GetCart(req, res) {
    try {
        const carts = await readCarts();
        const cart = carts.find(c => c.id === req.params.cid);
        res.json(cart ? cart.products : 'Cart not found');
    } catch (error) {
        res.status(500).send('Error fetching cart');
    }
}

async function AddProductToCart(req, res) {
    try {
        const carts = await readCarts();
        const products = await readProducts();
        const cart = carts.find(c => c.id === req.params.cid);
        const product = products.find(p => p.id === req.params.pid);

        if (cart && product) {
            const cartProduct = cart.products.find(p => p.product === req.params.pid);
            if (cartProduct) {
                cartProduct.quantity += 1;
            } else {
                cart.products.push({ product: req.params.pid, quantity: 1 });
            }
            await writeCarts(carts);
            res.status(201).json(cart);
        } else {
            res.status(404).send('Cart or product not found');
        }
    } catch (error) {
        res.status(500).send('Error adding product to cart');
    }
}

export {
    PostCart,
    GetCart,
    AddProductToCart
};