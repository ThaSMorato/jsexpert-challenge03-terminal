import Sinon from "sinon";
import { TerminalBase } from "../../src/entity/TerminalBase.js";

const terminalMock = new TerminalBase();

const initializeStub = Sinon.stub(terminalMock, terminalMock.initialize.name);
const questionStub = Sinon.stub(terminalMock, terminalMock.question.name);
const closeStub = Sinon.stub(terminalMock, terminalMock.close.name);

const stubs = {
  initializeStub,
  questionStub,
  closeStub,
};

export { terminalMock, stubs };
