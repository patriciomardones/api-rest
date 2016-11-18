'use strict'

const Product = require('../models/product')

//function GET producto
function getProduct(req,res){
  let productId = req.params.productId

  Product.findById(productId, (err, product) =>{
    if (err) return res.status(500).send({message: 'Error al realizar petición.'})
    if (!product) return res.status(400).send({message: 'El producto no existe'})

    res.status(200).send({product})
  })
}

//function GET productos
function getProducts(req,res){
  Product.find({}, (err, products) =>{
    if(err)return res.status(500).send({message: 'Error al realizar petición.'})
    if (!products) return res.status(400).send({message: 'No existen productos'})

    res.status(200).send({products})
  })
}

//function POST producto
function saveProduct (req,res){
  console.log('POST /api/product')
  console.log(req.body)

  let product = new Product()
  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description

  product.save((err, productStored) =>{
    if(err) res.status(500).send({message: 'Error al guardar el producto.'})

    res.status(200).send({product: productStored})
  })
}

//function PUT producto
function updateProduct (req,res){
  let productId = req.params.productId
  let update = req.body

  Product.findByIdAndUpdate(productId, update, (err, productUpdated) =>{
    if(err) res.status(500).send({message: 'Error al actualizar el product'})

    res.status(200).send({product: productUpdated})
  })
}

//function DELETE producto
function deleteProduct (req,res){
  let productId = req.params.productId

  Product.findById(productId, (err, product)=>{
    if(err) res.status(500).send({message: 'Error al borrar el product'})

    product.remove(err =>{
      if(err) res.status(500).send({message: 'Error al borrar el product'})
      res.status(200).send({message: 'El producto ha sido eliminado'})

    })
  })
}

module.exports = {
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct
}
