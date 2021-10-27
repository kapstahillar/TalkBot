import Command from "./Command";
import CommandResultData from "./CommandResultData"

import ICommandPlugin from "./CommandPlugin"
import CurrencyConverterCommandPlugin from "./plugins/CurrencyConverterCommandPlugin"
import CalculatorCommandPlugin from "./plugins/CalculatorCommandPlugin"

// All used plugins has to be listed here.
type PluginComponents = (typeof CurrencyConverterCommandPlugin | typeof CalculatorCommandPlugin); 

class CommandManager {
	
  // TalkBot uses plugins class list to instantiate plugins
  // that this TalkBot uses for the communication.
  // This makes TalkBot scalable, by adding plugins
  // or config this bot to talk about different subjects
  // 
  // TODO: Add more plugins
  plugins : (PluginComponents)[] = [
  CalculatorCommandPlugin,     
  CurrencyConverterCommandPlugin,
    //CourtesiesCommandPlugin, 
    //WeatherCommandPlugin,
    //TranslatorCommandPlugin,
    //TimeZoneCommandPlugin,
    //TravelGuideCommandPlugin
    ];

  // Called when command has finished execution. Bind this in owner
  onCommandFinishedCallback: (resultData: CommandResultData) => void;

  // This is set true after plugin instances are created
  private _pluginsInitialised : boolean = false;

  //List of plugin instances that are used with TalkBot
  private _pluginInstances : ICommandPlugin[];

  /////////////////////
  //  public methods
  /////////////////////

  constructor() {    
  	this._pluginInstances = [];    
  	this._initialisePlugins();
  }
  
  processCommand = (commandString: string)  => {		
  	return this._validateCommandStringAndExecuteCommand(commandString);
  }  

  onCommandFailed = (errorString: string) => {    
  	this._onCommandFinished({
  		success: false,
  		commandString : "",
  		commandResultString: errorString
  	});           
  }

  /////////////////////
  //  private methods
  /////////////////////

  // Called when command finished executing. Broadcasts result
  private _onCommandFinished = (resultData: CommandResultData) => {   
  	this.onCommandFinishedCallback(resultData);    
  }

  private _simpleResponse = (responseString: string) => {
  	this._onCommandFinished({
  		success: false,
  		commandString : "",
  		commandResultString: responseString
  	});    
  }
  
  // initialises plugins by making them into an instances
  private _initialisePlugins = () => {
  	for (var i = this.plugins.length - 1; i >= 0; i--) {   
  		let plugin: ICommandPlugin = new (this.plugins[i]);                 
  		this._pluginInstances.push(plugin);
  		plugin.init();
  	}
  	this._pluginsInitialised = true;
  }

  // Validates the command string and checks whether its a command or a question
  // If its a command then executes the command 
  // If its a question then it parses the question into a command and executes it
  private _validateCommandStringAndExecuteCommand = (commandString: string) => {    
  	if (this._isValidCommandString(commandString)) {      
  		const commandToByExecuted: Command = this._parseCommandStringToCommand(commandString);
  		this._executeCommand(commandToByExecuted);            
  	}
  	else if (this._isValidQuestionString(commandString)) {
      // parse question by keywords to command format
      // execute command this._executeCommand(commandToByExecuted);     
    }
    return true;
  } 

  private _isValidCommand = (commandName: string) => {
  	return this._hasPluginWithCommandName(commandName);    
  }  

  private _isValidQuestionString = (commandString: string) => {
  	return (commandString != "" && !commandString.startsWith("/"));
  }

  private _isValidCommandString = (commandString: string) => {
  	if (commandString == "" || commandString.startsWith("/")) {
  		const slicedCommand: string [] = commandString.split(" ");
  		if (commandString == "/" || commandString == "/help") { 
  			return true; 
  		}
  		return (slicedCommand.length > 0);   
  	}
  	else {
  		return false;
  	}    
  }

  private _hasPluginWithCommandName = (commandName: string) => { 
  	for (var i = this._pluginInstances.length - 1; i >= 0; i--) {      
  		if (this._pluginInstances[i].commandName.toLowerCase() == commandName.toLowerCase()) {
  			return true;
  		} 
  	}           
  	return false;
  }

  private _getPluginWithCommandName = (commandName: string) => { 
  	for (var i = this._pluginInstances.length - 1; i >= 0; i--) {      
  		if (this._pluginInstances[i].commandName.toLowerCase() == commandName.toLowerCase()) {
  			return this._pluginInstances[i];
  		} 
  	}           
  	return undefined;
  }
  
  // Validates command and executes it. 
  // Retrieves plugin with commandName and sends the command
  // for execution in CommandPlugin
  // The command is executed asynchronosly. Before starting call, 
  // sends client back waitingForResultString of a pluginInstance. 
  // Sends the result onCommandFinished function
  // This code is getting too long, needs clean up
  private _executeCommand = (command: Command) => {    
  	if (this._isValidCommand(command.commandName)) {
  		const pluginInstance: ICommandPlugin | undefined = 
  		this._getPluginWithCommandName(command.commandName);      
  		if (pluginInstance !== undefined) {        
  			this._simpleResponse(pluginInstance.waitingForResultString);
				const executeCommandAsync = async (command: Command): Promise<CommandResultData> => {                
  				const data: CommandResultData = await pluginInstance.executeCommand(command);
  				this._onCommandFinished(data);          
  				return data;
  			} 
  			executeCommandAsync(command);
  		}
  		else {
  			this.onCommandFailed("I think i broke!");
  		}      
  	} 
  	else {
  		this.onCommandFailed("There is no command like that!");
  	}
  }

  // Takes in command string and returns back Command object.
  // Slices command to seperate parts. First part is commandName
  // other parts are command arguments.
  // Saves final command string to Command Object for debbuging
  private _parseCommandStringToCommand = (commandString: string) => {
  	const slicedCommands: string[] = commandString.split(" ");
  	let commandName: string;
  	if (slicedCommands.length > 1) {    
  		const commandNameUndef: string | undefined = slicedCommands.shift();
  		commandName = (commandNameUndef !== undefined) ? commandNameUndef : "";
  	}
  	else {
  		commandName = slicedCommands[0];
  		slicedCommands.shift();
  	}     
  	commandName = commandName.replace("/", ""); 
  	const params: string [] = slicedCommands;
  	console.log(params)
  	return { 
  		commandName: commandName,
  		params: slicedCommands,
  		commandString: commandString
  	}
  }
} 
export default CommandManager; 
