import DraftLog from "draftlog";
import chalkTable from "chalk-table";
import readline from "readline";
import terminalConfig from "./config/terminal.js";

const TABLE_OPTIONS = terminalConfig.table;

class CustomTerminal {
  constructor() {
    this.print = {};
    this.data = [];
  }

  initialize() {
    DraftLog(console).addLineListener(process.stdin);

    this.terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.initializeTable();
  }

  initializeTable() {
    this.print = console.draft(this.createTable());
  }

  closeTerminal() {
    this.terminal.close();
  }

  question(msg = "") {
    return new Promise((resolve) => this.terminal.question(msg, resolve));
  }

  updateTable(item) {
    this.data.push(item);
    this.print(this.createTable());
  }

  createTable() {
    return chalkTable(TABLE_OPTIONS, this.data);
  }
}

export default CustomTerminal;
