const sinon = require('sinon');
const chai = require('chai');

const { expect } = chai;
const sinonChai = require('sinon-chai');
const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');
const { oneSale, twoSales } = require('../schemas/sales.mock');

chai.use(sinonChai);

describe('Testa as funções da camada controller da entidade Sales', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Testa a função findAll', async function () {
      const { findAll } = salesController;
      sinon.stub(salesService, 'findAll').resolves({ status: 'SUCCESSFUL' });
      const resSintaxe = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      const reqSintaxe = {};
      await findAll(reqSintaxe, resSintaxe);

      expect(resSintaxe.status).to.have.been.calledWith(200);
    });

    it('Testa a função insert', async function () {
      const reqSintaxe = {
        body: twoSales,
      };
      const resSintaxe = {};
      resSintaxe.status = sinon.stub().returns(resSintaxe);
      resSintaxe.json = sinon.stub().returns();
      sinon.stub(salesService, 'insert').resolves(oneSale);
      await salesController.insert(reqSintaxe, resSintaxe);

      expect(resSintaxe.json).to.have.been.calledWith(oneSale);
    });

    it('Testa o retorno errado da função findAll', async function () {
      sinon.stub(salesService, 'findAll').resolves({ status: 'NOT_FOUND' });
  
      const req = {};
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
  
      await salesController.findAll(req, res);
      expect(res.status).to.have.been.calledWith(404);
    });
  });
