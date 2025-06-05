export const showRegisterModal = () => ({ type: "SHOW_REGISTER_MODAL" });
export const hideRegisterModal = () => ({ type: "HIDE_REGISTER_MODAL" });
export const showPrenotazioneModal = () => ({ type: "SHOW_PRENOTAZIONE_MODAL" });
export const hidePrenotazioneModal = () => ({ type: "HIDE_PRENOTAZIONE_MODAL" });
export const showLoginModal = () => ({ type: "SHOW_LOGIN_MODAL" });
export const hideLoginModal = () => ({ type: "HIDE_LOGIN_MODAL" });

export const setUser = (user) => ({ type: "SET_USER", payload: user });
export const setToken = (token) => ({ type: "SET_TOKEN", payload: token });
export const setLoading = (loading, type) => ({
  type: "SET_LOADING",
  payload: { loading, type },
});
export const setError = (error, type) => ({
  type: "SET_ERROR",
  payload: { error, type },
});
export const setSuccess = (message, type) => ({
  type: "SET_SUCCESS",
  payload: { message, type },
});
export const clearMessage = (type) => ({
  type: "CLEAR_MESSAGE",
  payload: type,
});
export const logout = () => ({ type: "LOGOUT" });

export const register = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true, "register"));
    dispatch(setError(null, "register"));
    dispatch(setSuccess(null, "register"));

    const response = await fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Errore durante la registrazione");
    }

    dispatch(setSuccess("Registrazione avvenuta con successo!", "register"));

    setTimeout(() => {
      dispatch(hideRegisterModal());
    }, 200000);
  } catch (error) {
    dispatch(setError(error.message, "register"));
  } finally {
    dispatch(setLoading(false, "register"));
  }
};

export const login = (credentials) => async (dispatch) => {
  try {
    dispatch(setLoading(true, "login"));
    dispatch(setError(null, "login"));
    dispatch(setSuccess(null, "login"));

    console.log("Credenziali di login:", credentials);

    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    console.log("Risposta del server:", response);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Credenziali non valide");
    }

    const data = await response.json();
    console.log("Login successo:", data);
    localStorage.setItem("token", data.token);
    const userResponse = await fetch("http://localhost:8080/api/auth/current-user", {
      headers: {
        Authorization: `Bearer ${data.token}`,
        "Content-Type": "application/json",
      },
    });

    if (!userResponse.ok) {
      throw new Error("Errore nel recupero dei dati utente");
    }
    const userData = await userResponse.json();
    dispatch(setUser(userData));

    dispatch(setSuccess("Login avvenuto con successo", "login"));
  } catch (error) {
    dispatch(setError(error.message, "login"));
  } finally {
    dispatch(setLoading(false, "login"));
  }
};

export const getCurrentUser = () => async (dispatch) => {
  try {
    dispatch(setLoading(true, "getCurrentUser"));
    dispatch(setError(null, "getCurrentUser"));
    dispatch(setSuccess(null, "getCurrentUser"));

    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await fetch("http://localhost:8080/api/auth/current-user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Errore durante il recupero dell'utente");
    }

    const data = await response.json();
    dispatch(setUser(data));
  } catch (error) {
    dispatch(setError(error.message, "getCurrentUser"));
  } finally {
    dispatch(setLoading(false, "getCurrentUser"));
  }
};

export const createPrenotazione = (prenotazioneData) => async (dispatch) => {
  try {
    dispatch(setLoading(true, "prenotazione"));
    dispatch(setError(null, "prenotazione"));
    dispatch(setSuccess(null, "prenotazione"));

    const response = await fetch("http://localhost:8080/api/prenotazioni", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prenotazioneData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      dispatch(setSuccess(null, "prenotazione"));
      throw new Error(errorText || "Errore durante la prenotazione");
    }
    dispatch(setError(null, "prenotazione"));
    dispatch(
      setSuccess(
        "Prenotazione avvenuta con successo! Riceverai una email di conferma all'indirizzo inserito.",
        "Continua a dare un occhiata al nostro sito per altre novità!",
        "prenotazione"
      )
    );
    setTimeout(() => {
      dispatch(hidePrenotazioneModal());
    }, 5000);
  } catch (error) {
    dispatch(setError(error.message, "prenotazione"));
    dispatch(setSuccess(null, "prenotazione"));
  } finally {
    dispatch(setLoading(false, "prenotazione"));
  }
};
