import { Router } from 'express'

const router = Router()

router.get('/setcookie', (req, res) => {
    res.cookie('coderCookie', 'Esta cookie es muy poderosa', { maxAge: 100000 }).send('set cookie')
})

router.get('/getcookie', (req, res) => {
    console.log(req.cookies)
    res.send(req.cookies)
})

export default router