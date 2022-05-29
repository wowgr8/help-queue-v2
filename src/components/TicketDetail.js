import React from "react";
import PropTypes from "prop-types";

function TicketDetail(props){
  const { ticket, onClickingDelete } = props; // New code - Also note that we're destructuring props to create an onClickingDelete method, just like we did for ticket.

  //Note that we use object destructuring (const { ticket } = props;) to derive the ticket object from our props. Otherwise, for a ticket attribute like location, we'd need to say props.ticket.location instead of just ticket.location. It is common - but not necessary - to use object destructuring with props in React.

  return (
    <React.Fragment>
      <h1>Ticket Detail</h1>
      <h3>{ticket.location} - {ticket.names}</h3>
      <p><em>{ticket.issue}</em></p>
      <button onClick={ props.onClickingEdit }>Update Ticket</button> { /* new code. add an "Update" button to our TicketDetail component. When a user clicks this button, the edit form will show.*/ }
      <button onClick={()=> onClickingDelete(ticket.id) }>Close Ticket</button> { /* First, we add a button with an onClick handler. When the button is clicked, onClickingDelete(ticket.id) will be executed. Once again, we need to use () => in our JSX curly braces because our function has parens with an argument.  */ }
      <hr/>
    </React.Fragment>
  );
}

//We also specify that ticket will have a PropType of object.
TicketDetail.propTypes = {
  ticket: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func // new code
};

export default TicketDetail;