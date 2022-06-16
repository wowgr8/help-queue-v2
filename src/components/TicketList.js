import React from 'react';
import Ticket from './Ticket';
import PropTypes from "prop-types";

function TicketList(props){

  return (
    <React.Fragment>
      <hr/>
      {/* The Ticket.js component needs to have access to the formattedWaitTime property. In order to pass these props to Ticket.js, though, we first need to pass them to TicketList.js, which is the direct parent of Ticket.js and the child of TicketControl.js */}
      {Object.values(props.ticketList).map((ticket) =>
        <Ticket 
          whenTicketClicked = { props.onTicketSelection }
          names={ticket.names}
          location={ticket.location}
          issue={ticket.issue}
          //* We just add formattedWaitTime as a prop to pass down to Ticket.js. We don't need to pass timeOpen as a prop because we won't be displaying it in Ticket.js. We'll only be showing the formattedWaitTime.
          formattedWaitTime={ticket.formattedWaitTime}
          id={ticket.id}
          key={ticket.id}/>
      )}
    </React.Fragment>
  );
}

 // The PropType below has been updated - it's now an object, not an array.
TicketList.propTypes = {
  ticketList: PropTypes.object,
  onTicketSelection: PropTypes.func
};

export default TicketList;