import React from "react";
import PropTypes from "prop-types";

function ReusableForm(props) {
  return (
    <React.Fragment>
      <form onSubmit={props.formSubmissionHandler}>
        <input
          type='text'
          name='names'
          placeholder='Pair Names' />
        <input
          type='text'
          name='location'
          placeholder='Location' />
        <textarea
          name='issue'
          placeholder='Describe your issue.' />
        <button type='submit'>{props.buttonText}</button>
      </form>
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default ReusableForm;



// One of React's many advantages is its ability to reuse components. Whenever we are in a situation where we might need to reuse code, we should think carefully about whether that code can be extracted into another component and then used where needed.
//We are almost ready to add update functionality to our help queue application, but before we do, we have an opportunity to think about code reusability. Currently, our NewTicketForm component uses a form. We will need to build an EditTicketForm that will use a form with the exact same fields. In fact, we can potentially use almost the exact same form for both components. Instead of copying the code into both components (which isn't DRY), let's extract some of that code into a component called ReusableForm.

//The JSX here is almost exactly the same as the form we've already built. There are just two small differences:
  //Our onSubmit function is now set to a prop called formSubmissionHandler. This is because the form for editing will trigger a different method than the form for creating a new ticket.
  //We will also pass in a prop for buttonText. We will want the button for each form to have different text.

// If we wanted to, we could pass in props for all of the inputs in our form fields. That would be useful if our application had different forms with different fields. However, our forms will look exactly the same so we won't do that here.



