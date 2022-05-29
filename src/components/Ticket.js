import React from "react";
import PropTypes from "prop-types";

//Now it's time to pass the handleChangingSelectedTicket method down to our Ticket component. It has been passed down from TicketControl to TicketList as a prop called onTicketSelection. Then TicketList passed it down to Ticket as a prop called whenTicketClicked.

function Ticket(props){
  return (
    <React.Fragment>
      <div onClick = {() => props.whenTicketClicked(props.id)}> { /* We add a div with an onClick function. Because TicketList is iterating through each individual ticket, each ticket will have its own div with an onClick handler attached.
        As we discussed in the last lesson, we need to use an arrow function so the expression isn't evaluated immediately. We pass in the ticket's id via props.id. */}
        <h3>{props.location} - {props.names}</h3>
        <p><em>{props.issue}</em></p>
        <hr/>
      </div>
    </React.Fragment>
  );
}

Ticket.propTypes = {
  names: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  issue: PropTypes.string,
  id: PropTypes.string, // new PropType
  whenTicketClicked: PropTypes.func // new PropType
};

export default Ticket;


{/*  Examples of common types of propTypes

MyExampleComponent.propTypes = {
  exampleArray: PropTypes.array,
  exampleBoolean: PropTypes.bool,
  exampleFunction: PropTypes.func,
  exampleNumber: PropTypes.number,
  exampleObject: PropTypes.object,
  exampleString: PropTypes.string,
  exampleSymbol: PropTypes.symbol,
  exampleReactElement: PropTypes.element,
}

We can also declare more complex property types as well. For instance, we can declare that a prop is an array full of a specific type of entries:
  ...
  exampleArrayOfNumbers: PropTypes.arrayOf(PropTypes.number),
  exampleArrayOfStrings: PropTypes.arrayOf(PropTypes.string),
  ...

We can also declare that a prop is an instance of a class:

  ...
  exampleClassTypeProp: PropTypes.instanceOf(ExampleClassName),
  ...

*/}