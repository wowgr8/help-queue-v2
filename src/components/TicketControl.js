import React from "react";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";

class TicketControl extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      formVisibleOnPage: false,
      // we're initializing mainTicketList as an empty array. We're doing this because we don't want this application to start with fake tickets. The queue should be empty until we start adding tickets via our form.
      mainTicketList: []
    };
  }

  handleClick = () => {
    this.setState(prevState => ({
      formVisibleOnPage: !prevState.formVisibleOnPage
    }));
  }

  render(){
    {/* we create a variable called currentlyVisibleState and set it to null because we haven't determined which component should be rendered yet. */}
    let currentlyVisibleState = null;
    let buttonText = null;
    {/*  If this.state.formVisibleOnPage is true, the currentlyVisibleState will be set to our NewTicketForm component. ELSE our currentlyVisibleState will be set to our TicketList component. */}
    if (this.state.formVisibleOnPage){
      currentlyVisibleState = <NewTicketForm />
      buttonText = "Return to Ticket List";
    } else {
      {/* we're passing mainTicketList down to TicketList by including it as a prop and target its place in state with this.state.mainTicketList. Here we're calling it ticketList, so that's the name we'll use to access it as a prop in TicketList. */}
      currentlyVisibleState = <TicketList ticketList = {this.state.mainTicketList} />;
      buttonText = "Add Ticket";
    }
    return(
      <React.Fragment>
        {/* We only need to use JSX and curly braces for evaluation(of which component should be rendered) inside our return(). */}
        {currentlyVisibleState}
        <button onClick = {this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }

}

export default TicketControl;