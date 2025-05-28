import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";
import prenotazioneReducer from "../reducers/prenotazioneReducer";
import dishesReducer from "../reducers/dishesReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    prenotazione: prenotazioneReducer,
    dishes: dishesReducer
  },
});

export default store;
