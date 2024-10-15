import {
    CARD_CREATE_REQUEST,
    CARD_CREATE_SUCCESS,
    CARD_CREATE_FAIL,
    CARD_CREATE_RESET,
    CARD_CHARGE_REQUEST,
    CARD_CHARGE_SUCCESS,
    CARD_CHARGE_FAIL,
    CARD_CHARGE_RESET,
    CARD_LIST_REQUEST,
    CARD_LIST_SUCCESS,
    CARD_LIST_FAIL,
    CARD_UPDATE_REQUEST,
    CARD_UPDATE_SUCCESS,
    CARD_UPDATE_FAIL,
    CARD_UPDATE_RESET,
    CARD_DELETE_REQUEST,
    CARD_DELETE_SUCCESS,
    CARD_DELETE_FAIL,
  } from "../constants/index";
  
  export const createCardReducer = (state = {}, action) => {
    switch (action.type) {
      case CARD_CREATE_REQUEST:
        return {
          ...state,
          loading: true,
          cardData: {},
          success: false,
          error: "",
        };
      case CARD_CREATE_SUCCESS:
        return {
          ...state,
          loading: false,
          cardData: action.payload,
          success: true,
          error: "",
        };
      case CARD_CREATE_FAIL:
        return {
          ...state,
          loading: false,
          cardData: {},
          success: false,
          error: action.payload,
        };
      case CARD_CREATE_RESET:
        return {
          ...state,
          loading: false,
          cardData: {},
          success: false,
          error: "",
        };
      default:
        return state;
    }
  };
  
  export const chargeCardReducer = (state = {}, action) => {
    switch (action.type) {
      case CARD_CHARGE_REQUEST:
        return {
          ...state,
          loading: true,
          cardData: {},
          success: false,
          error: "",
        };
      case CARD_CHARGE_SUCCESS:
        return {
          ...state,
          loading: false,
          cardData: action.payload,
          success: true,
          error: "",
        };
      case CARD_CHARGE_FAIL:
        return {
          ...state,
          loading: false,
          cardData: {},
          success: false,
          error: action.payload,
        };
      case CARD_CHARGE_RESET:
        return {
          ...state,
          loading: false,
          cardData: {},
          success: false,
          error: "",
        };
      default:
        return state;
    }
  };
  
  export const savedCardsListReducer = (state = { cards: [] }, action) => {
    switch (action.type) {
      case CARD_LIST_REQUEST:
        return { ...state, loading: true, cards: [], success: false, error: "" };
      case CARD_LIST_SUCCESS:
        return {
          ...state,
          loading: false,
          cards: action.payload,
          success: true,
          error: "",
        };
      case CARD_LIST_FAIL:
        return {
          ...state,
          loading: false,
          cards: [],
          success: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const updateCardReducer = (state = {}, action) => {
    switch (action.type) {
      case CARD_UPDATE_REQUEST:
        return {
          ...state,
          loading: true,
          cardData: {},
          success: false,
          error: "",
        };
      case CARD_UPDATE_SUCCESS:
        return {
          ...state,
          loading: false,
          cardData: action.payload,
          success: true,
          error: "",
        };
      case CARD_UPDATE_FAIL:
        return {
          ...state,
          loading: false,
          cardData: {},
          success: false,
          error: action.payload,
        };
      case CARD_UPDATE_RESET:
        return {
          ...state,
          loading: false,
          cardData: {},
          success: false,
          error: "",
        };
      default:
        return state;
    }
  };
  
  export const deleteCardReducer = (state = {}, action) => {
    switch (action.type) {
      case CARD_DELETE_REQUEST:
        return {
          ...state,
          loading: true,
          cardData: {},
          success: false,
          error: "",
        };
      case CARD_DELETE_SUCCESS:
        return {
          ...state,
          loading: false,
          cardData: action.payload,
          success: true,
          error: "",
        };
      case CARD_DELETE_FAIL:
        return {
          ...state,
          loading: false,
          cardData: {},
          success: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  