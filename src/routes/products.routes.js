import { Router } from 'express';
import fs from 'fs';

const router = Router();

const productsFile = 'products.json';

const readProducts = async () => {
    const data = await fs.readFileSync(productsFile);
    return JSON.parse(data);
};

const writeProducts = async(products) => {
    await fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
};

router.get('/', async (req, res) => {
    const limit = req.query.limit;
    const products = await readProducts();
    if (limit) {
        res.json(products.slice(0, limit));
    } else {
        res.json(products);
    }
});

router.get('/:pid', async (req, res) => {
    const products = await readProducts();
    const product = products.find(p => p.id === req.params.pid);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

router.post('/', async (req, res) => {
    const products = await readProducts();
    const newProduct = {
        id: (products.length + 1).toString(),
        title: req.body.title,
        description: req.body.description,
        code: req.body.code,
        price: req.body.price,
        status: req.body.status !== undefined ? req.body.status : true,
        stock: req.body.stock,
        category: req.body.category,
        thumbnails: req.body.thumbnails || []
    };
    products.push(newProduct);
    writeProducts(products);
    res.status(201).json(newProduct);
});

router.put('/:pid', async (req, res) => {
    const products = await readProducts();
    const productIndex = products.findIndex(p => p.id === req.params.pid);
    if (productIndex !== -1) {
    const updatedProduct = {
        ...products[productIndex],
        ...req.body,
        id: products[productIndex].id 
    };
    products[productIndex] = updatedProduct;
    writeProducts(products);
    res.json(updatedProduct);
    } else {
        res.status(404).send('Product not found');
    }
});

router.delete('/:pid', async (req, res) => {
    let products = await readProducts();
    const productIndex = products.findIndex(p => p.id === req.params.pid);
    if (productIndex !== -1) {
        products = products.filter(p => p.id !== req.params.pid);
        writeProducts(products);
        res.sendStatus(204);
    } else {
        res.status(404).send('Product not found');
    }
});

export default router;