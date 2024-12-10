import { productViewAdapter } from '../../../viewAdapters/productView/productView.adapter.js';
import { orderViewAdapter } from '../../../viewAdapters/orderView/orderView.adapter.js';
import { cartViewAdapter } from '../../../viewAdapters/cartView/cartView.adapter.js';
import { realTimeProductsViewAdapter } from '../../../viewAdapters/realTimeProductsView/realTimeProductsView.adapter.js';
import { chatViewAdapter } from '../../../viewAdapters/chatView/chatView.adapter.js';


async function renderProducts(req, res) {
    try {
        const { page = 1, limit = 10 } = req.query;
        const data = await productViewAdapter.getPaginatedProducts(page, limit);
        res.render('products', data);
    } catch (error) {
        console.error('Error en renderProducts:', error);
        res.status(500).send('Error rendering products');
    }
}

async function renderOrder(req, res) {
    try {
        const { page = 1, limit = 10 } = req.query;
        const data = await orderViewAdapter.getPaginatedOrders(page, limit);
        res.render('orders', data);
    } catch (error) {
        console.error('Error en renderOrder:', error);
        res.status(500).send('Error rendering orders');
    }
}

async function renderCart(req, res) {
    try {
        const  cid  = '66f7728452336cfd1dc02875' 
        const data = await cartViewAdapter.getCartView(cid);
        res.render('cart', data);
    } catch (error) {
        console.error('Error en renderCart:', error);
        res.status(500).send('Error al mostrar el carrito');
    }
}

async function renderRealTimeProducts(req, res) {
    try {
        const data = await realTimeProductsViewAdapter.getRealTimeProducts();
        res.render('realtimeproducts', data);
    } catch (error) {
        console.error('Error en renderRealTimeProducts:', error);
        res.status(500).send('Error rendering realtime products');
    }
}

async function renderMain(req, res) {
    res.render(
        'main'
    )
}

async function renderRegister(req, res) {
    res.render(
        'register'
    )
}

async function renderLogin(req, res) {
    res.render(
        'login'
    )
}

async function renderChangePass(req, res) {
    res.render(
        'changepass'
    )
}

async function renderChat(req, res) {
    try {
        const data = await chatViewAdapter.getChatMessages();
        res.render('chat', data);
    } catch (error) {
        console.error('Error en renderChat:', error);
        res.status(500).send('Error rendering chat');
    }
}

export {
    renderProducts,
    renderOrder,
    renderCart,
    renderRealTimeProducts,
    renderChat,
    renderMain,
    renderChangePass,
    renderLogin,
    renderRegister
};