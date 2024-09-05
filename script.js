//initial state
const initialState = [
  {
    id: 1,
    value: 0,
    incrementValue: 1,
    decrementValue: 1,
  },
];

//action identifiers
const ADD_ROW = "add";
const INCREMENT = "increment";
const DECREMENT = "decrement";
const DELETE_ROW = "delete";
const RESET = "reset";

//action creators
const addRow = () => {
  return {
    type: ADD_ROW,
  };
};
const deletRow = (id) => {
  return {
    type: DELETE_ROW,
    payloads: id,
  };
};
const incrementValue = (recordId, value) => {
  return {
    type: INCREMENT,
    payloads: {
      id: recordId,
      val: value,
    },
  };
};
const decrementValue = (recordId, value) => {
  return {
    type: DECREMENT,
    payloads: {
      id: recordId,
      val: value,
    },
  };
};
const reset = () => {
  return {
    type: RESET,
  };
};

//Reducer
function scoreReducer(state = initialState, action) {
  if (action.type === ADD_ROW) {
    return [
      ...state,
      {
        id: state.length + 1,
        value: 0,
        incrementValue: 1,
        decrementValue: 1,
      },
    ];
  } 
  if (action.type === INCREMENT) {
    const { id, val } = action.payloads;
    return state.map((obj) => {
      // console.log(obj.id,id,val,obj.value);
      if (obj.id === id) {
        return {
          ...obj,
          value: obj.value==-1?val:obj.value + val,
        };
      } else {
        return {
          ...obj,
        };
      }
    });
  }

  if (action.type === DECREMENT) {
    const { id, val } = action.payloads;
    console.log(val+1);
    return state.map((obj) => {
      if (obj.id === id) {
        return {
          ...obj,
          value:obj.value-val>=0?obj.value - val:-1,
        };
      } else {
        return {
          ...obj,
        };
      }
    });
  }

  if (action.type === DELETE_ROW) {
    const id = action.payloads;
    return state.filter((obj) => obj.id !== id);
  }

  if (action.type === RESET) {
    console.log('object');
    return state.map((obj) => {
      return {
        ...obj,
        value: 0,
      };
    });
  }
  return state;
}

//ui element select
const resetField = document.getElementById("reset");
const addMatchField = document.getElementById("addMatch");
const parentContainer = document.getElementById("parent-container");

//creating store
const store = Redux.createStore(scoreReducer);

//add row
addMatchField.addEventListener("click", () => {
  store.dispatch(addRow());
});

// delete row
// deleteField.addEventListener("click", () => {
//   store.dispatch(deletRow(1));
// });
// deleteField.addEventListener("click", (event) => {
//   if (event.target.closest('.delete')) {
//     const id = parseInt(event.target.closest('.delete').dataset.id, 10);
//     store.dispatch(deleteRow(id));
//   }
// });


const renderMatch = () => {
  const state = store.getState();
  let components = "";
  state.forEach((component) => {
    components += `
        <div class="match">
                    <div class="wrapper">
                        <button class="delete" id="delete-${component.id}">
                            <img src="./image/delete.svg" alt="" />
                        </button>
                        <h3 class="matchName">Match ${component.id}</h3>
                    </div>
                    <div class="inc-dec">
                        <form class="incrementForm" id="incrementSubmission-${component.id}">
                            <h4>Increment</h4>
                            <input
                                type="number"
                                name="increment"
                                class="increment"
                                id="increment-${component.id}"
                            />
                        </form>
                        <form class="decrementForm" id="decrementSubmission-${component.id}">
                            <h4>Decrement</h4>
                            <input
                                type="number"
                                name="decrement"
                                class="decrement"
                                id="decrement-${component.id}"
                            />
                        </form>
                    </div>
                    <div class="numbers">
                        <h2 class="singleResult" id="display-${component.id}">
                        ${
                          component.value==-1?"Out of Bound":component.value
                        }</h2>
                    </div>
            </div>
        
        `;
  });
  parentContainer.innerHTML = components;


  state.forEach((component) => {
    const deleteButton = document.getElementById(`delete-${component.id}`);
    const incrementField = document.getElementById(`increment-${component.id}`);
    const decrementField = document.getElementById(`decrement-${component.id}`);
    const incrementSubmit = document.getElementById(`incrementSubmission-${component.id}`);
    const decrementSubmit = document.getElementById(`decrementSubmission-${component.id}`);

    incrementField.focus();
    // Add event listener to the delete button
    deleteButton.addEventListener('click', () => {
      store.dispatch(deletRow(component.id));
    });

    incrementSubmit.addEventListener('submit',(event)=>{
      event.preventDefault();
      const val = parseInt(incrementField.value);
      // console.log(typeof val);
      // console.log(component.id,val);
      if(!isNaN(val))
        store.dispatch(incrementValue(component.id,val));
    });
    decrementSubmit.addEventListener('submit',(event)=>{
      event.preventDefault();
      const val = parseInt(decrementField.value); 
      if(!isNaN(val))     
        store.dispatch(decrementValue(component.id,val));
    });

    // // increment field
    // incrementField.addEventListener('input',(event)=>{
    //   console.log(event);      
    //   console.log(event.target.value);

    // });

  });


  



};

//initial call
renderMatch();
//subscribe
store.subscribe(renderMatch);

resetField.addEventListener('click',()=>{
  store.dispatch(reset());
});

