const connection = require('./connection');

const findAll = async () => {
  const [sales] = await connection.execute(`
  SELECT 
    sale_id AS saleId, 
    date,
    product_id AS productId,
    quantity 
  FROM 
    sales_products
  JOIN 
    sales
  ON
    id = sale_id;`);

  return sales;
};

const findById = async (saleId) => {
  const [sale] = await connection.execute(`
  SELECT 
    date, 
    product_id AS productId, 
    quantity 
  FROM 
    sales 
  INNER JOIN 
    sales_products 
  ON 
    id = sale_id
  WHERE 
    id = ?`, [saleId]);

  return sale;
};

const insert = async (id, productId, quantity) => {
  await connection.execute(`
  INSERT INTO 
    sales_products(sale_id, product_id, quantity)
  VALUES
    (?, ?, ?);`, [id, productId, quantity]);
  
    return { productId, quantity };
  };

const salesInsert = async () => {
  const [headerResult] = await connection.execute(`
  INSERT INTO 
    sales()
  VALUES
    ();`);

  return (headerResult.insertId);
};

module.exports = {
  findAll,
  findById,
  salesInsert,
  insert,
};