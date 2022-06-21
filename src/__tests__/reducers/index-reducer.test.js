import rootReducer from '../../reducers/index';
import { createStore } from 'redux';
import formVisibleReducer from '../../reducers/form-visible-reducer';
import ticketListReducer from '../../reducers/ticket-list-reducer';

// A smoke test is just a simple test to ensure the basic functionality works. It isn't comprehensive testing, but it will get the job done.
// TO TEST THAT OUR ROOT REDUCER IS ACTUALLY CONNECTED TO OUR OTHER REDUCERS
let store = createStore(rootReducer);

describe("rootReducer", () => {
// As with our other reducer tests, the first - and simplest - behavior we can test is that the reducer returns the default state.
// The default state for our root reducer is: 
    // {
    //   mainTicketList: {},
    //   formVisibleOnPage: false
    // }
  test('Should return default state if no action type is recognized', () => {
    expect(rootReducer({}, { type: null })).toEqual({
      mainTicketList: {},
      formVisibleOnPage: false
    });
  });

  // We'll add a few tests to ensure that our root reducer is returning the default state of each individual reducer:
  // Note: These tests are checking the same thing, first with our reducer for the ticket list and then with our reducer for form visibility: does the default state of our combined reducer match the state slice of the root reducer? This is part of the reason we need to instantiate a store - so we can use Redux's getState() method.

  test('Check that initial state of ticketListReducer matches root reducer', () => {
    expect(store.getState().mainTicketList).toEqual(ticketListReducer(undefined, { type: null }));
  });
  
  test('Check that initial state of formVisibleReducer matches root reducer', () => {
    expect(store.getState().formVisibleOnPage).toEqual(formVisibleReducer(undefined, { type: null }));
  });


  // We'll do one more pair of tests. These tests will ensure that when we pass actions into our combined reducers, the root reducer reflects those changes.
  // Note: In both of these tests, we dispatch an action. We then expect our root reducer to properly handle those actions by passing them into our individual reducers. The store's state slice should be updated accordingly - and should be equal to the return result of the individual reducer that handled the action.
  // test('Check that ADD_TICKET action works for ticketListReducer and root reducer', () => {
  //   const action = {
  //     type: 'ADD_TICKET',
  //     names: 'Ryan & Aimen',
  //     location: '4b',
  //     issue: 'Redux action is not working correctly.',
  //     id: 1
  //   }
  //   store.dispatch(action);
  //   expect(store.getState().mainTicketList).toEqual(ticketListReducer(undefined, action));
  // });
  
  test('Check that TOGGLE_FORM action works for formVisibleReducer and root reducer', () => {
    const action = {
      type: 'TOGGLE_FORM'
    }
    store.dispatch(action);
    expect(store.getState().formVisibleOnPage).toEqual(formVisibleReducer(undefined, action));
  });
  

});
