const initialState = {
  loading: false,
  error: null,
  success: null,
  categories: [],
  dishes: [],
  reservations: [],
  users: [],
  activeUsers: [],
  blockedUsers: [],
  selectedCategory: null,
  selectedDish: null,
  selectedReservation: null,
  selectedUser: null,
  imageUpload: {
    loading: false,
    error: null,
    success: null,
    url: null,
  },
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    // Dashboard
    case "FETCH_ADMIN_DASHBOARD_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };
    case "FETCH_ADMIN_DASHBOARD_SUCCESS":
      return {
        ...state,
        loading: false,
        categories: action.payload.categories,
        dishes: action.payload.dishes,
        reservations: action.payload.reservations,
        success: "Dashboard caricata con successo",
      };
    case "FETCH_ADMIN_DASHBOARD_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: null,
      };

    // Categorie
    case "CREATE_CATEGORY_REQUEST":
    case "UPDATE_CATEGORY_REQUEST":
    case "DELETE_CATEGORY_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };
    case "CREATE_CATEGORY_SUCCESS":
      return {
        ...state,
        loading: false,
        categories: [...state.categories, action.payload],
        success: "Categoria creata con successo",
      };
    case "UPDATE_CATEGORY_SUCCESS":
      return {
        ...state,
        loading: false,
        categories: state.categories.map((category) => (category.id === action.payload.id ? action.payload : category)),
        success: "Categoria aggiornata con successo",
      };
    case "DELETE_CATEGORY_SUCCESS":
      return {
        ...state,
        loading: false,
        categories: state.categories.filter((category) => category.id !== action.payload),
        success: "Categoria eliminata con successo",
      };
    case "CREATE_CATEGORY_FAILURE":
    case "UPDATE_CATEGORY_FAILURE":
    case "DELETE_CATEGORY_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: null,
      };

    // Piatti
    case "CREATE_DISH_REQUEST":
    case "UPDATE_DISH_REQUEST":
    case "DELETE_DISH_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };
    case "CREATE_DISH_SUCCESS":
      return {
        ...state,
        loading: false,
        dishes: [...state.dishes, action.payload],
        success: "Piatto creato con successo",
      };
    case "UPDATE_DISH_SUCCESS":
      return {
        ...state,
        loading: false,
        dishes: state.dishes.map((dish) => (dish.id === action.payload.id ? action.payload : dish)),
        success: "Piatto aggiornato con successo",
      };
    case "DELETE_DISH_SUCCESS":
      return {
        ...state,
        loading: false,
        dishes: state.dishes.filter((dish) => dish.id !== action.payload),
        success: "Piatto eliminato con successo",
      };
    case "CREATE_DISH_FAILURE":
    case "UPDATE_DISH_FAILURE":
    case "DELETE_DISH_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: null,
      };

    // Prenotazioni
    case "CONFIRM_RESERVATION_REQUEST":
    case "CANCEL_RESERVATION_REQUEST":
    case "GET_RESERVATION_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };
    case "CONFIRM_RESERVATION_SUCCESS":
      return {
        ...state,
        loading: false,
        reservations: state.reservations.map((reservation) =>
          reservation.id === action.payload.id ? action.payload : reservation
        ),
        success: "Prenotazione confermata con successo",
      };
    case "CANCEL_RESERVATION_SUCCESS":
      return {
        ...state,
        loading: false,
        reservations: state.reservations.map((reservation) =>
          reservation.id === action.payload.id ? action.payload : reservation
        ),
        success: "Prenotazione annullata con successo",
      };
    case "GET_RESERVATION_SUCCESS":
      return {
        ...state,
        loading: false,
        selectedReservation: action.payload,
        success: "Dettagli prenotazione caricati con successo",
      };
    case "CONFIRM_RESERVATION_FAILURE":
    case "CANCEL_RESERVATION_FAILURE":
    case "GET_RESERVATION_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: null,
      };

    // Immagini
    case "UPLOAD_IMAGE_REQUEST":
    case "DELETE_IMAGE_REQUEST":
      return {
        ...state,
        imageUpload: {
          ...state.imageUpload,
          loading: true,
          error: null,
          success: null,
        },
      };
    case "UPLOAD_IMAGE_SUCCESS":
      return {
        ...state,
        imageUpload: {
          loading: false,
          error: null,
          success: "Immagine caricata con successo",
          url: action.payload.url,
        },
      };
    case "UPLOAD_IMAGE_FAILURE":
    case "DELETE_IMAGE_FAILURE":
      return {
        ...state,
        imageUpload: {
          loading: false,
          error: action.payload,
          success: null,
          url: null,
        },
      };

    // Utenti
    case "FETCH_USERS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };
    case "FETCH_USERS_SUCCESS":
      return {
        ...state,
        loading: false,
        users: action.payload.users,
        activeUsers: action.payload.activeUsers,
        blockedUsers: action.payload.blockedUsers,
        success: "Utenti caricati con successo",
      };
    case "FETCH_USERS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: null,
      };

    case "BLOCK_USER_REQUEST":
    case "UNBLOCK_USER_REQUEST":
    case "DELETE_USER_REQUEST":
    case "GET_USER_DETAILS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };
    case "BLOCK_USER_SUCCESS": {
      const blockedUser = state.users.find((user) => user.id === action.payload);
      return {
        ...state,
        loading: false,
        users: state.users.map((user) => (user.id === action.payload ? { ...user, isBlocked: true } : user)),
        blockedUsers: blockedUser ? [...state.blockedUsers, { ...blockedUser, isBlocked: true }] : state.blockedUsers,
        activeUsers: state.activeUsers.filter((user) => user.id !== action.payload),
        success: "Utente bloccato con successo",
      };
    }
    case "UNBLOCK_USER_SUCCESS": {
      const unblockedUser = state.users.find((user) => user.id === action.payload);
      return {
        ...state,
        loading: false,
        users: state.users.map((user) => (user.id === action.payload ? { ...user, isBlocked: false } : user)),
        blockedUsers: state.blockedUsers.filter((user) => user.id !== action.payload),
        activeUsers: unblockedUser ? [...state.activeUsers, { ...unblockedUser, isBlocked: false }] : state.activeUsers,
        success: "Utente sbloccato con successo",
      };
    }
    case "DELETE_USER_SUCCESS":
      return {
        ...state,
        loading: false,
        users: state.users.filter((user) => user.id !== action.payload),
        activeUsers: state.activeUsers.filter((user) => user.id !== action.payload),
        blockedUsers: state.blockedUsers.filter((user) => user.id !== action.payload),
        success: "Utente eliminato con successo",
      };
    case "GET_USER_DETAILS_SUCCESS":
      return {
        ...state,
        loading: false,
        selectedUser: action.payload,
        success: "Dettagli utente caricati con successo",
      };
    case "BLOCK_USER_FAILURE":
    case "UNBLOCK_USER_FAILURE":
    case "DELETE_USER_FAILURE":
    case "GET_USER_DETAILS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: null,
      };

    default:
      return state;
  }
};

export default adminReducer;
