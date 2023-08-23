const { productsModel } = require('../models');

const findAll = async () => {
  const products = await productsModel.findAll();

  return { status: 'SUCCESSFUL', data: products };
};

const findById = async (id) => {
  const product = await productsModel.findById(id);
  if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  
  return { status: 'SUCCESSFUL', data: product };
};

const insert = async (name) => {
  const newSale = await productsModel.insert(name);

  return { status: 'CREATED', data: newSale };
};

const update = async (id, name) => {
  const product = await productsModel.update(id, name);
  if (product.affectedRows === 0) return { data: { message: 'Product not found' } };

  return { status: 'SUCCESSFUL', data: { id, name } };
};

const deleteProduct = async (id) => {
  const validateProduct = await productsModel.findById(id);
  if (!validateProduct) return { type: 404, message: 'Product not found' };
  return productsModel.deleteProduct(id);
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
  deleteProduct,
};