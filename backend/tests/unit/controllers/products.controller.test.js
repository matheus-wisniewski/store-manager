const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productsService } = require('../../../src/services');
const { allProductsFromDB } = require('../schemas/products.mock');
const { productsController } = require('../../../src/controllers');

const { expect } = chai;
chai.use(sinonChai);

describe('Testa as funções da camada controller da entidade Products', function () {
  it('Testa a função findAll', async function () {
    sinon.stub(productsService, 'findAll').resolves({ status: 'SUCCESSFUL', data: allProductsFromDB });
    const reqSintaxe = { params: {}, body: {} };
    const resSintaxe = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    await productsController.findAll(reqSintaxe, resSintaxe);
    
    expect(resSintaxe.status).to.have.been.calledWith(200);
    expect(resSintaxe.json).to.have.been.calledWith(allProductsFromDB);
  });

  afterEach(function () {
    sinon.restore();
  });
});