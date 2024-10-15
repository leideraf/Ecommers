import {
    CARD_CREATE_REQUEST,
    CARD_CREATE_SUCCESS,
    CARD_CREATE_FAIL,
    CARD_CHARGE_REQUEST,
    CARD_CHARGE_SUCCESS,
    CARD_CHARGE_FAIL,
    CARD_LIST_REQUEST,
    CARD_LIST_SUCCESS,
    CARD_LIST_FAIL,
    CARD_DELETE_REQUEST,
    CARD_DELETE_SUCCESS,
    CARD_DELETE_FAIL,
    CARD_UPDATE_REQUEST,
    CARD_UPDATE_SUCCESS,
    CARD_UPDATE_FAIL,
  } from "../constants/index";
  
  import apiClient from "../conf/axiosConfig.js";
  
  // create card
  export const createCard = (cardData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CARD_CREATE_REQUEST,
      });
  
      const {
        userLoginReducer: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
          "Card-Number": cardData.cardNumber,
        },
      };
  
      // api call
      const { data } = await apiClient.post(
        "/payments/create-card/",
        {
          email: cardData.email,
          number: cardData.cardNumber,
          exp_month: cardData.expMonth,
          exp_year: cardData.expYear,
          cvc: cardData.cvc,
          save_card: cardData.saveCard,
        },
        config
      );
  
      dispatch({
        type: CARD_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CARD_CREATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  // charge customer
  export const chargeCustomer = (cardData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CARD_CHARGE_REQUEST,
      });
  
      const {
        userLoginReducer: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      // api call
      const { data } = await apiClient.post(
        "/payments/charge-customer/",
        cardData,
        config
      );
  
      dispatch({
        type: CARD_CHARGE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CARD_CHARGE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  // saved cards list
  export const savedCardsList = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: CARD_LIST_REQUEST,
      });
  
      const {
        userLoginReducer: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      // api call
      const { data } = await apiClient.get("/account/all_cards/", config);
  
      dispatch({
        type: CARD_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CARD_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  // update card
  export const updateCard = (cardData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CARD_UPDATE_REQUEST,
      });
  
      const {
        userLoginReducer: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      // api call
      const { data } = await apiClient.post(
        "/payments/update-card/",
        cardData,
        config
      );
  
      dispatch({
        type: CARD_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CARD_UPDATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  // delete saved card
  export const deleteSavedCard = (card_number) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CARD_DELETE_REQUEST,
      });
  
      const {
        userLoginReducer: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      // api call
      const { data } = await apiClient.post(
        "/payments/delete-card/",
        { card_number: card_number },
        config
      );
  
      dispatch({
        type: CARD_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CARD_DELETE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };