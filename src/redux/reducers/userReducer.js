const initialState = {
  showRegisterModal: false,
  showLoginModal: false,
  user: null,
  loading: false,
  error: null,
  token: localStorage.getItem("token"),
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_REGISTER_MODAL":
      return { ...state, showRegisterModal: true };
    case "HIDE_REGISTER_MODAL":
      return { ...state, showRegisterModal: false };
    default:
      return state;
  }
};

export default userReducer;
