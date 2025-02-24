/* Dependencies */
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { Server as socketIo } from 'socket.io'
import { engine } from 'express-handlebars'
import Handlebars from 'handlebars'
import cookieParser from 'cookie-parser'

/* Access */
import http from 'http'
import path from 'path'
import { __dirname } from '../utils/dirname.js';
import { initializePassport } from '../config/passport.config.js'
import passport from 'passport'

/* Routes */
import ProductRoute from '../routes/Client/Products/Products.routes.js'
import CartRoute from '../routes/Client/Carts/Carts.routes.js'
import ViewRoute from '../routes/Client/Views/Views.routes.js'
import OrderRoute from '../routes/Client/Orders/Orders.routes.js'
import PruebaRoute from '../routes/Client/Pruebas/Pruebas.routes.js'
import SessionRoute from '../routes/Client/Sessions/Sessions.routes.js'
import TicketRoute from '../routes/Client/Tickets/Tickets.routes.js'
import { UserRoute } from '../routes/Client/Users/Users.routes.js'

/* DB */
import db, { configObjet } from './connection.db.js'

export default class Server {
    constructor () {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = new socketIo(this.server);
        this.port = configObjet.port
        this.apiPaht = {
            product: '/api/product',
            user: '/api/user',
            cart: '/api/cart',
            order: '/api/order',
            prueba: '/api/prueba',
            session: '/api/session',
            ticket: '/api/ticket'
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
        this.app.use(cookieParser(configObjet.private_key))

        initializePassport()
        this.app.use(passport.initialize())

        this.app.use((req, res, next) => {
            req.io = this.io;
            next();
        })
    }

    connectDB () {
        db();
    }

    viewEngine () {
        Handlebars.registerHelper('eq', function (a, b) {
            return a === b;
        });
        Handlebars.registerHelper('multiply', function(a, b) {
            return a * b;
        });
    
        // Registrar el helper "json"
        Handlebars.registerHelper('json', function(context) {
            return JSON.stringify(context);
        });
    
        this.app.engine('.handlebars', engine({ 
            extname: '.handlebars', 
            defaultLayout: 'main',
            runtimeOptions: {
            allowProtoPropertiesByDefault: true
            }
        }))
        this.app.set('view engine', '.handlebars');
    
        this.app.set('views', path.resolve('src/views'));
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
        const userRoute = new UserRoute()
        this.app.use('/', ViewRoute);
        this.app.use(this.apiPaht.ticket, TicketRoute)
        this.app.use(this.apiPaht.prueba, PruebaRoute);
        this.app.use(this.apiPaht.session, SessionRoute);
        this.app.use(this.apiPaht.product, ProductRoute);
        this.app.use(this.apiPaht.cart, CartRoute);
        this.app.use(this.apiPaht.user, userRoute.getRouter());
        this.app.use(this.apiPaht.order, OrderRoute);
    }

    listen () {
        this.server.listen(this.port, () => {
            console.log(`✅ Servidor corriendo en el puerto ${this.port}`);
        })
    }
}