const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { 
  validateId, validateQuantity, validateIdAtSingleReq,
} = require('../../../src/middlewares/sales.middleware');
const { productsService } = require('../../../src/services');

const { expect } = chai;
chai.use(sinonChai);

describe('Testa os middlewares da entidade sales', function () {
  it('Verifica se o middleware retorna a mensagem correta ao não receber o parâmetro id', async function () {
    const req = { body: [{ quantity: 5 }] };
    const res = {};
    const next = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await validateId(req, res, next);

    expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
  });

  it('Verifica se o middleware retorna a mensagem correta ao não receber o parâmetro quantity', async function () {
    const req = { body: [{ productId: 5 }] };
    const res = {};
    const next = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await validateQuantity(req, res, next);

    expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
  });

  it('Verifica se o middleware retorna a mensagem correta ao receber o parâmetro quantity errado', async function () {
    const req = {
      body: [{ productId: 5, quantity: 0 }],
    };
    const res = {};
    const next = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await validateQuantity(req, res, next);

    expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1' });
  });

  it('Verifica se o middleware retorna a mensagem correta ao não encontrar o produto vendido', async function () {
    const res = {};
    const req = {
      body: [{ productId: 500, quantity: 0 }],
    };
    sinon.stub(productsService, 'findById').resolves({ status: 'NOT_FOUND', id: req.body.productId });
    const next = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    await validateIdAtSingleReq(req, res, next);

    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
});