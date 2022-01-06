import { describe, it, before, after } from "mocha";
import { expect } from "chai";

import CustomTerminal from "../../src/terminal.js";
import { tableMock, stubs as tableStubs } from "../mocks/TableMock.js";
import { terminalMock, stubs as terminalStubs } from "../mocks/TerminalMock.js";

describe("Terminal Suite Tests", () => {
  let terminal = {};

  before(() => {
    terminal = new CustomTerminal();
  });

  it("should start with table and terminal as empty object, data as empty array ", () => {
    console.log(terminal);
    expect(terminal.table).to.be.deep.equal({});
    expect(terminal.data).to.be.deep.equal([]);
    expect(terminal.terminal).to.be.deep.equal({});
  });

  it("should initialize all variables on initialize method", () => {
    terminal.initialize({
      terminal: terminalMock,
      table: tableMock,
    });

    expect(terminal.table).to.be.deep.equal(tableMock);
    expect(terminal.terminal).to.be.deep.equal(terminalMock);
    expect(tableStubs.initializeStub.called).to.be.true;
    expect(tableStubs.initializeStub.args[0][0]).to.be.deep.equal(terminal.data);
  });

  it("should push an item on the data with updateTable method", async () => {
    const content = "test content";

    terminal.updateTable(content);

    expect(terminal.data[0]).to.be.equal(content);
    expect(tableStubs.printStub.called).to.be.true;
    expect(tableStubs.printStub.args[0][0]).to.be.equal(terminal.data);
  });

  it("should call terminal.question method and receive an answer", async () => {
    const content = "question?";

    const expected = "answer";

    terminalStubs.questionStub.resolves(expected);

    const result = await terminal.question(content);

    expect(result).to.be.equal(expected);
    expect(terminalStubs.questionStub.called).to.be.true;
    expect(terminalStubs.questionStub.args[0][0]).to.be.equal(content);
  });

  it("should call terminal.close method on closeTerminal", () => {
    terminal.closeTerminal();

    expect(terminalStubs.closeStub.called).to.be.true;
  });
});
