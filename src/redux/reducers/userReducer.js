const initialState = {
  showRegisterModal: false,
  // ...altri stati utente
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
