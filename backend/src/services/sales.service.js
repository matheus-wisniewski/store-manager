const { salesModel } = require('../models');

const findAll = async () => {
  const sales = await salesModel.findAll();

  return { status: 'SUCCESSFUL', data: sales };
};

const findById = async (id) => {
  const sale = await salesModel.findById(id);
  if (!sale) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  
  return { status: 'SUCCESSFUL', data: sale };
};

const insert = async (sales) => {
  const id = await salesModel.salesInsert();
  const newSale = await Promise.all(
    sales.map((sale) => salesModel.insert(id, sale.productId, sale.quantity)),
);

  return { id, itemsSold: newSale };
};

module.exports = {
  findAll,
  findById,
  insert,
};