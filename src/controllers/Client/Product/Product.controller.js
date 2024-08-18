import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener __dirname de manera compatible con ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsFile = path.join(__dirname, '../../dbjson/products.json');
const readProducts = async () => {
    const data = await fs.readFileSync(productsFile);
    return JSON.parse(data);
};

const writeProducts = async (products) => {
    await fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
};

async function GetProduct(req, res) {
    try {
        const limit = req.query.limit;
        const products = await readProducts();
        res.json(limit ? products.slice(0, limit) : products);
    } catch (error) {
        res.status(500).send('Error fetching products');
    }
}

async function PostProduct(req, res) {
    try {
        const products = await readProducts();
        const newProduct = {
            id: (products.length + 1).toString(),
            ...req.body
        };
        products.push(newProduct);
        await writeProducts(products);
        res.status(201).json(newProduct);
        // Emitir evento a través de socket.io
        req.io.emit('productAdded', newProduct);

    } catch (error) {
        res.status(500).send('Error creating product');
    }
}

export {
    PostProduct,
    GetProduct
};