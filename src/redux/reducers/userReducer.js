const initialState = {
  showRegisterModal: false,
  showLoginModal: false,
  user: null,
  loading: {
    register: false,
    login: false,
    getCurrentUser: false,
    prenotazione: false,
  },
  error: {
    register: null,
    login: null,
    getCurrentUser: null,
    prenotazione: null,
  },
  success: {
    register: null,
    login: null,
    prenotazione: null,
  },
  token: localStorage.getItem("token"),
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_REGISTER_MODAL":
      return { ...state, showRegisterModal: true };
    case "HIDE_REGISTER_MODAL":
      return { ...state, showRegisterModal: false };
    case "SHOW_LOGIN_MODAL":
      return { ...state, showLoginModal: true };
    case "HIDE_LOGIN_MODAL":
      return { ...state, showLoginModal: false };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_TOKEN":
      return { ...state, token: action.payload };
    case "SET_LOADING":
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.type]: action.payload.loading,
        },
      };
    case "SET_ERROR":
      return {
        ...state,
        error: {
          ...state.error,
          [action.payload.type]: action.payload.error,
        },
      };
    case "SET_SUCCESS":
      return {
        ...state,
        success: {
          ...state.success,
          [action.payload.type]: action.payload.message,
        },
      };
    case "CLEAR_MESSAGE":
      return {
        ...state,
        error: {
          ...state.error,
          [action.payload]: null,
        },
        success: {
          ...state.success,
          [action.payload]: null,
        },
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
