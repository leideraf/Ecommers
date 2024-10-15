import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    CARD_CREATE_RESET,
    CHECK_TOKEN_VALIDATION_REQUEST,
    CHECK_TOKEN_VALIDATION_SUCCESS,
    CHECK_TOKEN_VALIDATION_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_DETAILS_REQUEST,
    USER_UPDATE_DETAILS_SUCCESS,
    USER_UPDATE_DETAILS_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_ADDRESS_LIST_REQUEST,
    USER_ADDRESS_LIST_SUCCESS,
    USER_ADDRESS_LIST_FAIL,
    USER_ADDRESS_DETAILS_REQUEST,
    USER_ADDRESS_DETAILS_SUCCESS,
    USER_ADDRESS_DETAILS_FAIL,
    USER_ADDRESS_CREATE_REQUEST,
    USER_ADDRESS_CREATE_SUCCESS,
    USER_ADDRESS_CREATE_FAIL,
    USER_ADDRESS_UPDATE_REQUEST,
    USER_ADDRESS_UPDATE_SUCCESS,
    USER_ADDRESS_UPDATE_FAIL,
    USER_ADDRESS_DELETE_REQUEST,
    USER_ADDRESS_DELETE_SUCCESS,
    USER_ADDRESS_DELETE_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
  } from "../constants/index.js";
  
  import apiClient from "../conf/axiosConfig.js";
  
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  
  export const Login = (username, password) => async (dispatch) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });
  
      const { data } = await apiClient.post(
        "/account/login/",
        { username: username, password: password },
        config
      );
  
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
  
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const Logout = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: CARD_CREATE_RESET });
  };
  
  export const register = (username, email, password) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });
  
      const { data } = await apiClient.post(
        "/account/register/",
        { username: username, email: email, password: password },
        config
      );
  
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });
  
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
  
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  export const checkTokenValidation = () => async (dispatch, getState) => {
    try {
      dispatch({ type: CHECK_TOKEN_VALIDATION_REQUEST });
  
      const {
        userLoginReducer: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await apiClient.get("/payments/check-token/", config);
  
      dispatch({
        type: CHECK_TOKEN_VALIDATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CHECK_TOKEN_VALIDATION_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  // user details
  export const userDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_DETAILS_REQUEST,
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
  
      // call api
      const { data } = await apiClient.get(`/account/user/${id}`, config);
  
      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.details
            ? error.response.data.details
            : error.message,
      });
    }
  };
  
  // user update details
  export const userUpdateDetails = (userData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_UPDATE_DETAILS_REQUEST,
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
  
      // call api
      const { data } = await apiClient.put(
        `/account/user_update/${userInfo.id}/`,
        {
          username: userData.username,
          email: userData.email,
          password: userData.password,
        },
        config
      );
  
      dispatch({
        type: USER_UPDATE_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_UPDATE_DETAILS_FAIL,
        payload:
          error.response && error.response.data.details
            ? error.response.data.details
            : error.message,
      });
    }
  };
  
  // user account delete
  export const userAccountDelete = (userData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_DELETE_REQUEST,
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
  
      // call api
      const { data } = await apiClient.post(
        `/account/user_delete/${userData.id}/`,
        {
          password: userData.password,
        },
        config
      );
  
      dispatch({
        type: USER_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_DELETE_FAIL,
        payload:
          error.response && error.response.data.details
            ? error.response.data.details
            : error.message,
      });
    }
  };
  
  // get user address
  export const getAllAddress = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_ADDRESS_LIST_REQUEST,
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
  
      // call api
      const { data } = await apiClient.get("/account/all_address/", config);
  
      dispatch({
        type: USER_ADDRESS_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_ADDRESS_LIST_FAIL,
        payload:
          error.response && error.response.data.details
            ? error.response.data.details
            : error.message,
      });
    }
  };
  
  // get user single address
  export const getSingleAddress = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_ADDRESS_DETAILS_REQUEST,
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
  
      // call api
      const { data } = await apiClient.get(
        `/account/address-details/${id}/`,
        config
      );
  
      dispatch({
        type: USER_ADDRESS_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_ADDRESS_DETAILS_FAIL,
        payload:
          error.response && error.response.data.details
            ? error.response.data.details
            : error.message,
      });
    }
  };
  
  // create user address
  export const createUserAddress =
    (addressData) => async (dispatch, getState) => {
      try {
        dispatch({
          type: USER_ADDRESS_CREATE_REQUEST,
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
  
        // call api
        const { data } = await apiClient.post(
          "/account/address_create/",
          addressData,
          config
        );
  
        dispatch({
          type: USER_ADDRESS_CREATE_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: USER_ADDRESS_CREATE_FAIL,
          payload:
            error.response && error.response.data.details
              ? error.response.data.details
              : error.message,
        });
      }
    };
  
  // update user address
  export const updateUserAddress =
    (id, addressData) => async (dispatch, getState) => {
      try {
        dispatch({
          type: USER_ADDRESS_UPDATE_REQUEST,
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
  
        // call api
        const { data } = await apiClient.put(
          `/account/address_update/${id}/`,
          addressData,
          config
        );
  
        dispatch({
          type: USER_ADDRESS_UPDATE_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: USER_ADDRESS_UPDATE_FAIL,
          payload:
            error.response && error.response.data.details
              ? error.response.data.details
              : error.message,
        });
      }
    };
  
  // delete user address
  export const deleteUserAddress = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_ADDRESS_DELETE_REQUEST,
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
  
      // call api
      const { data } = await apiClient.delete(
        `/account/address_delete/${id}/`,
        config
      );
  
      dispatch({
        type: USER_ADDRESS_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_ADDRESS_DELETE_FAIL,
        payload:
          error.response && error.response.data.details
            ? error.response.data.details
            : error.message,
      });
    }
  };
  
  // get all orders
  export const getAllOrders = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_LIST_REQUEST,
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
  
      // call api
      const { data } = await apiClient.get(`/account/all_orders/`, config);
  
      dispatch({
        type: ORDER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_LIST_FAIL,
        payload:
          error.response && error.response.data.details
            ? error.response.data.details
            : error.message,
      });
    }
  };