const UserCart = require("../Models/userCartModel");
const Product = require("../Models/productModel");

async function addToCart(req, res) {
  const productId = req.params.productId;
  const userId = req.user.id;

  try {
    const userCart = await UserCart.findOne({ user: userId });

    if (!userCart) {
      const newCart = new UserCart({
        user: userId,
        cart: [{ productId, quantity: 1 }],
      });
      await newCart.save();
      return res.json(newCart.cart);
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const cartItemIndex = userCart.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (cartItemIndex !== -1) {
      userCart.cart[cartItemIndex].quantity += 1;
    } else {
      userCart.cart.push({
        productId,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
    }

    await userCart.save();
    res.json(userCart.cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}


async function removeFromCart(req, res) {
  const productId = req.params.productId;
  const userId = req.user.id;

  try {
    const userCart = await UserCart.findOne({ user: userId });

    if (!userCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartItemIndex = userCart.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (cartItemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    userCart.cart.splice(cartItemIndex, 1);

    await userCart.save();
    res.json(userCart.cart);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getCartItems(req, res) {
  const allCartItems = await UserCart.find();
  return res.json(allCartItems);
}

module.exports = {
  addToCart,
  removeFromCart,
  getCartItems,
};
