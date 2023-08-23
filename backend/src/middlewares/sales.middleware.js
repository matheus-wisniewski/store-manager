const { productsService } = require('../services');

const validateId = async (req, res, next) => {
  const searchId = req.body.some((searchSale) => !searchSale.productId);
  if (searchId) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  
  next();
};

const validateIdAtSingleReq = async (req, res, next) => {
  const sale = await Promise.all(
    req.body.map(({ productId }) => productsService.findById(productId)),
);
  if (sale.some((searchSale) => searchSale.status === 'NOT_FOUND')) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};

const validateQuantity = async (req, res, next) => {
  const searchQuantity = req.body.some((sale) => sale.quantity <= 0);
  if (req.body.some((sale) => !Object.keys(sale).includes('quantity'))) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  if (searchQuantity) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  
  next();
};

module.exports = {
  validateId,
  validateQuantity,
  validateIdAtSingleReq,
};