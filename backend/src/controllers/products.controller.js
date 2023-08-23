const { productsService } = require('../services');

const findAll = async (_req, res) => {
  const { status, data } = await productsService.findAll();
  if (status === 'NOT_FOUND') return res.status(404).json({ message: data });

  return res.status(200).json(data);
};

const findById = async (req, res) => {
  const { status, data } = await productsService.findById(req.params.id);
  if (status === 'NOT_FOUND') return res.status(404).json(data);

  return res.status(200).json(data);
};

const insert = async (req, res) => {
  const { data } = await productsService.insert(req.body.name);

  return res.status(201).json(data);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { data } = await productsService.update(Number(id), name);
  if (data.message) return res.status(404).json({ message: data.message });

  return res.status(200).json(data);
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  const { type, message } = await productsService.deleteProduct(id);
  if (type) return next({ type, message });
  return res.status(204).json();
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
  deleteProduct,
};