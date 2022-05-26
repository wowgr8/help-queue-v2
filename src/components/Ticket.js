import React from "react";
import PropTypes from "prop-types";

function Ticket(props){
  return (
    <React.Fragment>
      <h3>{props.location} - {props.names}</h3>
      <p><em>{props.issue}</em></p>
      <hr/>
    </React.Fragment>
  );
}

Ticket.propTypes = {
  names: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  issue: PropTypes.string
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