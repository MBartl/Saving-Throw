import React, { Component } from 'react';

class ChatSelect extends Component {

  render() {
    return (
      <div id='chatSelectBox'>
        {
          this.props.chats.map(c => <h4 onClick={() => this.props.openChat(c.id)} className='chatChoice' key={c.campaign.id}>{c.campaign.name.length > 21 ? c.campaign.name.slice(0, 18) + '...' : c.campaign.name}</h4>)
        }
      </div>
    );
  }

}

export default ChatSelect;
