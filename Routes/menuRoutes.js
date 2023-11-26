const express = require("express");
const router = express.Router();
const productsController = require("../Controllers/productController");

// Route to get all products
router.get("/", productsController.getAllProducts);

// Route to get products by category ID
router.get("/category/:categoryId", productsController.getProductsByCategory);

// Route to get products by category ID and type
router.get("/category/:categoryId/type/:type", productsController.getProductsByTypeAndCategory);

// Route to get products by type
router.get("/type/:type", productsController.getProductsByType);

// Route to get a specific product by ID
router.get("/id/:productId", productsController.getProductById);

module.exports = router;