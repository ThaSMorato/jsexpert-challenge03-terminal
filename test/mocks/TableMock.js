import Sinon from "sinon";
import { TableBase } from "../../src/entity/TableBase.js";

const tableMock = new TableBase();

const initializeStub = Sinon.stub(tableMock, tableMock.initialize.name);
const printStub = Sinon.stub(tableMock, tableMock.print.name);

const stubs = {
  initializeStub,
  printStub,
};

export { tableMock, stubs };
