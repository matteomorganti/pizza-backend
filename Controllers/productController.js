// products.controller.js
const Product = require("../Models/productModel");
const mongoose = require("mongoose");

/**
 * Get all products from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object to send the response.
 * @returns {Object} - JSON response containing all products or an error message.
 */
async function getAllProducts(req, res) {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
}

/**
 * Get products by category ID from the database.
 *
 * @param {Object} req - Express request object containing the category ID as a URL parameter.
 * @param {Object} res - Express response object to send the response.
 * @returns {Object} - JSON response containing products of the specified category or an error message.
 */
async function getProductsByCategory(req, res) {
  const categoryId = new mongoose.Types.ObjectId(req.params.categoryId);``
  try {
    const products = await Product.find({ categoryId });
    res.json(products);
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
}

/**
 * Get a product by its ID from the database.
 *
 * @param {Object} req - Express request object containing the product ID as a URL parameter.
 * @param {Object} res - Express response object to send the response.
 * @returns {Object} - JSON response containing the product data or an error message.
 */
async function getProductById(req, res) {
  const productId = req.params.productId;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * Get products by type from the database.
 *
 * @param {Object} req - Express request object containing the type as a URL parameter.
 * @param {Object} res - Express response object to send the response.
 * @returns {Object} - JSON response containing products of the specified type or an error message.
 */
async function getProductsByType(req, res) {
  const type = req.params.type;
  try {
    const products = await Product.find({ type });
    res.json(products);
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
}

/**
 * Get products by type and category ID from the database.
 *
 * @param {Object} req - Express request object containing the category ID and type as URL parameters.
 * @param {Object} res - Express response object to send the response.
 * @returns {Object} - JSON response containing products of the specified type and category or an error message.
 */
async function getProductsByTypeAndCategory(req, res) {
  const { categoryId, type } = req.params;
  try {
    const products = await Product.find({ categoryId, type });
    res.json(products);
  } catch (error) {
    res.status(404).json({ message: "Product not found" });
  }
}

/**
 * Create a new product.
 *
 * @param {Object} req - Express request object containing product data in the body.
 * @param {Object} res - Express response object to send the response.
 * @returns {Object} - JSON response containing the created product or an error message.
 */
async function createProduct(req, res) {
  const { name, price, ingredients, type, categoryId } = req.body;

  try {
    // Create a new product
    const product = await Product.create({
      name,
      price,
      ingredients,
      type,
      categoryId,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ message: "Failed to create product", error: error.message });
  }
}

/**
 * Update an existing product.
 *
 * @param {Object} req - Express request object containing product data in the body and product ID as a URL parameter.
 * @param {Object} res - Express response object to send the response.
 * @returns {Object} - JSON response containing the updated product or an error message.
 */
async function updateProduct(req, res) {
  const productId = req.params.productId;
  const { name, price, ingredients, type, categoryId } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        price,
        ingredients,
        type,
        categoryId,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

/**
 * Delete a product by its ID from the database.
 *
 * @param {Object} req - Express request object containing the product ID as a URL parameter.
 * @param {Object} res - Express response object to send the response.
 * @returns {Object} - JSON response containing a success message or an error message.
 */
async function deleteProductById(req, res) {
  const productId = req.params.productId;
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully", deletedProduct });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

module.exports = {
  getProductsByCategory,
  getProductById,
  getProductsByType,               // Aggiunta nuova funzione
  getProductsByTypeAndCategory,    // Aggiunta nuova funzione
  getAllProducts,   
  createProduct,
  updateProduct,                   // Aggiunta nuova funzione
  deleteProductById,               // Aggiunta nuova funzione
};

