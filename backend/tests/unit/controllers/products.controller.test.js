const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productsService } = require('../../../src/services');
const { allProductsFromDB, productFromServiceNotFound, productServiceCreated, oneProductFromDB } = require('../schemas/products.mock');
const { productsController } = require('../../../src/controllers');

const { expect } = chai;
chai.use(sinonChai);

describe('Testa as funções da camada controller da entidade Products', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Testa a função findAll', async function () {
    sinon.stub(productsService, 'findAll').resolves({ status: 'SUCCESSFUL', data: allProductsFromDB });
    const reqSintaxe = { params: {}, body: {} };
    const resSintaxe = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    await productsController.findAll(reqSintaxe, resSintaxe);
    
    expect(resSintaxe.status).to.have.been.calledWith(200);
    expect(resSintaxe.json).to.have.been.calledWith(allProductsFromDB);
  });

  it('Testa o retorno errado da função findAll', async function () {
    sinon.stub(productsService, 'findAll').resolves(productFromServiceNotFound);

    const req = { params: {}, body: {} };
    const res = { status: sinon.stub().returnsThis('NOT_FOUND'), json: sinon.stub() };

    await productsController.findAll(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
  });

  it('Testa a função findById', async function () {
    sinon.stub(productsService, 'findById').resolves(productServiceCreated);

    const req = { params: { id: 1 } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };

    await productsController.findById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(oneProductFromDB);
  });
});