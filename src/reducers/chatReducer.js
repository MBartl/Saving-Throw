import { SET_CHATS, SET_MESSAGES, UPDATE_MESSAGES, SET_OPEN_CHATS, SET_ACTIVE_CHAT, UPDATE_CHAT, CLOSE_CHAT } from '../constants'

export default function userReducer(
  state = {
    chats: [],
    messages: [],
    openChats: [],
    activeChat: null
  },
  action
) {
  switch (action.type) {
    case SET_CHATS:
      return {...state, chats: action.payload};
    case SET_MESSAGES:
      return {...state, messages: [...state.messages, ...action.payload]};
    case UPDATE_MESSAGES:
      return {...state, messages: [...state.messages, action.payload]}
    case SET_OPEN_CHATS:
      return {...state, openChats: [...state.openChats, action.payload]};
    case SET_ACTIVE_CHAT:
      return {...state, activeChat: action.payload};
    case UPDATE_CHAT:
      return {...state, chats: [...state.chats, action.payload]};
    case CLOSE_CHAT:
      return {...state, openChats: [...state.openChats.filter(chat => chat !== action.payload)]};

    default:
      return state;
  };
};
