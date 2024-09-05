
const database = [];


const addMatch = document.getElementById("addMatch");
const container = document.getElementById("container");



//increment
const handleIncrement = (event,id) =>{
    event.preventDefault();
    const elementId = "increment"+id;
    const value = document.getElementById(elementId).value;
    // console.log(elementId);

    database.map(obj=>{
        if(obj.id==id){
            obj.score = obj.score+value;
        }
    })
    console.log(database);
    
}



const handleAddMatch = (event) => {
    event.preventDefault();

    container.innerHTML ="";
    database.push({
        name:"Match "+(database.length+1).toString(),
        id:database.length+1,
        score:0,
    });

    // console.log(database);
    database.map(obj=>{
        const div = document.createElement("div");
        div.innerHTML = `
                          <div class="match">
                              <div class="wrapper">
                                  <button id=${obj.id} class="delete">
                                      <img src="./image/delete.svg" alt="" />
                                  </button>
                                  <h3 class="matchName">${obj.name}</h3>
                              </div>
                              <div class="inc-dec">
                                  <form onsubmit="handleIncrement(event,${obj.id})" class="incrementForm">
                                      <h4>Increment</h4>
                                      <input
                                          type="number"
                                          name="increment"
                                          class="increment"
                                          id="increment${obj.id}"
                                      />
                                  </form>
                                  <form class="decrementForm">
                                      <h4>Decrement</h4>
                                      <input
                                          type="number"
                                          name="decrement"
                                          class="decrement"
                                      />
                                  </form>
                              </div>
                              <div class="numbers">
                                  <h2 class="singleResult">${obj.score}</h2>
                              </div>
                      </div>
          
          `;
        container.appendChild(div);

    })

};
