async function renderChat(req, res) {
    res.render('chat')
}

async function renderHome(req, res) {
    res.render('home')
}

async function renderRealTimeProducts(req, res) {
    res.render('realtimeproducts')
}

export{
    renderChat,
    renderHome,
    renderRealTimeProducts
}