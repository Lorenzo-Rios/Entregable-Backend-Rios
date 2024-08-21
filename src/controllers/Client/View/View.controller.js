async function renderMain(req, res) {
    res.render('main')
}

async function renderHome(req, res) {
    res.render('home')
}

async function renderChat(req, res) {
    res.render('chat')
}
async function renderRealTimeProducts(req, res) {
    res.render('realtimeproducts')
}


export{
    renderMain,
    renderHome,
    renderChat,
    renderRealTimeProducts
}