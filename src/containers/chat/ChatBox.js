import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';

class ChatBox extends Component {

  checkSubmit = (e) => {
    if (e.key === 'Enter') {
      const text = e.target.value
      e.target.value = ''
      if (text === '') {
        return
      }
      this.props.submit(this.props.chat.id, text)
    }
  }

  getTimeStamp = (message) => {
    // convert to EST
    let hour = message.created_at.split('T')[1].split(':').slice(0, 2)[0]-4
    const minute = message.created_at.split('T')[1].split(':').slice(0, 2)[1]

    if (hour < 0) {
      hour += 24
    }

    const meridiem = hour < 12 ? 'A.M.' : 'P.M.'
    if (hour === 0) {hour = 12}
    if (hour > 12) {hour -= 12}

    return(
    ` ${hour}:${minute} ${meridiem} `
    )
  }

  render() {
    const indent = (this.props.index)*15.3+13.5;
    const chat = this.props.chat
    const messages = this.props.messages.filter(m => m.chat.id === chat.id).sort((a, b) => a.id > b.id ? -1 : 1)
    return (
      <div onClick={(event) => this.props.toggleActive(event, chat)} className={this.props.active === chat.id ? 'chatBox open' : 'chatBox'} style={{right: indent + 'em'}}>
        <h3 className='chatTitle'>{chat.campaign.name}
          <span className='closeChat'></span>
        </h3>
        <div className={this.props.active === chat.id ? 'messages active' : 'messages'}>
          {
            messages.map((message, i) => (
              <Fragment key={i}>
                <p className='msgAuthor'>
                  <span style={{textDecoration: 'underline'}}>{message.user.name}</span>
                  {
                    this.getTimeStamp(message)
                  }
                </p>
                <p className='msgText'>{message.text}</p>
              </Fragment>
            ))
          }
        </div>
        <input className={this.props.active === chat.id ? 'msgBox active' : 'msgBox'} onKeyPress={(e) => this.checkSubmit(e)} placeholder='submit with enter'></input>
      </div>
    );
  };

};

const mapStateToProps = state => {
  return {
    active: state.chat.activeChat,
    messages: state.chat.messages
  };
};

export default connect(
  mapStateToProps
)(ChatBox);
