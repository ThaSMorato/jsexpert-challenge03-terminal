import { TableBase } from "./entity/TableBase.js";
import { TerminalBase } from "./entity/TerminalBase.js";

class CustomTerminal {
  constructor() {
    this.data = [];
    this.table = {};
    this.terminal = {};
  }

  initialize({ terminal = new TerminalBase(), table = new TableBase() }) {
    this.table = table;
    this.terminal = terminal;
    this.table.initialize(this.data);
  }

  closeTerminal() {
    this.terminal.close();
  }

  question(msg = "") {
    return this.terminal.question(msg);
  }

  updateTable(item) {
    this.data.push(item);
    this.table.print(this.data);
  }
}

export default CustomTerminal;
