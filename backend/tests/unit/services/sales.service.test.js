const sinon = require('sinon');
const { expect } = require('chai');
const { salesService } = require('../../../src/services');
const { salesModel } = require('../../../src/models');
const { allSalesFromDB, twoSales } = require('../schemas/sales.mock');
const connection = require('../../../src/models/connection');

describe('Testa as funções da camada service da entidade Sales', function () {
  it('Testa a função findAll', async function () {
    const { findAll } = salesService;
    sinon.stub(salesModel, 'findAll').resolves(allSalesFromDB);
    const sales = await findAll();

    expect(sales.status).to.be.equal('SUCCESSFUL');
    expect(sales.data).to.be.deep.equal(allSalesFromDB);
    expect(sales.data).to.have.lengthOf(3);
  });

  it('Testa a função insert', async function () {
    const { insert } = salesService;
    sinon.stub(connection, 'execute').resolves([twoSales]);
    const salesConfirmation = await insert(twoSales);

    expect(salesConfirmation.itemsSold).to.be.an('Array');
    expect(salesConfirmation.itemsSold).to.be.deep.equal(twoSales);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});