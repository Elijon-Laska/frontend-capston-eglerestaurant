const initialState = {
  showPrenotazioneModal: false,
  prenotazioni: [],
  loading: false,
  error: null,
  success: false,
};

const prenotazioneReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_PRENOTAZIONE_MODAL":
      return { ...state, showPrenotazioneModal: true };
    case "HIDE_PRENOTAZIONE_MODAL":
      return { ...state, showPrenotazioneModal: false };
    default:
      return state;
  }
};

export default prenotazioneReducer;
