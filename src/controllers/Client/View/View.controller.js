import { productModel } from '../../../models/product.model.js';
import { cartModel } from '../../../models/cart.model.js'

async function renderMain(req, res) {
    res.render('main')
}

async function renderChat(req, res) {
    res.render('chat')
}
async function renderRealTimeProducts(req, res) {
    res.render('realtimeproducts')
}

async function renderCart(req, res) {
    try {
        const testCartId = '66f7728152336cfd1dc02873'
        const cart = await cartModel.findById(testCartId).populate('products.product');

        if (!cart) {
            return res.status(404).send('Carrito no encontrado');
        }

        let cartTotal = 0;
        cart.products.forEach(item => {
            cartTotal += item.product.price * item.quantity;
        });

        res.render('cart', {
            cart: cart,
            cartTotal: cartTotal
        });

    } catch (error) {
        console.error('Error en renderCart:', error);
        res.status(500).send('Error al mostrar el carrito');
    }
}

async function renderUser( req, res ) {
    res.render('user')
}

async function renderProducts(req, res) {
    try {
        const { page = 1, limit = 10 } = req.query;

        // Convertir 'page' y 'limit' a enteros
        const pageNumber = parseInt(page, 10) || 1;
        const limitNumber = parseInt(limit, 10) || 10;

        // Configuración de opciones para la paginación
        const options = {
            page: pageNumber,
            limit: limitNumber,
        };

        const result = await productModel.paginate({}, options);

        if (!result.docs || result.docs.length === 0) {
            return res.status(404).send({
                status: 'error',
                message: 'No products found'
            });
        }

        // Renderizar la vista de productos con los datos obtenidos de MongoDB
        res.render('products', {
            products: result.docs,
            totalPages: result.totalPages,
            currentPage: result.page, 
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `/products?page=${result.prevPage}&limit=${limitNumber}` : null,
            nextLink: result.hasNextPage ? `/products?page=${result.nextPage}&limit=${limitNumber}` : null
        });
    } catch (error) {
        console.error('Error en renderProducts:', error);
        res.status(500).send('Error rendering products');
    }
}

async function renderRegister(req, res) {
    res.render('register')
}

async function renderLogin(req, res) {
    res.render('login')
}

export{
    renderMain,
    renderChat,
    renderRealTimeProducts,
    renderCart,
    renderUser,
    renderProducts,
    renderRegister,
    renderLogin
}