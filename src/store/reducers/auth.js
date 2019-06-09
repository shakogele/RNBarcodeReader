import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN,
  AUTH_SET_BARCODE, AUTH_SET_USERDATA } from "../actions/actionTypes";

const initialState = {
  token: null,
  expiryDate: null,
  userData: null,
  barcode: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SET_TOKEN:
      return {
        ...state,
        token: action.token,
        expiryDate: action.expiryDate
      };
    case AUTH_SET_BARCODE:
      return {
        ...state,
        barcode: action.barcode,
      };
    case AUTH_SET_USERDATA:
      return {
        ...state,
        userData: action.userData,
      };
    case AUTH_REMOVE_TOKEN:
      return {
        ...state,
        token: null,
        expiryDate: null,
        userData: null
      };
    default:
      return state;
  }
};

export default reducer;
