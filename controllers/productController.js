const path = require("path");
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../error");

const createProduct = async (req, res) => {
  req.body.user = req.user.userID;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products });
};

const getSingleProduct = async (req, res) => {
  const { id: productID } = req.params;

  const product = await Product.findOne({ _id: productID });

  if (!product) {
    throw new NotFoundError(`No product found with id: ${productID}`);
  }

  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
  const { id: productID } = req.params;

  const product = await Product.findOneAndUpdate({ _id: productID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new NotFoundError(`No product found with id: ${productID}`);
  }

  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const { id: productID } = req.params;

  const product = await Product.findOne({ _id: productID });

  if (!product) {
    throw new NotFoundError(`No product found with id: ${productID}`);
  }

  await product.delete();
  res.status(StatusCodes.OK).json({ msg: "Product deleted!!!!" });
};

const uploadImage = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError("No file uploaded");
  }

  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith("image")) {
    throw new BadRequestError("No image found");
  }

  const maxSize = 1024 * 1024;

  if (productImage.size > maxSize) {
    throw new BadRequestError("Please upload an image less than 1MB");
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );

  await productImage.mv(imagePath);
  res.send("upload images");
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
