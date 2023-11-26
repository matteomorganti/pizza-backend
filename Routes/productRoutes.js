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

// Route to create a new product
router.post("/add", productsController.createProduct);

// Route to delete a specific product by ID
router.delete("/id/:productId", productsController.deleteProductById);

// Route to update a specific product by ID
router.put("/id/:productId", productsController.updateProduct);

module.exports = router;
