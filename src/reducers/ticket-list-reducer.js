import * as c from './../actions/ActionTypes';

export default (state = {}, action) => {
  const { names, location, issue, id, formattedWaitTime, timeOpen } = action;
  switch (action.type) {
    // case c.ADD_TICKET:
    //   return Object.assign({}, state, {
    //     [id]: {
    //       names: names,
    //       location: location,
    //       issue: issue,
    //       id: id,
    //       timeOpen: timeOpen,
    //       formattedWaitTime: formattedWaitTime
    //     }
    //   });

    case c.DELETE_TICKET:
      let newState = { ...state };
      delete newState[id];
      return newState; 
    // default:
    //   return state;
      

    case c.UPDATE_TIME:
      const newTicket = Object.assign({}, state[id], {formattedWaitTime});
      const updatedState = Object.assign({}, state, {
        [id]: newTicket
      });
      return updatedState;
    default:
      return state;
  }
};


// Note: We've successfully created a reducer that will take actions to add, update, and delete tickets - all the CRUD functionality we will need for our help queue's ticket list. Once again, note that all reducers must be pure functions and we aren't actually adding, updating or removing tickets from anywhere yet. The Redux store will take care of that.
