const sinon = require('sinon');
const { expect } = require('chai');
const { validateName } = require('../../../src/middlewares/products.middleware');

describe('Testa o middleware que valida o input name', function () {
  it('Testa se o middleware retorna um erro caso o parâmetro não tenha, no mínimo, 5 caracteres', async function () {
    const expectedResponse = {};
    const reqSintaxe = { params: { id: 1 }, body: { name: 'Pro' } };
    const next = sinon.stub().returns();
    expectedResponse.status = sinon.stub().returns(expectedResponse);
    expectedResponse.json = sinon.stub().returns();
    await validateName(reqSintaxe, expectedResponse, next);

    expect(expectedResponse.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  });

  it('Testa se o middleware retorna um erro caso o parâmetro não tenha sido informado', async function () {
    const reqSintaxe = { body: {} };
    const expectedResponse = {};
    const next = sinon.stub().returns();
    expectedResponse.status = sinon.stub().returns(expectedResponse);
    expectedResponse.json = sinon.stub().returns();
    await validateName(reqSintaxe, expectedResponse, next);

    expect(expectedResponse.json).to.have.been.calledWith({ message: '"name" is required' });
  });
});