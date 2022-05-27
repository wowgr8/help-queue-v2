import React from "react";
import { v4 } from 'uuid';

function NewTicketForm(){

  {/* Note that we are taking advantage of event.target. event.target gives us access to the 
  event that was just fired. In this case, we just had a submit event. We can actually grab the 
  values that came from that submit event. Specifically, we can grab the values based on their 
  name property. We just need to call event.target.[input-field-name-goes-here].value. */}
  function handleNewTicketFormSubmission(event){
    event.preventDefault();
    console.log(event.target.names.value);
    console.log(event.target.location.value);
    console.log(event.target.issue.value);
  }

  return(
    <React.Fragment>
      <form onSubmit = {handleNewTicketFormSubmission}>
        <input
          type = "text"
          name = "names"
          placeholder = "Pair Names" />
        <input
          type = "text"
          name = "location"
          placeholder = "Location" />
        <textarea
          name = "issue"
          placeholder = "Describe your issue." />
        <button type = "submit">Help!</button>
      </form>
    </React.Fragment>
  );
}

export default NewTicketForm;