import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";
import prenotazioneReducer from "../reducers/prenotazioneReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    prenotazione: prenotazioneReducer,
    // altri reducer...
  },
});

export default store;
