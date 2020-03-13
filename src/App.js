import React, { Component } from 'react';
import './App.css';
import Messages from "./Messages";
import Input from "./Input";
import logo from "./logo1.png";
import { store } from "./store";

class App extends Component {
  state = {
    messages: [],
    member: {
      username: store.get().member.usename,
      color: store.get().member.color,
    }
  }

  constructor() {
    super();
    this.drone = new window.Scaledrone("UJgIdHHVgMmbpWro", {
      data: this.state.member
    });
    console.log(store.get().member);
    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });
    const room = this.drone.subscribe("observable-room");
    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({member, text: data});
      this.setState({messages});
    });
  
  //working with store
  //create user ID by dispatch method
  store.dispatch('addID');
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div>
            <img className = "Header Logo" src={logo}></img>
          </div>
          
            <p className="Header ChatName">HELLO!</p>
            <p className="Header ChatName">World!</p>
            <p className="Header ChatName ChatNameTitle">Your chatName</p>
          
        </div>
        <Messages
          messages={store.get().messages}
          currentMember={store.get().member}
        />
        <Input
          onSendMessage={this.onSendMessage}
          onAdd={this.onAdd}
        />
      </div>
    );
  }

  onSendMessage = (message) => {
    console.log(message);
    this.drone.publish({
      room: "observable-room",
      message
    });
    console.log(this.drone);
  }
  onAdd = (messages1) => {
    store.dispatch('msAdd', messages1);
  }

}

export default App;