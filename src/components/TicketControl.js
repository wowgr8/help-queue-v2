import React from "react";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";

class TicketControl extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      formVisibleOnPage: false
    };
  }

  render(){
    {/* we create a variable called currentlyVisibleState and set it to null because we haven't determined which component should be rendered yet. */}
    let currentlyVisibleState = null;
    {/* We create a new variable called addTicektButton and set its value to null */}
    let addTicketButton = null;
    {/*  If this.state.formVisibleOnPage is true, the currentlyVisibleState will be set to our NewTicketForm component. ELSE our currentlyVisibleState will be set to our TicketList component. */}
    if (this.state.formVisibleOnPage){
      currentlyVisibleState = <NewTicketForm />
    } else {
      currentlyVisibleState = <TicketList />
      {/* Also, if this.state.formVisibleOnPage is set to false, we will set the value of our addTicketButton variable to our button with its click handler. */}
      addTicketButton = <button onClick={this.handleClick}>Add ticket</button>
    }
    return(
      <React.Fragment>
        {/* We only need to use JSX and curly braces for evaluation(of which component should be rendered) inside our return(). */}
        {currentlyVisibleState}
        {/* we make sure that {addTicketButton} will be returned from our function. If its value is still null, there's nothing to add to the DOM. However, if it has a value, the button will be added to the DOM. */}
        {addTicketButton}
      </React.Fragment>
    );
  }

}

export default TicketControl;