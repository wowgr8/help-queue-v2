import React from 'react';
import Ticket from './Ticket';
import PropTypes from "prop-types";
// Here we import hooks functionality from both react-redux and react-redux-firebase.
import {useSelector} from 'react-redux';
import {useFirestoreConnect, isLoaded, isEmpty} from 'react-redux-firebase';

function TicketList(props){
  // The useFirestoreConnect() hook comes from react-redux-firebase.
  useFirestoreConnect([
    { collection: "tickets" }
  ]);

  //The useSelector() hook comes from react-redux.
  const tickets = useSelector(state => state.firestore.ordered.tickets);

  //React-redux-firebase also offers a useful isLoaded() function.
  if(isLoaded(tickets)){
    return (
      <React.Fragment>
        <hr/>
        {tickets.map((ticket) => {
          return <Ticket 
            whenTicketClicked = {props.onTicketSelection}
            names={ticket.names}
            location={ticket.location}
            issue={ticket.issue}
            formattedWaitTime={ticket.formattedWaitTime}
            id={ticket.id}
            key={ticket.id} />
        })}
      </React.Fragment>
    );
  // if the tickets aren't loaded yet, our fragment will return a "loading.." message.  
  } else {
    return (
      <React.Fragment>
        <hr/>
        {Object.values(props.ticketList).map((ticket) =>
          <Ticket 
            whenTicketClicked = { props.onTicketSelection }
            names={ticket.names}
            location={ticket.location}
            issue={ticket.issue}
            formattedWaitTime={ticket.formattedWaitTime}
            id={ticket.id}
            key={ticket.id}/>
        )}
      </React.Fragment>
    );
  }
}

TicketList.propTypes = {
  // We no longer need ticketList props.
  //ticketList: PropTypes.object,
  onTicketSelection: PropTypes.func
};

export default TicketList;