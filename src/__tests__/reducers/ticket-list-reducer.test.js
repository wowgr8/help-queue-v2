// We will start by importing our reducer. (Note that we haven't actually created any reducers yet.) 
// We'll store the imported code in a variable called ticketListReducer. We will have to jump up two directories in our relative path (../../) to reach the reducers directory where our ticket list reducer will be stored.
import ticketListReducer from '../../reducers/ticket-list-reducer';

describe('ticketListReducer', () => {

  let action;
  const ticketData = {
    names: 'Ryan & Aimen',
    location: '4b',
    issue: 'Redux action is not working correctly.',
    id: 1
  }

  const currentState = {
    1: {names: 'Ryan & Aimen',
    location: '4b',
    issue: 'Redux action is not working correctly.',
    id: 1 },
    2: {names: 'Jasmine and Justine',
    location: '2a',
    issue: 'Reducer has side effects.',
    id: 2 }
  };


//A quick refresher:
// describe blocks are for grouping together related tests. All of our ticketListReducer tests will be grouped together in one describe block.
// test refers to the individual test. This test will make sure our reducer returns the correct default value.
// Our expect statement lets our test know what the expected value will be.

  test('Should return default state if ther is no action type passed into the reducer', () => {
    expect(ticketListReducer({}, {type: null})).toEqual({});
          // As we can see here, our reducer will take two arguments. The first argument is the current state while the second argument is an action that will be applied to the current state. Note that the action's type is stored inside an object. This object can potentially contain other things besides the name of the action itself.
          // AKA: - What is the thing that needs to be changed (the current state)?
          //      - How should that thing be changed (what action should be applied to that thing)?

          // Looking at our test above, our expectation should be clear. If our current state is an empty object {} and we do nothing to it (the action type is null), then the reducer should return the current state {}.
  })
  



  // Writing a Test for Adding Tickets:
  // In order to write a test for adding tickets, we'll need to provide some ticket data at the top of the describe block:
  // We're doing two things:
    // - We declare an action but don't define it yet. Each of our new tests will define what the action should be (whether that is adding, updating, or deleting a ticket).
    // - We create a ticketData constant that provides ticket information for testing purposes.

  // In our new test below, we use ES6 destructuring syntax to provide keys from our ticketData to the scope of our test.
  // In the last lesson, we briefly touched on the fact that our action can contain more than just the action's type. In the test above, our action has a type of ADD_TICKET. However, our reducer won't be able to do anything useful unless it also has information about the ticket it is supposed to add. That's why our reducer takes an object as an argument instead of just a string for the action type itself. Because it takes an object, it can take multiple key-value pairs that include additional information about the action the reducer will need to take.
  
  test('Should successfully add new ticket data to mainTicketList', () => {
    const { names, location, issue, id } = ticketData;
    action = {
      type: 'ADD_TICKET',
      names: names,
      location: location,
      issue: issue,
      id: id
    };

    expect(ticketListReducer({}, action)).toEqual({
      [id] : {
        names: names,
        location: location,
        issue: issue,
        id: id
      }
    });
  });

  // Writing a Test for Deleting a Ticket
  // Our new test will need some additional sample data. We'll start by creating a sample currentState that already includes two tickets. (UP in the Describe section/ first couple lines)
  // Our test will determine whether or not the DELETE_TICKET action in our reducer successfully returns a new state with the correct ticket removed.

  // (In the describe section above) We've added a new constant that represents a currentState that already holds two tickets.
  // The test has an action with a type of DELETE_TICKET and an id of 1. That's all the information we need for deleting a ticket.
  // Once our reducer successfully completes the DELETE_TICKET action, we'd expect our reducer to take the currentState (which holds two tickets) and return an object that only has one ticket with an id of 2.
  test('Should successfully delete a ticket', () => {
    action = {
      type: 'DELETE_TICKET',
      id: 1
    };
    expect(ticketListReducer(currentState, action)).toEqual({
      2: {names: 'Jasmine and Justine',
        location: '2a',
        issue: 'Reducer has side effects.',
        id: 2 }
    });
  });
});
