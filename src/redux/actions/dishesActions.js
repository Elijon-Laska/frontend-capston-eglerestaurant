export const fetchDishes = () => async (dispatch) => {
  try {
    dispatch({ type: 'FETCH_DISHES_REQUEST' });
    
    console.log('Fetching dishes from backend...');
    
    // Set up the base URL for the backend API
    const baseUrl = 'http://localhost:8080';
    
    // Fetch dishes by category using fetch API with proper headers
    const [antipastiRes, primiRes, secondiRes] = await Promise.all([
      fetch(`${baseUrl}/api/dishes/category/ANTIPASTI`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }),
      fetch(`${baseUrl}/api/dishes/category/PRIMI`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }),
      fetch(`${baseUrl}/api/dishes/category/SECONDI`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
    ]);

    // Check if responses are successful
    if (!antipastiRes.ok || !primiRes.ok || !secondiRes.ok) {
      throw new Error('API response not successful');
    }

    const [antipastiData, primiData, secondiData] = await Promise.all([
      antipastiRes.json(),
      primiRes.json(),
      secondiRes.json()
    ]);

    console.log('Antipasti data:', antipastiData);
    console.log('Primi data:', primiData);
    console.log('Secondi data:', secondiData);

    dispatch({
      type: 'FETCH_DISHES_SUCCESS',
      payload: {
        antipasti: antipastiData,
        primi: primiData,
        secondi: secondiData
      }
    });
    console.log('Successfully fetched dishes:', {
      antipasti: antipastiData,
      primi: primiData,
      secondi: secondiData
    });
  } catch (error) {
    console.error('Failed to fetch dishes:', error);
    dispatch({
      type: 'FETCH_DISHES_FAILURE',
      payload: error.message
    });
  }
};

export const showDishDetails = (dish) => (dispatch) => {
  dispatch({
    type: 'SHOW_DISH_DETAILS',
    payload: dish
  });
};
