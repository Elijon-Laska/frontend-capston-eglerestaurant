const initialState = {
  dishes: {
    ANTIPASTI: [],
    PRIMI: [],
    SECONDI: [],
    CONTORNI: [],
    DOLCI: [],
  },
  loading: false,
  error: null,
  selectedDish: null,
  showDishDetails: false,
};

const dishesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_DISHES_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_DISHES_SUCCESS":
      return {
        ...state,
        loading: false,
        dishes: {
          ANTIPASTI: action.payload.antipasti,
          PRIMI: action.payload.primi,
          SECONDI: action.payload.secondi,
          CONTORNI: action.payload.contorni,
          DOLCI: action.payload.dolci,
        },
      };
    case "SHOW_DISH_DETAILS":
      return {
        ...state,
        selectedDish: action.payload,
        showDishDetails: true,
      };
    case "CLOSE_DISH_DETAILS":
      return {
        ...state,
        selectedDish: null,
        showDishDetails: false,
      };
    case "FETCH_DISHES_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default dishesReducer;
