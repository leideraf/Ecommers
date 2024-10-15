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
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    ORDER_CHANGE_STATUS_REQUEST,
    ORDER_CHANGE_STATUS_SUCCESS,
    ORDER_CHANGE_STATUS_FAIL,
  } from "../constants/index";
  
  import apiClient from "../conf/axiosConfig.js";
  
  // products list
  export const getProductsList = () => async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_LIST_REQUEST,
      });
  
      // call api
      const { data } = await apiClient.get("/product/products/");
  
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: error.message,
      });
    }
  };
  
  // product details
  export const getProductDetails = (id) => async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_DETAILS_REQUEST,
      });
  
      // call api
      const { data } = await apiClient.get(`/product/products/${id}/`);
  
      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload: error.message,
      });
    }
  };
  
  // create product
  export const createProduct = (product) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REQUEST,
      });
  
      // login reducer
      const {
        userLoginReducer: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      // api call
      const { data } = await apiClient.post(
        "/product/product-create/",
        product,
        config
      );
  
      dispatch({
        type: PRODUCT_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  // delete product
  export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_DELETE_REQUEST,
      });
  
      // login reducer
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
      const { data } = await apiClient.delete(
        `/product/product-delete/${id}/`,
        config
      );
  
      dispatch({
        type: PRODUCT_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DELETE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  // update product
  export const updateProduct = (id, product) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_UPDATE_REQUEST,
      });
  
      // login reducer
      const {
        userLoginReducer: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      // api call
      const { data } = await apiClient.put(
        `/product/product-update/${id}/`,
        product,
        config
      );
  
      dispatch({
        type: PRODUCT_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
  
  // change ordered product delivery status
  export const changeDeliveryStatus =
    (id, product) => async (dispatch, getState) => {
      try {
        dispatch({
          type: ORDER_CHANGE_STATUS_REQUEST,
        });
  
        // login reducer
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
        const { data } = await apiClient.put(
          `/account/change_order_status/${id}/`,
          product,
          config
        );
  
        dispatch({
          type: ORDER_CHANGE_STATUS_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: ORDER_CHANGE_STATUS_FAIL,
          payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
        });
      }
    };