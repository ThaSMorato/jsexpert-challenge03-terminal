import chalk from "chalk";
import { currencies } from "./currency.js";

// @TODO: Any guesses about what's missing?
export default {
  table: {
    leftPad: 2,
    columns: [
      { field: "position", name: chalk.cyan("Position") },
      {
        field: "expectation",
        name: chalk.magenta(`Expectation ${currencies.expectation}`),
      },
      { field: "conversion01", name: chalk.green(currencies.options.conversion01) },
      { field: "conversion02", name: chalk.red(currencies.options.conversion02) },
      { field: "conversion03", name: chalk.white(currencies.options.conversion03) },
    ],
  },
};
