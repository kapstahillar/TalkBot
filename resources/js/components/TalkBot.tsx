import React, { Component } from "react";

import CommandResultData from "./CommandManager/CommandResultData";
import CommandManager from './CommandManager/CommandManager' 
import TalkBotInput from './TalkBotInput'


type ListItem = {
  value: string;
}

type TalkBotState = {
  listItems : ListItem[];  
};

type TalkBotProps = {
};
 
class TalkBot extends Component<TalkBotProps, TalkBotState> {  

  // Starts with a greeting
  state: TalkBotState = { 
    listItems: [{
      "value": "Hello fellow. I'm here to chat with you!"
    }] 
  };

  private _commandManager: CommandManager | undefined;
  
  componentDidMount = () => {     
    this._commandManager = new CommandManager();    
    this._commandManager.onCommandFinishedCallback = this.onCommandFinished.bind(this);  
  }
  
  // Called when input changed
	onTalkBotInputChanged = (value: string) => {    
    if (this._commandManager !== undefined) {            
      if (!this._commandManager.processCommand(value)) {          
        this._addTalkRow("Didnt catch that! Come again please.");
      } 
    }		 
	}; 

  //Callback event when Command manager is finished with executing command
  onCommandFinished = (resultData: CommandResultData) => {           
    this._addTalkRow(resultData.commandResultString);      
  }; 

  //Adds new talk row to talkbot result container
  private _addTalkRow = (value: string) => {
    if (value == "") return;
    this.setState(state => ({ 
      listItems: [...this.state.listItems, {
        "value": value
      }]
    }));
  }

	render() {        
    const listItems = this.state.listItems.map(function (listItem: ListItem, index:number) {
        return <li className="talkbot-result-list-item" key={index}>{listItem.value}</li>
      }); 
    return (          
      <div className="talkbot center-screen">  
        <div className="talkbot-maincontainer">      
          <h1 className="talkbot-title"> Talk to me PLEASE </h1>
          <TalkBotInput onTalkBotInputChanged = {this.onTalkBotInputChanged}/>
          <div className="talkbot-result-container" >
            <ul className="talkbot-result-list">
              { listItems }       
            </ul>
          </div>
        </div>          
      </div>
    );
  }

}
 
export default TalkBot;