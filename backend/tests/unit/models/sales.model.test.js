const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');
const { allSalesFromDB } = require('../schemas/sales.mock');
const { findAll } = require('../../../src/models/sales.model');

describe('Testa as funções da camada model da entidade Sales', function () {
  it('Testa a função findAll', async function () {
    sinon.stub(connection, 'execute').resolves([allSalesFromDB]);
    const sales = await findAll();

    expect(sales).to.have.lengthOf(3);
    expect(sales).to.be.deep.equal(allSalesFromDB);
  });

  afterEach(function () {
      sinon.restore();
  });
});