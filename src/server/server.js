import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import ProductRoute from '../routes/products.routes.js'
import CartRoute from '../routes/carts.routes.js'

export default class Server {
    constructor () {
        this.app = express();
        this.port = process.env.SERVER_PORT || '8080';
        this.apiPhat = {
            product: '/api/product',
            cart: '/api/cart'
        }

        this.middlewares();

        this.router();
    }

    middlewares() {
        this.app.use(cors({
            origin: '*'
        }));

        this.app.use(morgan('combined'));

        this.app.use(express.json({ limit: '50mb' }));
        
    }

    router() {
        this.app.use(this.apiPhat.product, ProductRoute);
        this.app.use(this.apiPhat.cart, CartRoute);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`✅ Servidor corriendo en el puerto ${this.port}`);
        })
    }
}