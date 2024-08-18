/* Dependencies */
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import socketIo from 'socket.io';

/* Routes */
import ProductRoute from '../routes/Client/Products/Products.routes.js'
import CartRoute from '../routes/Client/Carts/Carts.routes.js'
import { engine } from 'express-handlebars'
import http from 'http';

export default class Server {
    constructor () {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = socketIo(this.server);
        this.port = process.env.SERVER_PORT || '8080';
        this.apiPaht = {
            product: '/api/product',
            cart: '/api/cart'
        }

        this.middlewares();
        this.viewEngine();
        this.router();
        this.initializeSocketIo();
    }

    middlewares() {
        this.app.use(cors({
            origin: '*'
        }));

        this.app.use(morgan('combined'));

        this.app.use(express.json({ limit: '50mb' }));
        
    }

    viewEngine() {
        // Configurar Handlebars como motor de plantillas
        this.app.engine('handlebars', engine());
        this.app.set('view engine', 'handlebars');
        this.app.set('views', './src/views/layouts'); 
    }

    initializeSocketIo() {
        this.io.on('connection', (socket) =>{
            console.log('Usuario conectado');
            socket.on('disconnect', () => {
                console.log('Usuario desconectado');
            })
        })
    }

    router() {
        this.app.use(this.apiPaht.product, ProductRoute);
        this.app.use(this.apiPaht.cart, CartRoute);
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`✅ Servidor corriendo en el puerto ${this.port}`);
        })
    }
}