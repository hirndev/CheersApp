const Order = require("../models/dbOrders");
const Menu = require("../models/dbMenu");

// @desc    Fetch all items on menu
// @route   POST /api/order/
// @access  Private
module.exports.newOrder = async (req, res) => {
  const order = req.body.order;
  const new_order = new Order();
  let total = 0;
  try {
    for (let item of order.order) {
      const menuItem = await Menu.findById(item.id);
      if (menuItem) {
        new_order.orderItems.push({ item: menuItem, quantity: item.quantity });
        total = total + menuItem.price * item.quantity;
      }
    }
    new_order.orderTotal = parseFloat(total);
    new_order.orderStatus = 0;
    new_order.paymentStatus = 1;
    new_order.author = req.user;
    const placedOrder = await new_order.save();
    res.json(placedOrder);
  } catch (e) {
    console.log("Error creating order", e);
  }
};
