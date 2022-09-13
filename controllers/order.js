const Order = require("../models/Order");
const errorHandler = require("../utils/errorHandler");

//locallhost:5000/api/order?offset=2&limit=5  get method
module.exports.getAll = async function (req, res) {
  debugger;
  const query = {
    user: req.id,
  };
  if (req.query.start) {
    query.date = {
      $gte: req.query.start, // >=
    };
  }

  if (req.query.end) {
    if (!query.date) {
      query.date = {};
    }
    query.date["$lte"] = req.query.end; //<=
  }

  if (req.query.order) {
    query.order = +req.query.order;
  }

  try {
    const orders = await Order.find(query)
      .sort({ date: -1 })
      .skip(+req.query.offset)
      .limit(+req.query.limit);
  } catch (e) {
    errorHandler(res, e);
  }
};
module.exports.create = async function (req, res) {
  try {
    const lastOrder = await Order.findOne({ user: req.user.id }).sort({ date: -1 });

    const maxOrder = lastOrder ? lastOrder.order : 0;

    const order = await new Order({
      list: req.body.list,
      user: req.user.id,
      order: maxOrder + 1,
    }).save();

    res.status(201).json(order);
  } catch (e) {
    errorHandler(res, e);
  }
};
