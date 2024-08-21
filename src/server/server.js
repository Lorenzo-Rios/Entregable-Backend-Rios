/* Dependencies */
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { Server as socketIo } from 'socket.io'
import { engine } from 'express-handlebars'

/* Access */
import http from 'http';
import path from 'path'
import { __dirname } from '../utils/dirname.js';

/* Routes */
import ProductRoute from '../routes/Client/Products/Products.routes.js'
import CartRoute from '../routes/Client/Carts/Carts.routes.js'
import ViewRoute from '../routes/Client/Views/Views.routes.js'

export default class Server {
    constructor () {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = new socketIo(this.server);
        this.port = process.env.SERVER_PORT || '8080';
        this.apiPaht = {
            product: '/api/product',
            cart: '/api/cart'
        }

        this.app.set('io', this.io);
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
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
        this.app.use((req, res, next) => {
            req.io = this.io;
            next();
        })
    }

    viewEngine() {
        this.app.engine('handlebars', engine({
            layoutsDir: path.join(__dirname, '../views/layouts')
        }));
        this.app.set('view engine', 'handlebars');
        this.app.set('views', path.join(__dirname, '../views/layouts'));
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
        this.app.use('/', ViewRoute);
        this.app.use(this.apiPaht.product, ProductRoute);
        this.app.use(this.apiPaht.cart, CartRoute);
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`✅ Servidor corriendo en el puerto ${this.port}`);
        })
    }
}