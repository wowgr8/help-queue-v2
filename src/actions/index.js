export const deleteTicket = id => ({
  type: 'DELETE_TICKET',
  id
});

export const toggleForm = () => ({
  type: 'TOGGLE_FORM'
});


//// Note that addTicket() will take the entire object and then deconstruct it in the action creator. That will save us the trouble of deconstructing the ticket every time we call addTicket() in our React application.
export const addTicket = (ticket) => {
  const { names, location, issue, id } = ticket;
  return {
    type: 'ADD_TICKET',
    names: names,
    location: location,
    issue: issue,
    id: id
  }
}