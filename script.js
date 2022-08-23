// Initial State
const initialState = [
  {
    id: 0,
    value: 0,
    incrementBy: 1,
    decrementBy: 1,
  },
];



// Action Identifier
const ADD_COUNTER = 'addCounter';
const RESET_COUNTERS = 'resetCounters';
const INCREMENT = 'increment';
const DECREMENT = 'decrement';


// action creators
const addCounter = () => {
    return {
        type: ADD_COUNTER
    }
}


const resetCounters = () => {
    return {
        type: RESET_COUNTERS
    }
}

const increment = (counterId, value) => {
    return {
        type: INCREMENT,
        payload: value
    }
}

const decrement = (counterId, value) => {
    return {
        type: DECREMENT,
        payload: value
    }
}

// Helper Function
function nextCounterId(counters){
    const maxId = counters.reduce(
        (maxId, counter) => Math.max(counter.id, maxId),
        -1
    );

    return maxId + 1;
}

function incrementHandeler(id, incrementBy){
    store.dispatch(increment(id,incrementBy));
}
function decrementHandeler(id, decrementBy){
    store.dispatch(decrement(id, decrementBy));
}




// Create Reducer method
 function counterReducer(state = initialState, action) {
    if(action.type === ADD_COUNTER) {
        return [
            ...state,
            {
                id: nextCounterId(state),
                value: 0,
                incrementBy: Math.floor(Math.random()*10) + 1, //Returns random integer from 1 to 9,
                decrementBy: Math.floor(Math.random()*10) + 1, //Returns random integer from 1 to 9,
                
            }
        ];
    }  
    
    if( action.type === RESET_COUNTERS ){
        
        return state.map( (counter) => ({
            ...counter,
            value: 0
        }));
    } 


    if( action.type === INCREMENT){
        const {counterId, value} = action.payload;
        return state.map((counter) => {
            if(counter.id  == counterId){
                return {
                    ...counter,
                    value: counter.value + value,
                };
            }
            return {
              ...counter,
            };
        });
    }

    if( action.type === DECREMENT){
        const {counterId, value} = action.payload;
        return state.map((counter) => {
            if(counter.id  == counterId){
                return {
                    ...counter,
                    value: counter.value - value,
                };
            }
            return {
              ...counter,
            };
        });
    }


 }


// Call to Subscribe

// Create Store

const store = Redux.createStore(counterReducer);


// Select Dom Elements

const countersContainer = document.getElementById('counters-container');
const addCounterButton = document.getElementById('add-counter');
const resetCounterButton = document.getElementById('reset-counter');


const render = () => {
    const state = store.getState();
   console.log(typeof state);


//    console.log(d);

//    for (let i = 0; i < state.length; i++) {
//     const element = array[i];
    
//    }

    let countersMarkup = "";

    // state.forEach((counter) => {
    //     countersMarkup += `<div
    //     class="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow"
    // >
    //     <div class="text-2xl font-semibold text-neutral-800" id="counter">${counter.value}</div>
    //     <div class="flex space-x-3">
    //         <button
    //             class="bg-indigo-400 text-white px-3 py-2 rounded shadow"
    //             onclick="incrementHandler(${counter.id}, ${counter.incrementBy})"
    //         >
    //             Increment
    //         </button>
    //         <button
    //             class="bg-red-400 text-white px-3 py-2 rounded shadow"
    //             id="decrementHandler(${counter.id}, ${counter.incrementBy})"
    //         >
    //             Decrement
    //         </button>
    //     </div>
    // </div>`;
    // });


   

    countersContainer.innerHTML = countersMarkup;
};

// Update UI initially
render();


store.subscribe(render);


// Button Click Listeners

addCounterButton.addEventListener('click', () => {
    store.dispatch(addCounter());
});

resetCounterButton.addEventListener('click', ()=>{
    store.dispatch(resetCounters());
});


// Handle Event Listner
// incrementEl.addEventListener('click', ()=>{

//     store.dispatch({
//         type: 'increment'
//     });
// });


// decrementEl.addEventListener('click', ()=>{

//     store.dispatch({
//         type: 'decrement'
//     });
// });


