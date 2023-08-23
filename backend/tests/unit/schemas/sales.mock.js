const allSalesFromDB = [
  {
    saleId: 1,
    date: '2023-06-29T17:47:58.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2023-06-29T17:47:58.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2023-06-29T17:47:58.000Z',
    productId: 3,
    quantity: 15,
  },
];

const oneSale = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

const twoSales = [
  {
    productId: 1,
    quantity: 1,
  },

  {
    productId: 2,
    quantity: 5,
  },

];

module.exports = {
  allSalesFromDB,
  oneSale,
  twoSales,
};