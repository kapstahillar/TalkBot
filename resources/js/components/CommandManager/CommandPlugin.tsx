import React from 'react'

import Command from "./Command";
import CommandResultData from "./CommandResultData";

// Interface for command plugin
interface ICommandPlugin {

	// Command name to distinguish this command plugin
	readonly commandName: string;

	// Before executing command, say this...
	readonly waitingForResultString: string;

	// Keywords were planned to use on question parse, but i 
	// didnt have time for that. I'll still leave this here
	// bc might finish this later
	readonly commandKeywords: string[];	

	// Is this plugin initialised 
	isInitialised: boolean;

	// Called for initialissation of plugin
	init: () => void;

	// Asyncronous function
	executeCommand: (command: Command) => Promise<CommandResultData>;	
}

export default ICommandPlugin;