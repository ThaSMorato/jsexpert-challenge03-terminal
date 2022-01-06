import readline from "readline";

import { TerminalBase } from "../TerminalBase.js";

class Terminal extends TerminalBase {
  constructor() {
    super();
    this.terminal = {};
  }

  initialize() {
    this.terminal = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  async question(msg) {
    return new Promise((resolve) => this.terminal.question(msg, resolve));
  }

  close() {
    this.terminal.close();
  }
}

export default new Terminal();
