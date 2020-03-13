import {Component} from "react";
import React from "react";
import { store } from "./store";
import { connectStoreon } from 'storeon/react';

class Messages extends Component {
  render() {
    store.on('@dispatch', (state, [event, data]) => {
      // console.log(`Storeon: ${ event } with `, data, state)
      const a = {...state};
      a.currentMember = a.member;
      delete a.member;
      console.log(a);
      this.props = {...a};
      this.render(); 
    })
    const {messages} = this.props;
    return (
      <ul className="Messages-list">
        {messages.map(m => this.renderMessage(m))}
      </ul>
    );
  }

  renderMessage(message) {
    console.log(message);
    const {member, text} = message;
    const {currentMember} = this.props;
    const messageFromMe = member.id === currentMember.id;
    const className = messageFromMe ?
      "Messages-message currentMember" : "Messages-message";
    return (
      <li className={className}>
      <span
        className="avatar"
        style={{backgroundColor: member.clientData.color}}
      />
        <div className="Message-content">
          <div className="username">
            {member.clientData.username}
          </div>
          <div className="text">{text}</div>
        </div>
      </li>
    );
  }
}

export default Messages;
//export default connectStoreon('messages', Messages);