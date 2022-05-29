import React from "react";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import TicketDetail from './TicketDetail';

class TicketControl extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      formVisibleOnPage: false,
      // we're initializing mainTicketList as an empty array. We're doing this because we don't want this application to start with fake tickets. The queue should be empty until we start adding tickets via our form.
      mainTicketList: [],
      selectedState: null
    };
  }

  // previously, the handleClick method only toggles the visibility of our form. We also need it to set selectedTicket to null so the queue can show. But it's not quite that simple. When we click on a ticket's detail, formVisibleOnPage is set to false. We don't want to toggle it back to true! That's why we see the form for adding a ticket when we click on the button.
  handleClick = () => {
    //We know that if this.state.selectedTicket isn't null then we must be on the ticket detail page. In that case, we know that formVisibleOnPage should be set to false and selectedTicket should be set to null. Otherwise, we know that we must be on the add ticket page or the ticket list page - so our else statement can just continue to toggle the formVisibleOnPage state.
    if (this.state.selectedTicket != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedTicket: null,
      });
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage
      }));
    }
  }

  //Our new method is called handleAddingNewTicketToList because it does just that - handle the process of adding a new ticket in our mainTicketList. It takes a newTicket as a parameter.
  handleAddingNewTicketToList = (newTicket) => {
    const newMainTicketList = this.state.mainTicketList.concat(newTicket);
    this.setState({mainTicketList: newMainTicketList,
                  formVisibleOnPage: false});
  }

  //We will use filter() (which is perfect for functional programming) to filter our mainTicketList down to tickets where ticket.id equals the id passed into our method. Because we are using UUIDs now, we know that only one ticket will ever have a matching id.
  //Because filter() returns an array, we need to specify that we want the first (and only element) in that array. We use bracket notation to do that.
  //Finally, we use the setState method to mutate the state of the selectedTicket state slice.
  //Our method isn't connected to our user interface yet 
  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.state.mainTicketList.filter(ticket => ticket.id === id)[0];
    this.setState({selectedTicket: selectedTicket});
  }


  render(){
    {/* we create a variable called currentlyVisibleState and set it to null because we haven't determined which component should be rendered yet. */}
    let currentlyVisibleState = null;
    let buttonText = null;
    {/*  If this.state.formVisibleOnPage is true, the currentlyVisibleState will be set to our NewTicketForm component. ELSE our currentlyVisibleState will be set to our TicketList component. */}
    if(this.state.selectedTicket != null){
      currentlyVisibleState = <TicketDetail ticket = {this.state.selectedTicket} />
      buttonText = "Return to Ticket List";
      // While our TicketDetail component only takes placeholder data, we will eventually be passing the value of selectedTicket as a prop.
    } else if (this.state.formVisibleOnPage){
      // This conditional needs to be updated to "else if."
      currentlyVisibleState = <NewTicketForm onNewTicketCreation = {this.handleAddingNewTicketToList}/> // will pass this.handleAddingNewTicketToList as a prop to the NewTicketForm. It will be saved in the prop onNewTicketCreation. As noted in Step 1, we prefix the prop with on. This differentiates the method in our parent component (which will actually handle the event) from the function in our child component (which is triggered when the event happens).
      buttonText = "Return to Ticket List";
    } else {
      //* we're passing mainTicketList down to TicketList by including it as a prop and target its place in state with this.state.mainTicketList. Here we're calling it ticketList, so that's the name we'll use to access it as a prop in TicketList. */}
      currentlyVisibleState = <TicketList ticketList = {this.state.mainTicketList} onTicketSelection = {this.handleChangingSelectedTicket} />;
      // Because a user will actually be clicking on the ticket in the Ticket component, we will need to pass our new handleChangingSelectedTicket method as a prop.
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