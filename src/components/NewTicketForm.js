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
    return firestore.collection('tickets').add(
      {
        names: event.target.names.value,
        location: event.target.location.value,
        issue: event.target.issue.value,
        timeOpen: firestore.FieldValue.serverTimestamp()
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