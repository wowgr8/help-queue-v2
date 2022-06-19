import React from "react";
// import { v4 } from 'uuid'; removed the uuid library because Firebase will now create IDs for our tickets. We should no longer do this in our application.
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";
//import Moment from 'moment'; removed the moment library because Firebase doesn't support Moment-formatted time. Instead, we'll use Firebase to create a timestamp which we can then use to compute how long a ticket has been open.
import { useFirestore } from 'react-redux-firebase';


function NewTicketForm(props){


  //This will allow us to use Firestore methods in the component.
  const firestore = useFirestore();

  //Note that we updated the name of the function for adding a ticket to addTicketToFirestore. This is a more accurate name for what the function will do now.
  function addTicketToFirestore(event) {
    event.preventDefault();
    props.onNewTicketCreation(); // We will still need our onNewTicketCreation() method to toggle between components - but it will no longer take an argument because it no longer handles creating a ticket.
    // Here's how we will actually add a ticket to Firestore.
    return firestore.collection('tickets').add( // We need to specify which collection we will add a ticket to. Since the collection will hold tickets, we'll call it tickets. A collection is loosely equivalent to an SQL table 
      {                                         // If the collection doesn't exist, Firestore will add it. If it does, Firestore will add the ticket to the existing collection.
        names: event.target.names.value,        // add() is the Firestore method used to add a record to the database. We specify the values we want to add.
        location: event.target.location.value, 
        issue: event.target.issue.value,
        timeOpen: firestore.FieldValue.serverTimestamp() // Finally, we specify that timeOpen should now be equivalent to firestore.FieldValue.serverTimestamp() instead of a new Moment().
      }
    );
  }

  
  return (
    <React.Fragment>
      <ReusableForm
        formSubmissionHandler={addTicketToFirestore} // updated function name to match new descriptive name defined in the above function.
        buttonText="Help!" />
    </React.Fragment>
  );
}

NewTicketForm.propTypes = {
  onNewTicketCreation: PropTypes.func
};

export default NewTicketForm;