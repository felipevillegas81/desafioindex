import { Router } from 'express'
import productsDao from '../daos/dbManager/products.dao.js'
import cartsDao from '../daos/dbManager/carts.dao.js'

import productModel  from '../models/product.model.js'


const router = Router()

//Products
router.get('/', async (req, res) => {
    const { page } = req.query
    const { limit } = req.query
    const products = await productModel.paginate({}, { page: page || 1 , limit: limit || 2 });
    //const products = await productsDao.getAll()
    console.log(products)

    const carts = await cartsDao.getAll()
    res.render('index', 
    { title: 'Home', 
    products,
    carts })
})

router.get('/edit/:id', async (req, res) => {
    const product = await productsDao.getById(req.params.id)
    res.render('edit', { title: 'Edit', product })
})

router.get('/delete/:id', async (req, res) => {
    const product = await productsDao.delete(req.params.id)
    const products = await productsDao.getAll()
    res.render('index', { title: 'Home', products })
})

router.get('/carts/:cid', async (req, res) => {
    const cart = await cartsDao.getById(req.params.id)
    res.render('view', { title: 'View', cart })
})

export default router