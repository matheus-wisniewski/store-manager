const sinon = require('sinon');
const { expect } = require('chai');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { allProductsFromDB } = require('../schemas/products.mock');

describe('Testa as funções da camada service da entidade Products', function () {
  it('Testa a função findAll', async function () {
    sinon.stub(productsModel, 'findAll').resolves(allProductsFromDB);
    const products = await productsService.findAll();

    expect(products.status).to.be.equal('SUCCESSFUL');
    expect(products.data).to.have.lengthOf(3);
    expect(products.data).to.be.deep.equal(allProductsFromDB);
  });

  afterEach(function () {
    sinon.restore();
  });
});