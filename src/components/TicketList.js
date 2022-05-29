import React from "react";
import Ticket from "./Ticket";
import PropTypes from "prop-types";

function TicketList(props){  // Add props as parameter.
  return(
    <React.Fragment>
      <hr/>
      {props.ticketList.map((ticket) => // Loop through the list passed down from TicketControl. We will no longer use the index of our iterator as a key. We will use a ticket's actual id property instead.
        //Note that we also have to pass in an id prop. This is because we can't pass a key to a child component as a prop. However, our Ticket component will still need access to its own id, hence a separate id prop which is also set to ticket.id.
        //We will also pass props.onTicketSelection down to the Ticket component as a prop. The Ticket component will handle determining whether it has been selected - not the TicketList component. For the sake of clarity, we are naming the prop being passed down to the Ticket component whenTicketClicked. Because onTicketSelection is itself a prop from the TicketControl component, it is one of TicketList's props, which is why we need to prefix onTicketSelection with props.
        <Ticket
          whenTicketClicked = { props.onTicketSelection } 
          names={ticket.names}
          location={ticket.location}
          issue={ticket.issue}
          id={ticket.id}
          key={index} />
      )}
    </React.Fragment>
  );
}

// Add propTypes for ticketList.
TicketList.propTypes = {
  ticketList: PropTypes.array,
  onTicketSelection: PropTypes.func // Finally, we also need to add a PropType: onTicketSelection: PropTypes.func.
};

export default TicketList;