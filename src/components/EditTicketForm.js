import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";



// Lastly, we'll add a function called handleEditTicketFormSubmission that captures form values and triggers the handleEditingTicketInList method in TicketControl. We also need to update our JSX so the event handler in our form refers to our new handleEditTicketFormSubmission function.

function EditTicketForm(props){
  const { ticket } = props;

  function handleEditTicketFormSubmission(event) {
    event.preventDefault();
    props.onEditTicket({names: event.target.names.value, location: event.target.location.value, issue: event.target.issue.value, id: ticket.id});
  }

  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={handleEditTicketFormSubmission} /* new code */ 
        buttonText="Update Ticket" />
    </React.Fragment>
  );
}


EditTicketForm.propTypes = {
  ticket: PropTypes.object,
  onEditTicket: PropTypes.func
};

export default EditTicketForm;