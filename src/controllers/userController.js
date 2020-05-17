const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const Category = require("../models/categoryModel");
const Product = require("../models/productModel");
const Order = require('../models/orderModel')

// TODO estrarre parte di generazione token e hash password, queste sono solo prove

exports.get_user = async (req, res) => {
    const { name, email } = req.user
    res.status(200).send({ name, email })
}

exports.get_user_orders = async (req, res) => {
    try {
        const user = req.user
        const userOrders = await Order.find({ userId: user._id })
        res.status(200).send(userOrders)
    } catch (error) {
        res.status(400).send({ description: error.message })
    }
}

exports.delete_user = async (req, res) => {
    // TODO
}

exports.add_product_to_cart = async (req, res) => {
    try {
        const user = req.user
        const { productId } = req.body
        // controllare se prodotto esiste
        const product = await Product.findById(productId)
        if (product) {
            await user.addProductToCart(product)
            res.status(200).send({ desription: `product added` })
        } else {
            res.status(404).send({ description: 'Product not found' })
        }
    } catch (e) {
        console.log(e)
        res.status(400).send({ description: 'Error adding product to cart' })
    }
}

exports.delete_product_from_cart = async (req, res) => {
    try {
        const user = req.user
        const productId = req.params.productId
        user.cart = user.cart.filter(product => {
            return product._id != productId
        })
        await user.save()
        res.status(200).send({ desription: 'product removed from cart' })
    } catch (error) {
        res.status(400).send({ description: 'Error deleting cart product' })
    }
}

exports.update_cart_product = async (req, res) => {

}


exports.get_user_cart_products = async (req, res) => {
    try {
        const user = req.user
        res.status(200).send(user.cart)
    } catch (e) {
        console.log(e)
        res.status(400).send({ description: 'Error adding product to cart' })
    }
}







