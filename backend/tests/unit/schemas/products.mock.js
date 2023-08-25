const allProductsFromDB = [ 
{
  id: 1,
  name: 'Martelo de Thor',
},
{
  id: 2,
  name: 'Traje de encolhimento',
},
{
  id: 3,
  name: 'Escudo do CapitÃ£o AmÃ©rica',
},
];

const oneProductFromDB = [
  { 
    id: 1, 
    name: 'Martelo de Thor', 
  },
];

const newProductForDB = [
  {
    id: 1323,
    name: 'ProdutoX',
  },
];

const productFromServiceNotFound = {
  status: 'NOT_FOUND',
  data: { message: 'message' },
};

const productServiceCreated = {
  status: 'CREATED',
  data: newProductForDB,
};

module.exports = {
  allProductsFromDB,
  oneProductFromDB,
  newProductForDB,
  productFromServiceNotFound,
  productServiceCreated,
};