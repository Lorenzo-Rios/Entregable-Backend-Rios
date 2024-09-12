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

export{
    renderMain,
    renderChat,
    renderRealTimeProducts,
    renderCart,
    renderUser
}