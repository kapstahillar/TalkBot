import React from "react";

// Command is used as command line command
type Command = {
  commandName: string;
  params: string[];
  commandString: string;
};

export default Command;