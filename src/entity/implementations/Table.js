import DraftLog from "draftlog";
import chalkTable from "chalk-table";
import terminalConfig from "../../config/terminal.js";

import { TableBase } from "../TableBase.js";

const TABLE_OPTIONS = terminalConfig.table;

class Table extends TableBase {
  constructor() {
    super();
    this.table = {};
  }

  initialize(data) {
    DraftLog(console).addLineListener(process.stdin);
    this.table = console.draft(this.#createTable(data));
  }

  #createTable(data) {
    return chalkTable(TABLE_OPTIONS, data);
  }

  print(data) {
    this.table(this.#createTable(data));
  }
}

export default new Table();
