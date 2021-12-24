import { describe, it, before, after } from "mocha";
import { expect } from "chai";

import { incomeRepositoryMock } from "../mocks/incomeRepository.mock.js";

import readline from "readline";

import CustomTerminal from "../../src/terminal.js";
import IncomeService from "../../src/service/IncomeService.js";

describe("IncomeService Suite Tests", () => {
  let terminal = {};

  before(() => {
    terminal = new CustomTerminal();
  });

  after(() => {
    terminal.closeTerminal();
  });

  it("should start with print as empty object, data as empty array and terminal as undefined", () => {
    expect(terminal.print).to.be.deep.equal({});
    expect(terminal.data).to.be.deep.equal([]);
    expect(terminal.terminal).to.be.undefined;
  });

  it("should initialize all variables on initialize method", () => {
    terminal.initialize();

    expect(typeof terminal.print).to.be.equal("function");
    expect(terminal.data).to.be.deep.equal([]);
    expect(terminal.terminal).to.be.instanceOf(readline.Interface);
  });

  it("should push an item on the data with updateTable method", async () => {
    const repository = incomeRepositoryMock;
    const service = new IncomeService({ incomeRepository: repository });
    const income = await service.generateIncomeFromString("Dev; 3500");

    terminal.updateTable(income.format());

    expect(terminal.data.length).to.be.equal(1);
  });
});
