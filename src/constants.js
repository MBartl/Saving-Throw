// utility constants
export const URL = 'http://localhost:3000/api/'
export const API_WS_ROOT = 'ws://localhost:3000/cable';
export const HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

// campaign constants
export const RESET_CAMPAIGNS = 'RESET_CAMPAIGNS'
export const CHANGE_NAV = 'CHANGE_NAV'
export const SET_CAMPAIGNS = 'SET_CAMPAIGNS'
export const SET_CHARACTER_CAMPAIGNS = 'SET_CHARACTER_CAMPAIGNS'
export const ADD_CAMPAIGN = 'ADD_CAMPAIGN'
export const SET_DISCOVER = 'SET_DISCOVER'
export const UPDATE_CAMPAIGN = 'UPDATE_CAMPAIGN'

// character constants
export const SET_CHARACTERS = 'SET_CHARACTERS'
export const SET_FREE_CHARACTERS = 'SET_FREE_CHARACTERS'
export const ADD_CHARACTER = 'ADD_CHARACTER'
export const RESET_CHARACTERS = 'RESET_CHARACTERS'

// loading constants
export const LOADING = 'LOADING'
export const CAMPAIGN_LOADING = 'CAMPAIGN_LOADING'
export const CHARACTER_LOADING = 'CHARACTER_LOADING'
export const DISCOVER_LOADING = 'DISCOVER_LOADING'
export const RESET_LOADINGS = 'RESET_LOADINGS'

// user constants
export const LOG_IN = 'LOG_IN'
export const LOG_OUT = 'LOG_OUT'
