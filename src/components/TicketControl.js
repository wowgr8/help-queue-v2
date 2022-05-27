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
    {/*  If this.state.formVisibleOnPage is true, the currentlyVisibleState will be set to our NewTicketForm component. ELSE our currentlyVisibleState will be set to our TicketList component. */}
    if (this.state.formVisibleOnPage){
      currentlyVisibleState = <NewTicketForm />
    } else {
      currentlyVisibleState = <TicketList />
    }
    return(
      <React.Fragment>
        {/* We only need to use JSX and curly braces for evaluation(of which component should be rendered) inside our return(). */}
        {currentlyVisibleState}
      </React.Fragment>
    );
  }

}

export default TicketControl;