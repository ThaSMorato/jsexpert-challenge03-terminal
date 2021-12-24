import IncomeRepository from "./../repository/IncomeRepository.js";
import Income from "./../entity/Income.js";
import { currencies, currencies_languages } from "../config/currency.js";

class IncomeService {
  constructor({ incomeRepository } = {}) {
    this.incomeRepository = incomeRepository || new IncomeRepository();
  }

  static generateConversions = (expectation_value, request) => (acc, opt) => ({
    ...acc,
    [opt]: {
      currency: currencies.options[opt],
      value: expectation_value * request[currencies.options[opt]],
      language: currencies_languages.options[opt],
    },
  });

  async generateIncomeFromString(incomeString, delimiter = ";") {
    const [position, expectation_string] = incomeString.split(delimiter);

    const expectation_value = Number(expectation_string);

    if (position.length <= 0) {
      throw new Error(
        "Position is a required field. Please make sure you are providing a position."
      );
    }

    if (isNaN(expectation_value) || expectation_string.length <= 0) {
      throw new Error(
        "A valid Expectation is required. Please note that only numbers are allowed."
      );
    }

    const currencies_options = Object.keys(currencies.options);

    const request = await this.incomeRepository.getConversions();

    const generateConversionsFunction = IncomeService.generateConversions(
      expectation_value,
      request
    );

    const conversions = currencies_options.reduce(generateConversionsFunction, {});

    const expectation = {
      currency: currencies.expectation,
      value: expectation_value,
      language: currencies_languages.expectation,
    };

    const income = new Income({
      position,
      expectation,
      ...conversions,
    });

    return income;
  }
}

export default IncomeService;
