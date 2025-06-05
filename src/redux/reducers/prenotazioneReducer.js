const initialState = {
  showPrenotazioneModal: false,
  prenotazioni: [],
  loading: false,
  error: "",
  success: "",
};

const prenotazioneReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_PRENOTAZIONE_MODAL":
      return { ...state, showPrenotazioneModal: true };
    case "HIDE_PRENOTAZIONE_MODAL":
      return { ...state, showPrenotazioneModal: false };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload && typeof action.payload === "object" ? action.payload.error || "" : action.payload || "",
      };
    case "SET_SUCCESS":
      return {
        ...state,
        success:
          action.payload && typeof action.payload === "object" ? action.payload.message || "" : action.payload || "",
      };
    default:
      return state;
  }
};

export default prenotazioneReducer;
