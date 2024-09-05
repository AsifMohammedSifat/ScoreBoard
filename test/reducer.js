// Reducer
function scoreReducer(state = initialState, action) {
    switch (action.type) {
      case ADD_ROW:
        return [
          ...state,
          {
            id: state.length,
            value: 0,
            incrementValue: 1,
            decrementValue: 1,
          },
        ];
        
      case INCREMENT:
        return state.map((obj) =>
          obj.id === action.payloads.id
            ? { ...obj, value: obj.value + action.payloads.value }
            : obj
        );
  
      case DECREMENT:
        return state.map((obj) =>
          obj.id === action.payloads.id
            ? { ...obj, value: Math.max(0, obj.value - action.payloads.value) }
            : obj
        );
  
      case DELETE_ROW:
        return state.filter((obj) => obj.id !== action.payloads);
  
      case RESET:
        return state.map((obj) => ({ ...obj, value: 0 }));
  
      default:
        return state;
    }
  }
  