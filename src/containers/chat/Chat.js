import React, { Fragment } from 'react';

import { ActionCableConsumer } from 'react-actioncable-provider';
import { URL, SET_CHATS, SET_MESSAGES, UPDATE_MESSAGES, SET_OPEN_CHATS, SET_ACTIVE_CHAT, CLOSE_CHAT, HEADERS } from '../../constants';
import Cables from './Cables';
import ChatSelect from './ChatSelect';
import ChatBox from './ChatBox';

import { connect } from 'react-redux';


class Chat extends React.Component {

  state = {
    hideChats: true,
    displayWarning: false
  };

  componentDidMount() {
    this.getChats();
  };

  getChats = () => {
    const token = localStorage.getItem('token');

    if (token) {
      fetch(URL + 'chats', {
        headers: {'Authorization': token}
      })
      .then(res => res.json())
      .then(chats => {
        this.props.setChats(chats)
        chats.map(chat => chat.messages).forEach(list => this.props.setMessages(list))
      })
      .then(() => this.displayWarning());
    }
  };

  toggleChats = () => {
    this.setState({
      hideChats: !this.state.hideChats
    });
  };

  closeChat = (chat) => {
    this.props.closeChat(chat);
  };

  displayWarning = () => {
    this.setState({
      displayWarning: true
    });
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
                  <div hidden={this.state.hideChats}>
                    <ChatSelect chats={chats} openChat={this.openChat} />
                  </div>
                </Fragment>
              :
                this.state.displayWarning && !this.state.hideChats ?
                  "Join a campaign first!"
                :
                null
              }
              <h2 id='chatBoxText' onClick={() => this.toggleChats()}>Chat</h2>
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
    setChats: (chats) => {
      dispatch({ type: SET_CHATS, payload: chats })
    },
    setMessages: (messages) => {
      dispatch({ type: SET_MESSAGES, payload: messages })
    },
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
