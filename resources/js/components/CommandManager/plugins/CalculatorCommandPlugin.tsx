import ICommandPlugin from "../CommandPlugin";
import CommandResultData from "../CommandResultData";
import Command from "../Command";

// I have descided to use enum deciding between
// different operations. 
enum CalculatorOperator {
	Add = "+",
	Subtract = "-",
	Multiply = "*",
	Divide = "/",
}

type Calculation = {
	firstNumber : number;
	operator : CalculatorOperator;
	secondNumber : number;
};

// Calculator plugin can make arithmetical shifts like add and subtract
// This plugin uses only first parameter and that is in format
//
class CalculatorCommandPlugin implements ICommandPlugin {

	// Interface params
	commandName = "calculate";
	commandKeywords = ["add", "subtract", "multiply", "divide"];
	waitingForResultString = "Calculating...";

	// Class params
	isInitialised = false;	

	/////////////////////
	//  public methods
	/////////////////////

	// This does currently nothing.
	init = () => {}

	// Implementation of executeCommand function 
	// Validates command and returns command result object
	executeCommand = async(command: Command) => {
		if (this.validateCommand(command)) {
			const calculation: Calculation = this._parseCalculationStringIntoCalculation(command.params[0]);
			const calculaltionResult: number = this._calculate(calculation);			
			return {
				success : true,
				commandString : command.commandString,
				commandResultString: "Result to your calculation is: " + calculaltionResult.toString(),		
			}
		}		
		return {
			success : false,
			commandString : command.commandString ,
			commandResultString: "Even I didn't understand that calculation... And i'm a bot! Maybe " 
			+ " you forgot to insert some calculations or something?",		
		}
	}

	// Custom validation for this command
	// Checks if command has atleast one param and has one of 
	// the calculator symbols
  // Makes regex test on string
  validateCommand = (command: Command) => {
  	if (command.params.length > 0) {					
  		if (this._isInCalculationFormat(command.params[0])) {          
  			return true;					
  		}
  	}
  	return false;
  }

	/////////////////////
  //  private methods
  /////////////////////

	// Makes calculation, returns result of calculation
	private _calculate = (calculation: Calculation) => {
		switch (calculation.operator) {
			case CalculatorOperator.Add:
			return this._add(calculation.firstNumber, calculation.secondNumber);
			case CalculatorOperator.Subtract:
			return this._subtract(calculation.firstNumber, calculation.secondNumber);
			case CalculatorOperator.Divide:
			return this._divide(calculation.firstNumber, calculation.secondNumber);
			case CalculatorOperator.Multiply:
			return this._multiply(calculation.firstNumber, calculation.secondNumber);        
		}
	}

	// I really dont have to explain these
	private _add = (a: number, b:number) => {
		return a + b;
	}

	private _subtract = (a: number, b:number) => {
		return a - b;
	}

	private _divide = (a: number, b:number) => {
		return a / b;
	}

	private _multiply = (a: number, b:number) => {
		return a * b;
	}

	// Parses calculation string into a Calculation object and returns it	
  // Calculation is split into 3 parts, first number, second number and third number
  private _parseCalculationStringIntoCalculation = (calculationString: string) => {
  	if (calculationString != "") {
  		const operator: CalculatorOperator = this._getCalculatorOperatorFromString(calculationString);
  		const stringSplitResult: string [] = calculationString.split(operator);
  		if (stringSplitResult.length == 2) {
  			return {
  				firstNumber : parseFloat(stringSplitResult[0]),
  				operator : operator,
  				secondNumber : parseFloat(stringSplitResult[1]),
  			}
  		}	
  	}
  	return {
  		firstNumber : 0,
  		operator : CalculatorOperator.Add,
  		secondNumber : 0,
  	}
  }  

  // Tests regex if calculation is in right format for calculator
  // Valid format example: 231.12313*32.131
  // Allows +-*/ and supports points
  private _isInCalculationFormat = (calculationString: string) => {    
  	return /^-?\d{1,}(\.\d{1,})?[-+*\/]\d{1,}(\.\d{1,})?$/.test(calculationString);
  }

	// Returns Enum, maybe there is better way to create enum from string
	// but i have run out of time
	// Returns CalculatorOperator and defaults to CalculatorOperator.Add
	private _getCalculatorOperatorFromString = (calculationString: string) => {    
		if (calculationString.includes(CalculatorOperator.Add)) {
			return CalculatorOperator.Add;
		}
		else if (calculationString.includes(CalculatorOperator.Subtract)) {
			return CalculatorOperator.Subtract;
		}
		else if (calculationString.includes(CalculatorOperator.Divide)) {
			return CalculatorOperator.Divide;
		}
		else if (calculationString.includes(CalculatorOperator.Multiply)) {
			return CalculatorOperator.Multiply;
		}
		else {
			return CalculatorOperator.Add;
		}
	}
}

export default CalculatorCommandPlugin;