import rootReducer from '../../reducers/index';

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

});
