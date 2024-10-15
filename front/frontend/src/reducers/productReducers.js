import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_RESET,
    ORDER_CHANGE_STATUS_REQUEST,
    ORDER_CHANGE_STATUS_SUCCESS,
    ORDER_CHANGE_STATUS_FAIL,
    ORDER_CHANGE_STATUS_RESET,
  } from "../constants/index";
  
  export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
      case PRODUCT_LIST_REQUEST:
        return { ...state, loading: true, products: [], error: "" };
      case PRODUCT_LIST_SUCCESS:
        return {
          ...state,
          loading: false,
          products: action.payload,
          error: "",
        };
      case PRODUCT_LIST_FAIL:
        return { ...state, loading: false, products: [], error: action.payload };
      default:
        return state;
    }
  };
  
  export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
      case PRODUCT_DETAILS_REQUEST:
        return { ...state, loading: true, product: {}, error: "" };
      case PRODUCT_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
          product: action.payload,
          error: "",
        };
      case PRODUCT_DETAILS_FAIL:
        return { ...state, loading: false, product: {}, error: action.payload };
      default:
        return state;
    }
  };
  
  export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case PRODUCT_CREATE_REQUEST:
        return {
          ...state,
          loading: true,
          product: {},
          success: false,
          error: "",
        };
      case PRODUCT_CREATE_SUCCESS:
        return {
          ...state,
          loading: false,
          product: action.payload,
          success: true,
          error: "",
        };
      case PRODUCT_CREATE_FAIL:
        return {
          ...state,
          loading: false,
          product: {},
          success: false,
          error: action.payload,
        };
      case PRODUCT_CREATE_RESET:
        return {
          ...state,
          loading: false,
          product: {},
          success: false,
          error: "",
        };
      default:
        return state;
    }
  };
  
  export const productUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case PRODUCT_UPDATE_REQUEST:
        return {
          ...state,
          loading: true,
          product: {},
          success: false,
          error: "",
        };
      case PRODUCT_UPDATE_SUCCESS:
        return {
          ...state,
          loading: false,
          product: action.payload,
          success: true,
          error: "",
        };
      case PRODUCT_UPDATE_FAIL:
        return {
          ...state,
          loading: false,
          product: {},
          success: false,
          error: action.payload,
        };
      case PRODUCT_UPDATE_RESET:
        return {
          ...state,
          loading: false,
          product: {},
          success: false,
          error: "",
        };
      default:
        return state;
    }
  };
  
  export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case PRODUCT_DELETE_REQUEST:
        return {
          ...state,
          loading: true,
          success: false,
          error: "",
        };
      case PRODUCT_DELETE_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
          error: "",
        };
      case PRODUCT_DELETE_FAIL:
        return {
          ...state,
          loading: false,
          success: false,
          error: action.payload,
        };
      case PRODUCT_DELETE_RESET:
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
  
  export const orderChangeStatusReducer = (state = {}, action) => {
    switch (action.type) {
      case ORDER_CHANGE_STATUS_REQUEST:
        return {
          ...state,
          loading: true,
          success: false,
          error: "",
        };
      case ORDER_CHANGE_STATUS_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
          error: "",
        };
      case ORDER_CHANGE_STATUS_FAIL:
        return {
          ...state,
          loading: false,
          success: false,
          error: action.payload,
        };
      case ORDER_CHANGE_STATUS_RESET:
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