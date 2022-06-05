// We will start by importing our reducer. (Note that we haven't actually created any reducers yet.) 
// We'll store the imported code in a variable called ticketListReducer. We will have to jump up two directories in our relative path (../../) to reach the reducers directory where our ticket list reducer will be stored.
import ticketListReducer from '../../reducers/ticket-list-reducer';

//A quick refresher:
// describe blocks are for grouping together related tests. All of our ticketListReducer tests will be grouped together in one describe block.
// test refers to the individual test. This test will make sure our reducer returns the correct default value.
// Our expect statement lets our test know what the expected value will be.
describe('ticketListReducer', () => {
  test('Should return default state if ther is no action type passed into the reducer', () => {
    expect(ticketListReducer({}, {type: null})).toEqual({});
          // As we can see here, our reducer will take two arguments. The first argument is the current state while the second argument is an action that will be applied to the current state. Note that the action's type is stored inside an object. This object can potentially contain other things besides the name of the action itself.
          // AKA: - What is the thing that needs to be changed (the current state)?
          //      - How should that thing be changed (what action should be applied to that thing)?

          // Looking at our test above, our expectation should be clear. If our current state is an empty object {} and we do nothing to it (the action type is null), then the reducer should return the current state {}.
  });
});
