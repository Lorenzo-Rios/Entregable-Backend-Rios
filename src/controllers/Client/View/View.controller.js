import axios from 'axios';

async function renderMain(req, res) {
    res.render('main')
}

async function renderChat(req, res) {
    res.render('chat')
}
async function renderRealTimeProducts(req, res) {
    res.render('realtimeproducts')
}

async function renderCart( req, res ) {
    res.render('cart')
}

async function renderUser( req, res ) {
    res.render('user')
}

async function renderProducts(req, res) {
    try {
        const { page = 1, limit = 10 } = req.query;
        const response = await axios.get(`http://localhost:8080/api/product`, {
            params: { page, limit }
        });

        const result = response.data;

        res.render('products', {
            products: result.payload,
            totalPages: result.totalPages,
            currentPage: result.currentPage, 
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.prevLink,
            nextLink: result.nextLink
        });
    } catch (error) {
        console.error('Error en renderProducts:', error);
        res.status(500).send('Error rendering products');
    }
}

export{
    renderMain,
    renderChat,
    renderRealTimeProducts,
    renderCart,
    renderUser,
    renderProducts
}