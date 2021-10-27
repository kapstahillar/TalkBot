import ICommandPlugin from "../CommandPlugin";
import CommandResultData from "../CommandResultData";
import Command from "../Command";

type Currency = {
	currencyTag: string; 
}

class CurrencyConverterCommandPlugin implements ICommandPlugin {

	// Interface params
	commandName = "convert";
	commandKeywords = ["how", "much", "is", "in"];
	waitingForResultString = "Converting...";	
	isInitialised = false;	

	/////////////////////
	//  public methods
	/////////////////////
		
	//Currently does nothing
	init = () => {		
		this.isInitialised = true;
	}

  	// Implementation of the executeCommand function 
	// Validates the command and returns a command result object
	// This command needs to have 3 parameters. The first one has to 
	// be in the number format and other ones have to be
	// in the Currency format.
	// The first Currency is accepted as the starting currency, the second one 
	// is accetped as result currency
	executeCommand = async(command: Command) => {
		if (!this.validateCommand(command)) {
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ paramsStringArray: command.params })
			};
			const response = await fetch('/api/currenyConvertionRequest/', requestOptions);
			const json = await response.json();				
			if (json.validationPassed) {
				return {
					success : true,
					commandString : command.commandString,
					commandResultString: command.params[0] + " " + command.params[1] 
							+ " is about " + json.convertedAmount + " in " + command.params[2];
				}
			}					
		}
		return {
			success : false,
			commandString : command.commandString,
			commandResultString: "I dont know how much money this is!",		
		}
	}

	// Roughly validates command before sending it to server.
	validateCommand = (command: Command) => {
		if (command.params.length == 2) { 
			if (typeof command.params[0] == "number" && 
				typeof command.params[1] == "string" &&
				typeof command.params[2] == "string") {
				return true;
			}
		}
		return false;
	}

	private _getAllCurrenciesFromServer = () => {

	}

	// Can add more complex logic to it
	private _validateCurrency = (stringCurrency: string) => {
		if (stringCurrency) {

		}
		return false;
	}

}

export default CurrencyConverterCommandPlugin;