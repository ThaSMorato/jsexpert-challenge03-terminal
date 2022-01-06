import "dotenv/config";

import CustomTerminal from "./terminal.js";
import IncomeService from "./service/IncomeService.js";
import { currencies } from "./config/currency.js";
import Terminal from "./entity/implementations/Terminal.js";
import Table from "./entity/implementations/Table.js";

const VOCABULARY = {
  STOP: ":q",
};

Terminal.initialize();

const terminal = new CustomTerminal();
terminal.initialize({
  terminal: Terminal,
  table: Table,
});

const service = new IncomeService();

async function mainLoop() {
  console.info("🚀 Running...\n");
  try {
    const answer = await terminal.question(
      `Qual seu cargo e pretensão salarial em ${currencies.expectation}:\nInsira: `
    );

    if (answer === VOCABULARY.STOP) {
      terminal.closeTerminal();
      console.log("Process finished!!");
      return;
    }

    const income = await service.generateIncomeFromString(answer);
    terminal.updateTable(income.format());
    return mainLoop();
  } catch (error) {
    console.error(`${error.message} Try again :D`);
  }
  return mainLoop();
}

await mainLoop();

const onStop = () => {
  terminal.closeTerminal();
  console.log("Process finished!!");

  //0 tudo certo / 1 erro
  process.exit(0);
};

["SIGTERM", "SIGINT"].forEach((event) => process.on(event, onStop));
