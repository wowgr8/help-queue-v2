import formVisibleReducer from "./form-visible-reducer";
import ticketListReducer from "./ticket-list-reducer";
import { combineReducers } from "redux";   // Whenever we create a reducer that combines other reducers, we need to import this function.
// combineReducers() takes an object as an argument. That object contains key-value pairs. The key represents the state slice while the value represents the reducer that handles actions related to that state slice. Our formVisibleReducer handles the formVisibleOnPage state slice while our ticketListReducer handles the mainTicketList state slice.

const rootReducer = combineReducers({
  formVisibleOnPage: formVisibleReducer,
  mainTicketList: ticketListReducer
});

export default rootReducer;