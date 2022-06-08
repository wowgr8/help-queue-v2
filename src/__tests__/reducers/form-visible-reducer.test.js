import formVisibleReducer from '../../reducers/form-visible-reducer';
//First, let's create our new reducer. We need to test it and get it working independently before we combine it with our existing reducer.

// Our first test will just check to make sure that the reducer can accept a boolean value (false) and return the default state if no action type is provided.
describe("formVisibleReducer", () => {
  test('Should return default state if no action type is recognized', () => {
    expect(formVisibleReducer(false, { type: null })).toEqual(false);
  });

  //It's time to test for the next simplest behavior. Can our reducer successfully toggle between true and false?
  test('Should toggle form visibility state to true', () => {
    expect(formVisibleReducer(false, { type: 'TOGGLE_FORM' })).toEqual(true);
  });
});