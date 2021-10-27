import React, { Component } from "react";

type TalkBotInputProps = {     
	onTalkBotInputChanged: Function;
};
type TalkBotInputState = { 
	value: string;
};


class TalkBotInput extends Component<TalkBotInputProps, TalkBotInputState> {
	constructor(props : TalkBotInputProps) {
		super(props);    
		this.state = { value : "" };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);    
	}

	handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({value: event.target.value})         
	}

	handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {      
		this.props.onTalkBotInputChanged(this.state.value);
		event.preventDefault();           
	}

	render() {
		return ( 
			<form className="talkbot-inputform" onSubmit={this.handleSubmit}>
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<span className="input-group-text" id="basic-addon1">(:</span>
					</div>
					<input className="talkbot-input form-control" placeholder="Ask away..." type="text" 
						aria-label="Ask away..." value={this.state.value} onChange={this.handleChange} />
				</div> 
			</form>
		);
		}

	}

	export default TalkBotInput;