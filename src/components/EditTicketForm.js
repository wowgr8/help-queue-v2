import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";
import { useFirestore } from 'react-redux-firebase';

function EditTicketForm (props) {
  //Here we call the useFirestore() function and save our Firestore reference in a constant called firestore
  const firestore = useFirestore();
  const { ticket } = props;

  function handleEditTicketFormSubmission(event) {
    event.preventDefault();
    props.onEditTicket(); //No longer has parameter but still used to chance which component is rendering. // Instead of passing all the properties on to TicketControl.js via props.onEditTicket(), we'll save those properties in a constant called propertiesToUpdate
    const propertiesToUpdate = {                                                          //
                        names: event.target.names.value,                                   //
                        location: event.target.location.value,                            //
                        issue: event.target.issue.value,                                    //
    }                                                                                       //
    return firestore.update({collection: "tickets", doc: ticket.id }, propertiesToUpdate)  //Our function will return this line. We pass two arguments to this method:
  }                                                                                       // The first argument is an object that describes the item that needs to be updated. The format should be familiar now; we specify the collection as well as the ticket's id.
                                                                                          // The second argument is an object that contains the properties we want to update. We could just pass an object in directly but it's easier to read when we pass it into a constant first.
                                                            // Firestore will then merge the two objects together, with the properties from the second object taking precedent.
  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={handleEditTicketFormSubmission}
        buttonText="Update Ticket" />
    </React.Fragment>
  );
}

EditTicketForm.propTypes = {
  onEditTicket: PropTypes.func
};

export default EditTicketForm;