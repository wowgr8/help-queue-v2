// Now we're ready to add logic to the reducer to pass our new test. Ultimately, a reducer is just a pure function that contains a conditional. What the reducer does is dependent on the action passed in as an argument.
// We'll use a switch case to do this. A switch case is really just simplified syntax for writing a conditional statement.

// We use object destructuring to destructure the other properties from the action object into the variables names, location and issue.
// Next, we state that our switch will be based on the action.type. Because the action parameter takes an object, the reducer needs to look at the action's type property to determine the action it should take.
// As always, we don't want to mutate objects in pure functions. Instead, we use Object.assign() to clone the state object.
// Object.assign() must take three arguments for this to work:
  // - The first argument must be an empty object {}. Otherwise, Object.assign() will directly mutate the state we pass in instead of making a clone of it first. We don't want to do that!
  // - The second argument is the object that will be cloned. In the reducer action below, it's the ticket list state we pass into our function.
  // - The third argument is the change that should be made to our new copy. This will always be the new ticket that should be added to our ticket list state.
// Object.assign() creates a new key-value pair where the key is the ticket's id and the value is an object with all of the ticket's properties.
// We return the value from Object.assign(). Our reducer hasn't altered anything. Instead, it made a copy of the state that was passed in as argument, altered the copy, and then returned the altered copy so it can be used elsewhere in our code.
export default (state = {}, action) => {
  const { names, location, issue, id } = action;
  switch (action.type) {
  case 'ADD_TICKET':
    return Object.assign({}, state, {
      [id]: {
        names: names,
        location: location,
        issue: issue,
        id: id
      }
    });
  default:
    return state;
  }
};
