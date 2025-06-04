export const fetchAdminDashboard = () => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_ADMIN_DASHBOARD_REQUEST" });

    const token = localStorage.getItem("token");
    if (!token) throw new Error("Utente non autenticato");

    // Fetch per categorie, piatti e prenotazioni
    const [categoriesRes, dishesRes, reservationsRes] = await Promise.all([
      fetch("http://localhost:8080/api/categories", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch("http://localhost:8080/api/dishes", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch("http://localhost:8080/api/prenotazioni", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

    if (!categoriesRes.ok || !dishesRes.ok || !reservationsRes.ok) {
      throw new Error("Errore nel caricamento dei dati");
    }

    const [categories, dishes, reservations] = await Promise.all([
      categoriesRes.json(),
      dishesRes.json(),
      reservationsRes.json(),
    ]);

    dispatch({
      type: "FETCH_ADMIN_DASHBOARD_SUCCESS",
      payload: {
        categories,
        dishes,
        reservations,
      },
    });
  } catch (error) {
    dispatch({
      type: "FETCH_ADMIN_DASHBOARD_FAILURE",
      payload: error.message,
    });
  }
};

// Actions per la gestione delle categorie
export const createCategory = (categoryData) => async (dispatch) => {
  try {
    dispatch({ type: "CREATE_CATEGORY_REQUEST" });

    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:8080/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(categoryData),
    });

    if (!response.ok) {
      throw new Error("Errore nella creazione della categoria");
    }

    dispatch({
      type: "CREATE_CATEGORY_SUCCESS",
      payload: await response.json(),
    });
  } catch (error) {
    dispatch({
      type: "CREATE_CATEGORY_FAILURE",
      payload: error.message,
    });
  }
};

// - updateCategory
export const updateCategory = (categoryId, categoryData) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_CATEGORY_REQUEST" });

    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8080/api/categories/${categoryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(categoryData),
    });

    if (!response.ok) {
      throw new Error("Errore nell'aggiornamento della categoria");
    }

    dispatch({
      type: "UPDATE_CATEGORY_SUCCESS",
      payload: await response.json(),
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_CATEGORY_FAILURE",
      payload: error.message,
    });
  }
};

// - deleteCategory
export const deleteCategory = (categoryId) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_CATEGORY_REQUEST" });

    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8080/api/categories/${categoryId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Errore nella cancellazione della categoria");
    }

    dispatch({
      type: "DELETE_CATEGORY_SUCCESS",
      payload: categoryId,
    });
  } catch (error) {
    dispatch({
      type: "DELETE_CATEGORY_FAILURE",
      payload: error.message,
    });
  }
};
// - createDish
export const createDish = (dishData, imageFile) => async (dispatch) => {
  try {
    dispatch({ type: "CREATE_DISH_REQUEST" });

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("dish", JSON.stringify(dishData));
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const response = await fetch("http://localhost:8080/api/dishes", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Errore nella creazione del piatto");
    }

    dispatch({
      type: "CREATE_DISH_SUCCESS",
      payload: await response.json(),
    });
  } catch (error) {
    dispatch({
      type: "CREATE_DISH_FAILURE",
      payload: error.message,
    });
  }
};

// - updateDish
export const updateDish = (dishId, dishData) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_DISH_REQUEST" });

    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8080/api/dishes/${dishId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dishData),
    });

    if (!response.ok) {
      throw new Error("Errore nell'aggiornamento del piatto");
    }

    dispatch({
      type: "UPDATE_DISH_SUCCESS",
      payload: await response.json(),
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_DISH_FAILURE",
      payload: error.message,
    });
  }
};

// - deleteDish
export const deleteDish = (dishId) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_DISH_REQUEST" });

    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8080/api/dishes/${dishId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Errore nella cancellazione del piatto");
    }

    dispatch({
      type: "DELETE_DISH_SUCCESS",
      payload: dishId,
    });
  } catch (error) {
    dispatch({
      type: "DELETE_DISH_FAILURE",
      payload: error.message,
    });
  }
};
// - confirmReservation
export const confirmReservation = (reservationCode) => async (dispatch) => {
  try {
    dispatch({ type: "CONFIRM_RESERVATION_REQUEST" });

    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8080/api/prenotazioni/${reservationCode}/conferma`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Errore nella conferma della prenotazione");
    }

    dispatch({
      type: "CONFIRM_RESERVATION_SUCCESS",
      payload: await response.json(),
    });
  } catch (error) {
    dispatch({
      type: "CONFIRM_RESERVATION_FAILURE",
      payload: error.message,
    });
  }
};
// - cancelReservation
export const cancelReservation = (reservationCode) => async (dispatch) => {
  try {
    dispatch({ type: "CANCEL_RESERVATION_REQUEST" });

    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8080/api/prenotazioni/${reservationCode}/annulla`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Errore nell'annullamento della prenotazione");
    }

    dispatch({
      type: "CANCEL_RESERVATION_SUCCESS",
      payload: await response.json(),
    });
  } catch (error) {
    dispatch({
      type: "CANCEL_RESERVATION_FAILURE",
      payload: error.message,
    });
  }
};
// -getReservation
export const getReservationDetails = (reservationCode) => async (dispatch) => {
  try {
    dispatch({ type: "GET_RESERVATION_REQUEST" });

    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8080/api/prenotazioni/${reservationCode}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Errore nel recupero dei dettagli della prenotazione");
    }

    dispatch({
      type: "GET_RESERVATION_SUCCESS",
      payload: await response.json(),
    });
  } catch (error) {
    dispatch({
      type: "GET_RESERVATION_FAILURE",
      payload: error.message,
    });
  }
};
// - immaginiConCloudinary
export const uploadImage = (file) => async (dispatch) => {
  try {
    dispatch({ type: "UPLOAD_IMAGE_REQUEST" });

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:8080/api/images/uploadme", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Errore nel caricamento dell'immagine");
    }

    dispatch({
      type: "UPLOAD_IMAGE_SUCCESS",
      payload: await response.json(),
    });
  } catch (error) {
    dispatch({
      type: "UPLOAD_IMAGE_FAILURE",
      payload: error.message,
    });
  }
};
// Actions per la gestione degli utenti
export const fetchUsers = () => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_USERS_REQUEST" });

    const token = localStorage.getItem("token");
    const [usersRes, activeUsersRes, blockedUsersRes] = await Promise.all([
      fetch("http://localhost:8080/api/auth/users", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch("http://localhost:8080/api/auth/users/active", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      fetch("http://localhost:8080/api/auth/users/blocked", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

    if (!usersRes.ok || !activeUsersRes.ok || !blockedUsersRes.ok) {
      throw new Error("Errore nel caricamento degli utenti");
    }

    const [users, activeUsers, blockedUsers] = await Promise.all([
      usersRes.json(),
      activeUsersRes.json(),
      blockedUsersRes.json(),
    ]);

    dispatch({
      type: "FETCH_USERS_SUCCESS",
      payload: {
        users,
        activeUsers,
        blockedUsers,
      },
    });
  } catch (error) {
    dispatch({
      type: "FETCH_USERS_FAILURE",
      payload: error.message,
    });
  }
};

export const blockUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "BLOCK_USER_REQUEST" });

    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8080/api/auth/users/${userId}/block`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Errore nel blocco dell'utente");
    }

    dispatch({
      type: "BLOCK_USER_SUCCESS",
      payload: userId,
    });
  } catch (error) {
    dispatch({
      type: "BLOCK_USER_FAILURE",
      payload: error.message,
    });
  }
};

export const unblockUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "UNBLOCK_USER_REQUEST" });

    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8080/api/auth/users/${userId}/unblock`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Errore nello sblocco dell'utente");
    }

    dispatch({
      type: "UNBLOCK_USER_SUCCESS",
      payload: userId,
    });
  } catch (error) {
    dispatch({
      type: "UNBLOCK_USER_FAILURE",
      payload: error.message,
    });
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_USER_REQUEST" });

    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8080/api/auth/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Errore nella cancellazione dell'utente");
    }

    dispatch({
      type: "DELETE_USER_SUCCESS",
      payload: userId,
    });
  } catch (error) {
    dispatch({
      type: "DELETE_USER_FAILURE",
      payload: error.message,
    });
  }
};

export const getUserDetails = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "GET_USER_DETAILS_REQUEST" });

    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:8080/api/auth/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Errore nel recupero dei dettagli dell'utente");
    }

    dispatch({
      type: "GET_USER_DETAILS_SUCCESS",
      payload: await response.json(),
    });
  } catch (error) {
    dispatch({
      type: "GET_USER_DETAILS_FAILURE",
      payload: error.message,
    });
  }
};
