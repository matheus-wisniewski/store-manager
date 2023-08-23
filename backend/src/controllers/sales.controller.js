const { salesService } = require('../services');

const findAll = async (_req, res) => {
  const { status, data } = await salesService.findAll();
  if (status === 'NOT_FOUND') {
    return res.status(404).json(data);
  }

  return res.status(200).json(data);
};

const findById = async (req, res) => {
  const { status, data } = await salesService.findById(req.params.id);
  if (status === 'NOT_FOUND') {
    return res.status(404).json(data);
  }

  return res.status(200).json(data);
};

const insert = async (req, res) => {
  const { body } = req;
  const newSale = await salesService.insert(body);

  return (res.status(201).json(newSale));
};

module.exports = {
  findAll,
  findById,
  insert,
};