const Order = require("../models/dbOrders");
const User = require("../models/dbUsers");
const Menu = require("../models/dbMenu");

// @desc    Fetch all items on menu
// @route   GET /api/order/
// @access  Private
module.exports.getOrders = async (req, res) => {
  if (req.user) {
    const curUserOrder = await User.findById(req.user._id).populate({
      path: "orderHistory",
      populate: {
        path: "orderItems.item",
      },
      options: { sort: { _id: -1 }, limit: 25 },
    });
    const curUserOrderHistory = curUserOrder.orderHistory;
    res.json(curUserOrderHistory);
  }
  // Need to add pagination with populate to fetch more than 25 orders
};

// @desc    Fetch all items on menu
// @route   POST /api/order/new
// @access  Private
module.exports.newOrder = async (req, res) => {
  // ORDER SIDE
  const order = req.body.order;
  const new_order = new Order();
  let total = 0;
  for (let item of order.order) {
    const menuItem = await Menu.findById(item.id);
    if (menuItem && menuItem.outofstock === false) {
      new_order.orderItems.push({
        item: menuItem,
        quantity: item.quantity,
      });
      total = total + menuItem.price * item.quantity;
    } else {
      return res.send(
        "One of the items in your order is unavailable: " + menuItem.title
      );
    }
    new_order.tableNo = req.body.order.tableNo;
    new_order.orderTotal = parseFloat(total);
    new_order.orderStatus = 0;
    new_order.paymentStatus = 1;
    new_order.author = req.user._id;
    // USER SIDE ORDER HISTORY
    const curUserOrder = await User.findById(req.user._id);
    curUserOrder.orderHistory.push(new_order);
    // SAVE BOTH
    const placedOrder = await new_order.save();
    await curUserOrder.save();
    // res.json(placedOrder);
    res.send("Order has been placed.");
  }
};

// @desc    Fetch all items on menu
// @route   GET /api/order/new
// @access  ADMIN
module.exports.pendingOrders = async (req, res) => {
  const allPendingOrders = await Order.find({ orderStatus: false })
    .populate({
      path: "orderItems.item",
    })
    .populate({
      path: "author",
      select: "firstName lastName email phoneNumber",
    })
    .sort({ _id: -1 });
  res.json(allPendingOrders);
};

// @desc    Fetch all items on menu
// @route   POST /api/order/accept
// @access  ADMIN
module.exports.acceptOrder = async (req, res) => {
  const id = req.body.id;
  const acceptedOrder = await Order.findByIdAndUpdate(id, {
    orderStatus: true,
  });
  res.send("Order has been marked as fulfilled.");
};

// @desc    Fetch all items on menu
// @route   GET /api/order/allorders/:date
// @access  MANAGEMENT
module.exports.showAllOrders = async (req, res) => {
  const dateOrders = new Date(req.params.date);
  const allOrders = await Order.find({
    orderStatus: true,
    createdAt: {
      $gte: dateOrders.setHours(0, 0, 0, 0),
      $lt: dateOrders.setHours(23, 59, 59, 999),
    },
  })
    .populate({
      path: "orderItems.item",
    })
    .populate({
      path: "author",
      select: "firstName lastName email phoneNumber",
    })
    .sort({ _id: -1 });
  res.json(allOrders);
};

// @desc    Fetch all items on menu
// @route   POST /api/order/chart/:date
// @access  MANAGEMENT
module.exports.chart = async (req, res) => {
  const dateOrders = new Date();
  const allOrders = await Order.find({
    orderStatus: true,
    createdAt: {
      $gte: dateOrders.setDate(dateOrders.getDate() - 7),
    },
  }).select("orderTotal");
  res.json(allOrders);
};
