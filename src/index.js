import "dotenv/config";

import CustomTerminal from "./terminal.js";
import IncomeService from "./service/IncomeService.js";

const VOCABULARY = {
  STOP: ":q",
};

const terminal = new CustomTerminal();
terminal.initialize();

const service = new IncomeService();

async function mainLoop() {
  console.info("🚀 Running...\n");
  try {
    // TODO: Looks like you have some work to do right here :)
  } catch (error) {
    // TODO: Don't forget of handling some errors beautifully ;)
  }
  return mainLoop();
}

await mainLoop();
