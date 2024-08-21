import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener __dirname de manera compatible con ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsFile = path.join(__dirname, '../../../../dbjson/products.json');

// Leer productos desde el archivo
const readProducts = async () => {
    const data = await fs.promises.readFile(productsFile, 'utf8');
    return JSON.parse(data);
};

// Escribir productos en el archivo
const writeProducts = async (products) => {
    await fs.promises.writeFile(productsFile, JSON.stringify(products, null, 2), 'utf8');
};

// Obtener productos
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

// Crear nuevo producto
async function PostProduct(req, res) {
    try {
        const products = await readProducts();
        const newProduct = {
            id: (products.length + 1).toString(),
            ...req.body
        };
        
        // Verificar campos requeridos
        if (!newProduct.title || !newProduct.price || !newProduct.description || !newProduct.thumbnail || !newProduct.stock) {
            throw new Error('Faltan campos en la solicitud');
        }

        products.push(newProduct);
        await writeProducts(products);
        res.status(201).json(newProduct);
        // Emitir la lista completa de productos a través de socket.io
        req.io.emit('productList', products); 
    } catch (error) {
        console.error('Error en PostProduct:', error); // Imprimir detalles del error
        res.status(500).send('Error creating product');
    }
}

export {
    PostProduct,
    GetProduct
};