import React from "react";
import { v4 } from 'uuid';
import PropTypes from "prop-types"; //import PropTypes
import ReusableForm from "./ReusableForm";



function NewTicketForm(props){  // add props as a parameter

  // Note that we are taking advantage of event.target. event.target gives us access to the 
  //event that was just fired. In this case, we just had a submit event. We can actually grab the 
  //values that came from that submit event. Specifically, we can grab the values based on their 
  //name property. We just need to call event.target.[input-field-name-goes-here].value.

  //Because a function component doesn't have this as a reference like a class component, we need to directly refer to the props passed into the function component. That's why we do props.onNewTicketCreation() instead of this.onNewTicketCreation() (as we'd do if this were a class component).
  //Remember that onNewTicketCreation() is the callback from the parent component even though it has a different name now. The handleAddingNewTicketToList method is invoked in TicketControl
  function handleNewTicketFormSubmission(event){
    event.preventDefault();
    props.onNewTicketCreation({names: event.target.names.value, 
                              location: event.target.location.value, 
                              issue: event.target.issue.value, 
                              id: v4()
                              })
                              //When we call props.onNewTicketCreation({names: names.value, location: location.value, issue: issue.value}); in the NewTicketForm component, this object is passed in as an argument to the newTicket parameter, updating the mainTicketList.


  }



  return(
    <React.Fragment>
      {/* We pass in two props: the method for handling new tickets (handleNewTicketFormSubmission) and the button text. */}
      <ReusableForm 
        formSubmissionHandler={handleNewTicketFormSubmission}
        buttonText="Help!" />
    </React.Fragment>
  );
}

// We also need to add PropTypes for our new prop.
NewTicketForm.propTypes = {
  //We add a PropTypes for onNewTicketCreation. Remember that this.handleAddingNewTicketToList is passed down to the child component as onNewTicketCreation.
  onNewTicketCreation: PropTypes.func
};

export default NewTicketForm;


//When should we try to make reusuable components? In general, we should aim to reuse code whenever we are using it across multiple components. Forms are a common example but there are others, too, such as different kinds of welcome content, more complex headers, and so on. If there are small variations in the code like in the example above, we can use props to handle those differences.