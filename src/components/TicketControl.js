import React from "react";
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';

class TicketControl extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      formVisibleOnPage: false,
      // we're initializing mainTicketList as an empty array. We're doing this because we don't want this application to start with fake tickets. The queue should be empty until we start adding tickets via our form.
      mainTicketList: [],
      selectedState: null,
      editing: false // new code
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

// add delete ticket functionality by writing a handleDeletingTicket method in TicketControl. This method will mutate the state of the mainTicketList. we passed this method down as a prop to TicketDetail. We will call this prop onClickingDelete. Add a button to TicketDetail with an onClick event handler that will trigger onClickingDelete. then  add a PropType for onClickingDelete.
  //handleDeletingTicket will take an id as a parameter.
  //We will use the filter() method again. This time, though, we want the newMainTicketList to filter everything that doesn't have the ticket ID that will be passed into the method. In other words, we are filtering out the ticket that has the specified ID because we want it to be deleted from the list.
  //Next, we need to set the state of the mainTicketList to be equal to our filtered newMainTicketList.
  //Finally, we will also need to set selectedTicket back to null. That way, once a ticket is closed, TicketControl will ensure that the TicketList component is showing.
  handleDeletingTicket = (id) => {
    const newMainTicketList = this.state.mainTicketList.filter(ticket => ticket.id !== id);
    this.setState({
      mainTicketList: newMainTicketList,
      selectedTicket: null
    });
  }
  
  //Next, we will add a method for showing the edit form. This method needs to go in TicketControl, which handles the local state that determines which component should show.
  //While the console.log() isn't technically necessary, it's a good way to make sure our method is being reached.
  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing: true});
  }

  //Note that we've broken this up into multiple lines to make it more readable.
  // in the first half; We filter the previous version of the ticket out of the list with filter() and then add the edited version of the ticket to the list with concat(). While we could've edited the ticket directly, this is easier and doesn't involve mutating the ticket - just replace it with the new version.
  // second half: we set the mainTicketList to be equal to the list with the updated ticket. And  we update editing to false and selectedTicket to null.
  handleEditingTicketInList = (ticketToEdit) => {
    const editedMainTicketList = this.state.mainTicketList
      .filter(ticket => ticket.id !== this.state.selectedTicket.id)
      .concat(ticketToEdit);
    this.setState({
        mainTicketList: editedMainTicketList,
        editing: false,
        selectedTicket: null
      });
  }



  render(){
    {/* we create a variable called currentlyVisibleState and set it to null because we haven't determined which component should be rendered yet. */}
    let currentlyVisibleState = null;
    let buttonText = null;
    {/*  If this.state.formVisibleOnPage is true, the currentlyVisibleState will be set to our NewTicketForm component. ELSE our currentlyVisibleState will be set to our TicketList component. */}
    if (this.state.editing ) {     //We will pass the current selectedTicket to the EditTicketForm. Since a user will have to click on a ticket to access the "Update" button, selectedTicket will already be set to the ticket we want.
      //Note that we also need to change the next conditional to an else if. If it remained an if statement, that conditional would also be met since there is a selectedTicket - which means that the TicketDetail component would show even if editing is set to true.  
      currentlyVisibleState = <EditTicketForm ticket = {this.state.selectedTicket} onEditTicket = {this.handleEditingTicketInList} />
      buttonText = "Return to Ticket List";
    } else if(this.state.selectedTicket != null){
      currentlyVisibleState = <TicketDetail ticket = {this.state.selectedTicket} onClickingDelete = {this.handleDeletingTicket} />
      buttonText = "Return to Ticket List";
      // While our TicketDetail component only takes placeholder data, we will eventually be passing the value of selectedTicket as a prop.
    } else if (this.state.formVisibleOnPage){
      // This conditional needs to be updated to "else if."
      currentlyVisibleState = <NewTicketForm onNewTicketCreation = {this.handleAddingNewTicketToList}/> // will pass this.handleAddingNewTicketToList as a prop to the NewTicketForm. It will be saved in the prop onNewTicketCreation. As noted in Step 1, we prefix the prop with on. This differentiates the method in our parent component (which will actually handle the event) from the function in our child component (which is triggered when the event happens).
      buttonText = "Return to Ticket List";
    } else {
      //* we're passing mainTicketList down to TicketList by including it as a prop and target its place in state with this.state.mainTicketList. Here we're calling it ticketList, so that's the name we'll use to access it as a prop in TicketList. */}
      currentlyVisibleState = <TicketList 
        ticketList = {this.state.mainTicketList} 
        onTicketSelection = {this.handleChangingSelectedTicket}
        onClickingEdit = {this.handleEditClick} />;
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