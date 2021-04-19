let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : "";
let token = localStorage.getItem("token") ? localStorage.getItem("token") : "";

export const initialState = {
  user: "" || user,
  token: "" || token,
  loading: false,
  errorMessage: null,
};

export const AuthReducer = (initailState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...initailState,
        loading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...initailState,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      };
    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...initialState,
        loading: false,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
