/* Dependencies */
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { Server as socketIo } from 'socket.io'
import { engine } from 'express-handlebars'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import Handlebars from 'handlebars'
import FileStore from 'session-file-store'
import MongoStore from 'connect-mongo'
import 'dotenv/config'

/* Access */
import http from 'http'
import path from 'path'
import { __dirname } from '../utils/dirname.js';

/* Routes */
import ProductRoute from '../routes/Client/Products/Products.routes.js'
import CartRoute from '../routes/Client/Carts/Carts.routes.js'
import ViewRoute from '../routes/Client/Views/Views.routes.js'
import UserRoute from '../routes/Client/Users/Users.routes.js'
import OrderRoute from '../routes/Client/Orders/Orders.routes.js'
import PruebaRoute from '../routes/Client/Pruebas/Pruebas.routes.js'
import SessionRoute from '../routes/Client/Sessions/Sessions.routes.js'

/* DB */
import db from './connection.db.js'

export default class Server {
    constructor () {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = new socketIo(this.server);
        this.port = process.env.SERVER_PORT || 8080;
        this.apiPaht = {
            product: '/api/product',
            user: '/api/user',
            cart: '/api/cart',
            order: '/api/order',
            prueba: '/api/prueba',
            session: '/api/session'
        }

        this.app.set('io', this.io);
        this.middlewares();
        this.viewEngine();
        this.router();
        this.initializeSocketIo();
        this.connectDB();
    }

    middlewares () {
        this.app.use(cors({
            origin: '*'
        }));
        this.app.use(morgan('combined'));
        this.app.use(express.json({ limit: '50mb' }));     
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
        this.app.use(cookieParser(process.env.PRIVATE_KEY))

        //const fileStore = new FileStore(session)
        
        //coneccion de session con mongodb
        this.app.use(session({
            store: MongoStore.create({
                mongoUrl: process.env.MONGO_URL,
                ttl: 1000
            }),
            secret: process.env.PRIVATE_KEY,
            resave: true,
            saveUninitialized: true
        }))
        this.app.use((req, res, next) => {
            req.io = this.io;
            next();
        })
    }

    connectDB () {
        db();
    }

    viewEngine () {
        Handlebars.registerHelper('multiply', function(a, b) {
            return a * b;
        });
    
        // Registrar el helper "json"
        Handlebars.registerHelper('json', function(context) {
            return JSON.stringify(context);
        });
    
        // Configuración de Handlebars
        this.app.engine('handlebars', engine({
            layoutsDir: path.join(__dirname, '../views/layouts'),
            runtimeOptions: {
                allowProtoPropertiesByDefault: true
            }
        }));
        
        // Establecer el motor de vistas
        this.app.set('view engine', 'handlebars');
        this.app.set('views', path.join(__dirname, '../views/layouts'));
    }

    initializeSocketIo() {
        this.io.on('connection', (socket) =>{
            console.log('Usuario conectado');
            socket.on('chatMessage', (message) => {
                this.io.emit('chatMessage', message); // Emitir el mensaje a todos los clientes conectados
            });
            socket.on('disconnect', () => {
                console.log('Usuario desconectado');
            })

        })
    }

    router () {
        this.app.use('/', ViewRoute);
        this.app.use(this.apiPaht.prueba, PruebaRoute);
        this.app.use(this.apiPaht.session, SessionRoute);
        this.app.use(this.apiPaht.product, ProductRoute);
        this.app.use(this.apiPaht.cart, CartRoute);
        this.app.use(this.apiPaht.user, UserRoute);
        this.app.use(this.apiPaht.order, OrderRoute);
    }

    listen () {
        this.server.listen(this.port, () => {
            console.log(`✅ Servidor corriendo en el puerto ${this.port}`);
        })
    }
}