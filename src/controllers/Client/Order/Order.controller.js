import { orderModel } from '../../../models/order.model.js'

async function GetOrder ( req, res ) {
        let limit;
        let page;
    try {
        const orders = await orderModel.paginate({}, {page: 1, limit: 10})
        res.send({ status: 'success', payload: orders })
    } catch (error) {
        console.error('Error en GetOrder:', error);
        res.status(500).send('Error fetching Orders');
    }
}

async function PostOrder(req, res) {
    const { cartId } = req.body;

    try {
        const cart = await cartModel.findById(cartId).populate('products.product');
        if (!cart || cart.products.length === 0) {
            return res.status(400).json({ message: 'Cart is empty or not found' });
        }

        // Crear la orden
        const order = new orderModel({
            cartId,
            products: cart.products,
            total: cart.products.reduce((total, p) => total + p.product.price * p.quantity, 0),
            date: new Date(),
        });

        await order.save();

        // Vaciar el carrito después de la orden
        cart.products = [];
        await cart.save();

        return res.status(200).json({ message: 'Orden generada con exito!', order });
    } catch (err) {
        return res.status(500).json({ message: 'Error al generar la orden!' });
    }
}

async function PutOrder ( req, res ) {
    try {
        const { oid } = req.params

        let orderToReplace = req.body

        if (!orderToReplace.name || !orderToReplace.price || !orderToReplace.quantity ){
            return res.status(400).send({ status: 'error', error: 'Faltan completar los campos requeridos!'})
        }

        const response = await orderModel.updateOne({ _id: oid })
        res.status(200).send({ status: 'success', message: 'Orden actualizada con exito!', data: response })
    } catch (error) {
        console.error('Error en PutOrder:', error);
        res.status(500).send('Error puting Order');
    }
}

async function DeleteOrder ( req, res ) {
    try {
        const { oid } = req.params

        const response = await orderModel.deleteOne({ _id: oid })

        res.status(200).send({ status: 'success', message: 'Orden borrada con exito!', data: response })
    } catch (error) {
        console.error('Error en DeleteOrder:', error);
        res.status(500).send('Error deleting order');
    }
}

export {
    GetOrder,
    PostOrder,
    PutOrder,
    DeleteOrder
}