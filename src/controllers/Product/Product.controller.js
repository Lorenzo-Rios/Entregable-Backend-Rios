import fs from 'fs'

const productsFile = 'src/dbjson/products.json'

const readProducts = async () => {
    const data = fs.readFileSync(productsFile);
    return JSON.parse(data);
}

const writeProducts = async (products) => {
    fs.writeFileSync(productsFile, JSON.stringify(products, null, 2))
}

async function PostProduct(req, res) {
    
}

const GetProduct = async (req, res) => {
    const limit = req.query.limit;
    const products = await readProducts();
    if (limit) {
        res.json(products.slice(0, limit));
    } else {
        res.json(products)
    }

}

async function PutProduct(req, res) {
    
}

async function DeleteProduct(req, res) {
    
}

export {
    PostProduct,
    GetProduct,
    PutProduct,
    DeleteProduct
}