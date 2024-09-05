// Initial state
const initialState = [
    {
      id: 0,
      value: 0,
      incrementValue: 1,
      decrementValue: 1,
    },
  ];
  
  // Action identifiers
  const ADD_ROW = "add";
  const INCREMENT = "increment";
  const DECREMENT = "decrement";
  const DELETE_ROW = "delete";
  const RESET = "reset";
  
  // Action creators
  const addRow = () => ({
    type: ADD_ROW,
  });
  
  const deleteRow = (id) => ({
    type: DELETE_ROW,
    payload: id,
  });
  
  const incrementValue = (recordId, value) => ({
    type: INCREMENT,
    payload: {
      id: recordId,
      value: value,
    },
  });
  
  const decrementValue = (recordId, value) => ({
    type: DECREMENT,
    payload: {
      id: recordId,
      value: value,
    },
  });
  
  const reset = () => ({
    type: RESET,
  });
  
  // Reducer
  function scoreReducer(state = initialState, action) {
    switch (action.type) {
      case ADD_ROW:
        return [
          ...state,
          {
            id: state.length, // Updated to use state.length
            value: 0,
            incrementValue: 1,
            decrementValue: 1,
          },
        ];
  
      case INCREMENT:
        return state.map((obj) =>
          obj.id === action.payload.id
            ? { ...obj, value: obj.value + action.payload.value }
            : obj
        );
  
      case DECREMENT:
        return state.map((obj) =>
          obj.id === action.payload.id
            ? { ...obj, value: Math.max(0, obj.value - action.payload.value) } // Prevent negative values
            : obj
        );
  
      case DELETE_ROW:
        return state.filter((obj) => obj.id !== action.payload);
  
      case RESET:
        return state.map((obj) => ({ ...obj, value: 0 }));
  
      default:
        return state;
    }
  }
  
  // Creating store
  const store = Redux.createStore(scoreReducer);
  
  // UI Elements
  const addMatchField = document.getElementById("addMatch");
  const parentContainer = document.getElementById("parent-container");
  
  // UI
  const render = () => {
    const state = store.getState();
    let components = "";
  
    state.forEach((component) => {
      components += `
        <div class="match">
          <div class="wrapper">
            <button class="delete" data-id="${component.id}">
              <img src="./image/delete.svg" alt="" />
            </button>
            <h3 class="matchName">Match ${component.id}</h3>
          </div>
          <div class="inc-dec">
            <form class="incrementForm" data-id="${component.id}">
              <h4>Increment</h4>
              <input
                type="number"
                name="increment"
                class="increment"
                data-id="${component.id}"
              />
            </form>
            <form class="decrementForm" data-id="${component.id}">
              <h4>Decrement</h4>
              <input
                type="number"
                name="decrement"
                class="decrement"
                data-id="${component.id}"
              />
            </form>
          </div>
          <div class="numbers">
            <h2 class="singleResult">${component.value}</h2>
          </div>
        </div>
      `;
    });
    
    parentContainer.innerHTML = components;
  };
  
  // Initial call
  render();
  
  // Subscribe
  store.subscribe(render);
  
  // Event Listeners
  addMatchField.addEventListener("click", () => {
    store.dispatch(addRow());
  });
  
  parentContainer.addEventListener("click", (event) => {
    if (event.target.closest('.delete')) {
      const id = parseInt(event.target.closest('.delete').dataset.id, 10);
      store.dispatch(deleteRow(id));
    }
  });
  
  parentContainer.addEventListener("submit", (event) => {
    event.preventDefault();
    const id = parseInt(event.target.dataset.id, 10);
    if (event.target.classList.contains('incrementForm')) {
      const value = parseInt(event.target.querySelector('.increment').value, 10);
      store.dispatch(incrementValue(id, value));
    }
    if (event.target.classList.contains('decrementForm')) {
      const value = parseInt(event.target.querySelector('.decrement').value, 10);
      store.dispatch(decrementValue(id, value));
    }
  });
  