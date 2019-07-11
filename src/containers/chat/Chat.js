import React, { Fragment } from 'react';

import { URL, UPDATE_MESSAGES, SET_OPEN_CHATS, SET_ACTIVE_CHAT, CLOSE_CHAT, HEADERS } from '../../constants';
import Cables from './Cables';
import ChatSelect from './ChatSelect';
import ChatBox from './ChatBox';

import { connect } from 'react-redux';


class Chat extends React.Component {

  componentDidMount() {
    this.props.setChats();
  };

  closeChat = (chat) => {
    this.props.closeChat(chat);
  };

  openChat = id => {
    this.props.setActiveChat(id);

    const chats = this.props.chats;
    const chat = findActiveChat(chats, id);
    const open = this.props.openChats;

    if (open.includes(chat)) {return}
    else if (open.length > 3) {
      open.slice(open.length-3, open.length)
    };

    this.props.setOpenChats(chat)
  };

  toggleActive = (event, chat) => {
    const className = event.target.className;

    if (className === 'closeChat') {
      this.closeChat(chat)
      return
    }
    else if (className === 'chatTitle') {
      this.props.activeChat === chat.id ?
      this.props.setActiveChat(null)
      :
      this.props.setActiveChat(chat.id)
    };
  };

  submitMessage = (chat_id, text) => {
    const token = localStorage.getItem('token');

    const message = { chat_id, text };
    fetch(URL + 'messages', {
      method: 'POST',
      headers: {...HEADERS,
        'Authorization': token
      },
      body: JSON.stringify({ message })
    });
  };

  handleReceivedChat = response => {
    const { message } = response;
    if (this.props.messages[this.props.messages.length-1].id === message.id) {
      return
    }

    const chats = [...this.props.chats];
    const chat = chats.find(
      chat => chat.id === message.chat.id
    );

    chat.messages = [...chat.messages, message];

    this.props.setChats(chats);
    this.props.updateMessages(message);
  };

  render = () => {
    let chats = [];
    let activeChat;
    if (this.props.chats.length > 0) {
      chats = this.props.chats;
      activeChat = this.props.activeChat;
    };

    return (
      <div id='chatMainBox'>
        {
          this.props.chats.length ?
            <Cables
              chats={chats}
              handleReceivedChat={this.handleReceivedChat}
            />
          :
          null
        }
        <div className='chatBoxesContainer' hidden={this.props.openChats.length === 0}>
          {
            this.props.openChats.length > 0 ?
              this.props.openChats.map((chat, i) => <ChatBox chat={chat} key={i} index={i} close={this.close} submit={this.submitMessage} activeChat={activeChat} toggleActive={this.toggleActive} />)
            :
            null
          }
        </div>
        {
          this.props.user ?
            <div id='chatOptions'>
              {chats.length > 0 ?
                <Fragment>
                  <div hidden={this.props.hideChats}>
                    <ChatSelect chats={chats} openChat={this.openChat} />
                  </div>
                </Fragment>
              :
                this.props.displayWarning && !this.props.hideChats ?
                  "Join a campaign first!"
                :
                null
              }
              <h2 id='chatBoxText' onClick={() => this.props.toggleChats()}>Chat</h2>
            </div>
          :
          null
        }
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    user: state.user.currentUser,
    chats: state.chat.chats,
    messages: state.chat.messages,
    openChats: state.chat.openChats,
    activeChat: state.chat.activeChat
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateMessages: (message) => {
      dispatch({ type: UPDATE_MESSAGES, payload: message })
    },
    setOpenChats: (chat) => {
      dispatch({ type: SET_OPEN_CHATS, payload: chat })
    },
    setActiveChat: (id) => {
      dispatch({ type: SET_ACTIVE_CHAT, payload: id })
    },
    closeChat: (chat) => {
      dispatch({ type: CLOSE_CHAT, payload: chat })
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);


// helpers
const findActiveChat = (chats, chatId) => {
  return chats.find(chat => chat.id === chatId);
};
