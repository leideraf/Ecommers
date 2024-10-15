import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_DETAILS_REQUEST,
    USER_UPDATE_DETAILS_SUCCESS,
    USER_UPDATE_DETAILS_FAIL,
    USER_UPDATE_DETAILS_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_DELETE_RESET,
    CHECK_TOKEN_VALIDATION_REQUEST,
    CHECK_TOKEN_VALIDATION_SUCCESS,
    CHECK_TOKEN_VALIDATION_FAIL,
    CHECK_TOKEN_VALIDATION_RESET,
    USER_ADDRESS_LIST_REQUEST,
    USER_ADDRESS_LIST_SUCCESS,
    USER_ADDRESS_LIST_FAIL,
    USER_ADDRESS_DETAILS_REQUEST,
    USER_ADDRESS_DETAILS_SUCCESS,
    USER_ADDRESS_DETAILS_FAIL,
    USER_ADDRESS_DETAILS_RESET,
    USER_ADDRESS_CREATE_REQUEST,
    USER_ADDRESS_CREATE_SUCCESS,
    USER_ADDRESS_CREATE_FAIL,
    USER_ADDRESS_CREATE_RESET,
    USER_ADDRESS_UPDATE_REQUEST,
    USER_ADDRESS_UPDATE_SUCCESS,
    USER_ADDRESS_UPDATE_FAIL,
    USER_ADDRESS_UPDATE_RESET,
    USER_ADDRESS_DELETE_REQUEST,
    USER_ADDRESS_DELETE_SUCCESS,
    USER_ADDRESS_DELETE_FAIL,
    USER_ADDRESS_DELETE_RESET,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
  } from "../constants/index.js";
  
  export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_LOGIN_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case USER_LOGIN_SUCCESS:
        return {
          ...state,
          loading: false,
          userInfo: action.payload,
        };
      case USER_LOGIN_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case USER_LOGOUT:
        return {};
      default:
        return state;
    }
  };
  
  export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case USER_REGISTER_SUCCESS:
        return {
          ...state,
          loading: false,
          userInfo: action.payload,
        };
      case USER_REGISTER_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case USER_LOGOUT:
        return {};
      default:
        return state;
    }
  };
  
  export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case USER_DETAILS_REQUEST:
        return { ...state, loading: true, user: {}, error: "" };
      case USER_DETAILS_SUCCESS:
        return { ...state, loading: false, user: action.payload, error: "" };
      case USER_DETAILS_FAIL:
        return { ...state, loading: false, user: {}, error: action.payload };
      default:
        return state;
    }
  };
  
  export const userDetailsUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_UPDATE_DETAILS_REQUEST:
        return { ...state, loading: true, success: false, user: {}, error: "" };
      case USER_UPDATE_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
          user: action.payload,
          error: "",
        };
      case USER_UPDATE_DETAILS_FAIL:
        return {
          ...state,
          loading: false,
          success: false,
          user: {},
          error: action.payload,
        };
      case USER_UPDATE_DETAILS_RESET:
        return { ...state, loading: false, success: false, user: {}, error: "" };
      default:
        return state;
    }
  };
  
  export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_DELETE_REQUEST:
        return { ...state, loading: true, success: false, error: "" };
      case USER_DELETE_SUCCESS:
        return { ...state, loading: false, success: true, error: "" };
      case USER_DELETE_FAIL:
        return {
          ...state,
          loading: false,
          success: false,
          error: action.payload,
        };
      case USER_DELETE_RESET:
        return { ...state, loading: false, success: false, error: "" };
      default:
        return state;
    }
  };
  
  export const checkTokenValidationReducer = (state = {}, action) => {
    switch (action.type) {
      case CHECK_TOKEN_VALIDATION_REQUEST:
        return { ...state, loading: true, valid: false, error: "" };
      case CHECK_TOKEN_VALIDATION_SUCCESS:
        return { ...state, loading: false, valid: true, error: "" };
      case CHECK_TOKEN_VALIDATION_FAIL:
        return { ...state, loading: false, valid: false, error: action.payload };
      case CHECK_TOKEN_VALIDATION_RESET:
        return { ...state, loading: false, valid: false, error: "" };
      default:
        return state;
    }
  };
  
  export const userAddressListReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_ADDRESS_LIST_REQUEST:
        return {
          ...state,
          loading: true,
          addresses: [],
          success: false,
          error: "",
        };
      case USER_ADDRESS_LIST_SUCCESS:
        return {
          ...state,
          loading: false,
          addresses: action.payload,
          success: true,
          error: "",
        };
      case USER_ADDRESS_LIST_FAIL:
        return {
          ...state,
          loading: false,
          addresses: [],
          success: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export const userAddressDetailsReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_ADDRESS_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
          address: {},
          success: false,
          error: "",
        };
      case USER_ADDRESS_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
          address: action.payload,
          success: true,
          error: "",
        };
      case USER_ADDRESS_DETAILS_FAIL:
        return {
          ...state,
          loading: false,
          address: {},
          success: false,
          error: action.payload,
        };
      case USER_ADDRESS_DETAILS_RESET:
        return {
          ...state,
          loading: false,
          address: {},
          success: false,
          error: "",
        };
      default:
        return state;
    }
  };
  
  export const userAdressCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_ADDRESS_CREATE_REQUEST:
        return {
          ...state,
          loading: true,
          address: {},
          success: false,
          error: "",
        };
      case USER_ADDRESS_CREATE_SUCCESS:
        return {
          ...state,
          loading: false,
          address: action.payload,
          success: true,
          error: "",
        };
      case USER_ADDRESS_CREATE_FAIL:
        return {
          ...state,
          loading: false,
          address: {},
          success: false,
          error: action.payload,
        };
      case USER_ADDRESS_CREATE_RESET:
        return {
          ...state,
          loading: false,
          address: {},
          success: false,
          error: "",
        };
      default:
        return state;
    }
  };
  
  export const userAddressUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_ADDRESS_UPDATE_REQUEST:
        return {
          ...state,
          loading: true,
          address: {},
          success: false,
          error: "",
        };
      case USER_ADDRESS_UPDATE_SUCCESS:
        return {
          ...state,
          loading: false,
          address: action.payload,
          success: true,
          error: "",
        };
      case USER_ADDRESS_UPDATE_FAIL:
        return {
          ...state,
          loading: false,
          address: {},
          success: false,
          error: action.payload,
        };
      case USER_ADDRESS_UPDATE_RESET:
        return {
          ...state,
          loading: false,
          address: {},
          success: false,
          error: "",
        };
      default:
        return state;
    }
  };
  
  export const userAddressDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_ADDRESS_DELETE_REQUEST:
        return {
          ...state,
          loading: true,
          success: false,
          error: "",
        };
      case USER_ADDRESS_DELETE_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
          error: "",
        };
      case USER_ADDRESS_DELETE_FAIL:
        return {
          ...state,
          loading: false,
          success: false,
          error: action.payload,
        };
      case USER_ADDRESS_DELETE_RESET:
        return {
          ...state,
          loading: false,
          success: false,
          error: "",
        };
      default:
        return state;
    }
  };
  
  export const getAllOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
      case ORDER_LIST_REQUEST:
        return {
          ...state,
          loading: true,
          orders: [],
          success: false,
          error: "",
        };
      case ORDER_LIST_SUCCESS:
        return {
          ...state,
          loading: false,
          orders: action.payload,
          success: true,
          error: "",
        };
      case ORDER_LIST_FAIL:
        return {
          ...state,
          loading: false,
          orders: [],
          success: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  