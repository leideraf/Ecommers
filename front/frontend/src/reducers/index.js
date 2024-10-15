import { combineReducers } from "redux";

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userDetailsUpdateReducer,
  userDeleteReducer,
  checkTokenValidationReducer,
  userAddressListReducer,
  userAddressDetailsReducer,
  userAdressCreateReducer,
  userAddressUpdateReducer,
  userAddressDeleteReducer,
  getAllOrdersReducer,
} from "./userReducers";

import {
  productListReducer,
  productDetailsReducer,
  productCreateReducer,
  productUpdateReducer,
  productDeleteReducer,
  orderChangeStatusReducer,
} from "./productReducers";

import {
  createCardReducer,
  chargeCardReducer,
  savedCardsListReducer,
  updateCardReducer,
  deleteCardReducer,
} from "./cardReducers";

const allReducers = combineReducers({
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userDetailsUpdateReducer,
  userDeleteReducer,
  checkTokenValidationReducer,
  userAddressListReducer,
  userAddressDetailsReducer,
  userAdressCreateReducer,
  userAddressUpdateReducer,
  userAddressDeleteReducer,
  getAllOrdersReducer,
  productListReducer,
  productDetailsReducer,
  productCreateReducer,
  productUpdateReducer,
  productDeleteReducer,
  orderChangeStatusReducer,
  createCardReducer,
  chargeCardReducer,
  savedCardsListReducer,
  updateCardReducer,
  deleteCardReducer,
});

export default allReducers;