const createOrder = async (req, res) => {
  res.send("create order");
};

const getAllOrders = async (req, res) => {
  res.send("get all orders");
};

const showCurrentUserOrder = async (req, res) => {
  res.send("show current user order");
};

const getSingleOrder = async (req, res) => {
  res.send("get single order");
};

const updateOrder = async (req, res) => {
  res.send("update order");
};

module.exports = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  showCurrentUserOrder,
};
