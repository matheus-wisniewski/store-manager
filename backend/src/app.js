const express = require('express');
const { productsModel, salesModel } = require('./models');
const { validateName, validateProductId } = require('./middlewares/products.middleware');
const { 
  validateId, validateIdAtSingleReq, validateQuantity,
} = require('./middlewares/sales.middleware');
const { salesController, productsController } = require('./controllers');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

// products
app.get('/products', async (_req, res) => {
  const products = await productsModel.findAll();

  return res.status(200).json(products);
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const products = await productsModel.findById(id);
  if (!products) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json(products);
});

app.post('/products', validateName, async (req, res) => {
  const { name } = req.body;
  const newProduct = await productsModel.insert(name);

  return res.status(201).json(newProduct);
});

app.put('/products/:id', validateName, productsController.update);

app.delete('/products/:id', validateProductId, productsController.deleteProduct);

// sales
app.get('/sales', salesController.findAll);

app.get('/sales/:id', async (req, res) => {
  const { id } = req.params;
  const sale = await salesModel.findById(id);
  if (!sale || sale.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  
  return res.status(200).json(sale);
});

app.post('/sales', validateId, validateQuantity, validateIdAtSingleReq, salesController.insert);

module.exports = app;
