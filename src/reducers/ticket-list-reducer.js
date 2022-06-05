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

  // You may wonder why we are storing objects within objects in this way now - instead of continuing to use an array. Either will work fine for our use case. However, an object full of key-value pairs is much more similar to a database than an array. That's because both a database and an object have unique keys (as opposed to an array's index, which can change as values are added and removed).
  // Start by making a copy of the state - then we use the delete function to remove the key-value pair that corresponds to the action. We aren't being fully "pure" here - delete directly alters the object it's called on. However, at the very least, we are making a copy of the original object and altering that one instead of altering the original itself.
  // Note: Why not do this in a purer way? Well, JavaScript doesn't offer an approach that's both native and functional. There are functional JavaScript libraries that will handle this - for example, the Underscore's .omit() function does the trick - but we will keep things simple here.
  case 'DELETE_TICKET':
    let newState = { ...state };
    delete newState[id];
    return newState; 
  default:
    return state;
  }
};
