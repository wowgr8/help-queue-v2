import React from 'react';
import Ticket from './Ticket';
import PropTypes from "prop-types";

function TicketList(props){

  return (
    <React.Fragment>
      <hr/>
      {/* We now need to map over the values of an object, not an array. */}
      {/* we iterate over the values of the ticketList. We do this with the Object.values() method, which grabs all the values from the object. Once we have the values, we can map over them. */}
      {Object.values(props.ticketList).map((ticket) =>
        <Ticket 
          whenTicketClicked = { props.onTicketSelection }
          names={ticket.names}
          location={ticket.location}
          issue={ticket.issue}
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