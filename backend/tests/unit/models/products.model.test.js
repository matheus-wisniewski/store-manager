const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { allProductsFromDB, oneProductFromDB, newProductForDB } = require('../schemas/products.mock');
const { productsModel } = require('../../../src/models');

describe('Testa as funções da camada model da entidade Products', function () {
  it('Testa a função findAll', async function () {
    sinon.stub(connection, 'execute').resolves([allProductsFromDB]);
    const products = await productsModel.findAll();

    expect(products).to.have.lengthOf(3);
    expect(products).to.be.deep.equal(allProductsFromDB);
  });

  it('Testa a função findById', async function () {
    sinon.stub(connection, 'execute').resolves([oneProductFromDB]);
    const { id, name } = await productsModel.findById(1);

    expect(id).to.be.equal(1);
    expect(name).to.be.equal('Martelo de Thor');
  });

  it('Testa a função insert', async function () {
    sinon.stub(connection, 'execute').resolves([newProductForDB]);
    const { name } = await productsModel.insert('ProdutoX');

    expect(name).to.be.equal('ProdutoX');
  });

  it('Testa a função deleteProduct', async function () {
    sinon.stub(connection, 'execute').resolves([oneProductFromDB]);
    const deletedProduct = await productsModel.deleteProduct(1);

    expect(deletedProduct).to.be.equal(true);
  });

  afterEach(function () {
    sinon.restore();
  });
});