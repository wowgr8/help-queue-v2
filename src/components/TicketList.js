import React from 'react';
import Ticket from './Ticket';
import PropTypes from "prop-types";
// Here we import hooks functionality from both react-redux and react-redux-firebase.
import {useSelector} from 'react-redux';                                                // allows us to extract data from a Redux store.
import {useFirestoreConnect, isLoaded, isEmpty} from 'react-redux-firebase';            // allows us to listen for changes to Firestore without using an HOC in a class component.
                                                                                        //isLoaded() and isEmpty() from react-redux-firebase allow us to check if a collection has been retrieved from Firestore.

function TicketList(props){
  // The useFirestoreConnect() hook comes from react-redux-firebase.
  // We specify the collection or documents we want to listen to in Firestore. In this case, we want the entire collection of tickets. However, we could also use this hook to find a ticket with a specific id by adding: doc: ticketId, under collection
  useFirestoreConnect([
    { collection: "tickets" }
  ]);

  //The useSelector() hook comes from react-redux.
  //While useFirestoreConnect() is listening for changes to Firestore, we use useSelector() which makes state available from our store. 
  //  All Firestore data is still passing through our store through our firestoreReducer. We need to make it available with the useSelector() hook, like so:
  const tickets = useSelector(state => state.firestore.ordered.tickets);
  //The firestoreReducer passes data into a firestore data slice. That's where we need to grab from: state.firestore.tickets. We save our collection in a constant called tickets.

  //React-redux-firebase also offers a useful isLoaded() function.
  //Next, we verify that the tickets collection has loaded before we try to render our component. We do this with a conditional that checks if isLoaded(tickets).
  //If we try to load our tickets before we've retrieved the data, our application will throw an error.
  if(isLoaded(tickets)){
    return (
      <React.Fragment>
        <hr/>
        {tickets.map((ticket) => {  // Note we've also updated our map() function - we no longer need to iterate over tickets by checking their keys.
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
  //Finally, our else statement contains a simple Loading... message. TicketList.js will render this message until the tickets are loaded
  } else {
    return (
      <React.Fragment>
        <h3>Loading...</h3>
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