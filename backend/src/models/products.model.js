// const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute('SELECT * FROM products');

  return products;
};

const findById = async (productId) => {
  const [[product]] = await connection.execute(`
  SELECT 
    * 
  FROM 
    products 
  WHERE 
    id = ? 
  ORDER BY 
    id`, [productId]);

  return product;
};

const insert = async (name) => {
  const [product] = await connection.execute(`
  INSERT INTO 
    products(name)
  VALUES
    (?);`, [name]);

  return {
    id: product.insertId,
    name,
  };
};

const update = async (id, name) => {
  const [result] = await connection.execute(
`
  UPDATE 
    products 
  SET 
    name = ? 
  WHERE 
    id = ?`,
    [name, id],
  );

  return result;
};

const deleteProduct = async (id) => {
  const [result] = await connection.execute(`
    DELETE FROM 
      products
    WHERE
      id = ?
  `, [id]);

  if (result) return true;
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
  deleteProduct,
};