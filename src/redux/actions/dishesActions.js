export const fetchDishes = () => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_DISHES_REQUEST" });

    console.log("piatti fetchati dal backend...");

    const baseUrl = "http://localhost:8080";

    const [antipastiRes, primiRes, secondiRes, contorniRes, dolciRes] = await Promise.all([
      fetch(`${baseUrl}/api/dishes/category/ANTIPASTI`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
      fetch(`${baseUrl}/api/dishes/category/PRIMI`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
      fetch(`${baseUrl}/api/dishes/category/SECONDI`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
      fetch(`${baseUrl}/api/dishes/category/CONTORNI`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
      fetch(`${baseUrl}/api/dishes/category/DOLCI`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }),
    ]);

    if (!antipastiRes.ok || !primiRes.ok || !secondiRes.ok || !contorniRes.ok || !dolciRes.ok) {
      throw new Error("Richiesta API Fallita ");
    }

    const [antipastiData, primiData, secondiData, contorniData, dolciData] = await Promise.all([
      antipastiRes.json(),
      primiRes.json(),
      secondiRes.json(),
      contorniRes.json(),
      dolciRes.json(),
    ]);

    console.log("ANTIPASTI data:", antipastiData);
    console.log("PRIMI data:", primiData);
    console.log("SECONDI data:", secondiData);
    console.log("CONTORNI data:", contorniData);
    console.log("DOLCI data:", dolciData);

    dispatch({
      type: "FETCH_DISHES_SUCCESS",
      payload: {
        antipasti: antipastiData,
        primi: primiData,
        secondi: secondiData,
        contorni: contorniData,
        dolci: dolciData,
      },
    });
    console.log("Piatti fetchati con successo:", {
      antipasti: antipastiData,
      primi: primiData,
      secondi: secondiData,
    });
  } catch (error) {
    console.error("Fetch dei piatti fallita:", error);
    dispatch({
      type: "FETCH_DISHES_FAILURE",
      payload: error.message,
    });
  }
};

export const showDishDetails = (dish) => (dispatch) => {
  dispatch({
    type: "SHOW_DISH_DETAILS",
    payload: dish,
  });
};
