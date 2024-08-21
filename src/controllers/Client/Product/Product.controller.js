import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsFile = path.join(__dirname, '../../../../dbjson/products.json');

const readProducts = async () => {
    const data = await fs.promises.readFile(productsFile, 'utf8');
    return JSON.parse(data);
};

const writeProducts = async (products) => {
    await fs.promises.writeFile(productsFile, JSON.stringify(products, null, 2), 'utf8');
};

async function GetProduct(req, res) {
    try {
        const limit = req.query.limit;
        const products = await readProducts();
        res.json(limit ? products.slice(0, limit) : products);
    } catch (error) {
        console.error('Error en GetProduct:', error); // Detalle del error
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

        if (!newProduct.title || !newProduct.price || !newProduct.description || !newProduct.thumbnail || !newProduct.stock) {
            throw new Error('Faltan campos en la solicitud');
        }

        products.push(newProduct);
        await writeProducts(products);
        res.status(201).json(newProduct);
        req.io.emit('productList', products); 
    } catch (error) {
        console.error('Error en PostProduct:', error);
        res.status(500).send('Error creating product');
    }
}

export {
    PostProduct,
    GetProduct
};