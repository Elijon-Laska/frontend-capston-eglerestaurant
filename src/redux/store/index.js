import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    // qui si puo aggiungere altri reducer
  },
});

export default store;
