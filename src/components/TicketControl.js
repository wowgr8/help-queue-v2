import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';
import { connect } from 'react-redux';

// Our goal is to keep things simple so we will add the connect() function to the one component in our application that already has state: TicketControl.js. That way, we will (mostly) only need to update one component to integrate Redux in our application.
// We'll import the connect function from React Redux at the top of TicketControl.js. Then, right before our export statement at the end of the file, we'll wrap our component with the connect() function:

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,   // removed mainTicketList from the component's state object because React will no longer handle the ticket list - we'll let Redux do that instead.
      selectedTicket: null,
      editing: false
    };
  }

  handleDeletingTicket = (id) => {
    const { dispatch } = this.props;           // we deconstruct this.props to get the dispatch function.
    const action = {                              //Note: We did not deconstruct newTicket object like in handleAddingNewTicketToList & handleEditingTicketInList methods because deleting a ticket only needs an id in addition to the action's type
      type: 'DELETE_TICKET',                   // Next, we define the action itself.
      id: id
    }
    dispatch(action);                          // Once the action is defined, we can dispatch() it.
    this.setState({ selectedTicket: null });
  }

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing: true});
  }

  handleEditingTicketInList = (ticketToEdit) => {     // Did the same here as handleAddingNewTicketToList
    // Note: We use the ADD_TICKET action to edit our ticket as well. How can our ADD_TICKET action do this? Well, the only difference between when we are adding and editing a ticket is the id property. If it's a new id, a new ticket will be added to the store. If it's an id that already exists, the existing ticket will be replaced. At this point, it might be more accurate to name the action ADD_OR_UPDATE_TICKET, but we will keep the action name the same for consistency.
    const { dispatch } = this.props;
    const { id, names, location, issue } = ticketToEdit;
    const action = {
      type: 'ADD_TICKET',
      id: id,
      names: names,
      location: location,
      issue: issue,
    }
    dispatch(action);
    this.setState({
        editing: false,
        selectedTicket: null
      });
  }

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.state.mainTicketList.filter(ticket => ticket.id === id)[0];
    this.setState({selectedTicket: selectedTicket});
  }

  handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;                        // We could call this.props.dispatch in our method but it's common to deconstruct dispatch from this.props. This makes our code a little cleaner.
    const { id, names, location, issue } = newTicket;       // Also, we need to deconstruct the values from newTicket so we can actually pass them into our action, which requires four different properties.
    const action = {                                        // Next, we store our action in a constant. This action should look familiar - it's the 'ADD_TICKET' action we created and tested.
      type: 'ADD_TICKET',
      id: id,
      names: names,
      location: location,
      issue: issue,
    }
    dispatch(action);                                       // Next comes the actual Redux magic: we call dispatch(action);. This automatically dispatches our action and updates the store. React Redux provides a seamless connection between React and Redux, making our coding lives much easier.
    this.setState({formVisibleOnPage: false});              // Note: The method we just rewrote still handles local state. We could move the code that updates the formVisibleOnPage property to our store but we won't. Ultimately, it's up to us to decide whether or not local state belongs in the Redux store or if React should handle it. Neither approach is considered a bad practice - though in a larger application, too much local state cluttering up the Redux store could become a code smell.
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        formVisibleOnPage: false,
        selectedTicket: null,
        editing: false
      });
    } else {
      this.setState(prevState => ({
        formVisibleOnPage: !prevState.formVisibleOnPage,
      }));
    }
  }

  render(){
    let currentlyVisibleState = null;
    let buttonText = null;

  if (this.state.editing) {
    currentlyVisibleState = <EditTicketForm ticket = {this.state.selectedTicket} onEditTicket = {this.handleEditingTicketInList} />
    buttonText = "Return to Ticket List";

  } else if (this.state.selectedTicket != null){
      currentlyVisibleState = <TicketDetail 
        ticket = {this.state.selectedTicket} 
        onClickingDelete = {this.handleDeletingTicket}
        onClickingEdit = {this.handleEditClick} />
      buttonText= "Return to Ticket List";

    } else if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList}/>;
      buttonText = "Return to Ticket List";

    } else {
      currentlyVisibleState = <TicketList ticketList={this.state.mainTicketList} onTicketSelection={this.handleChangingSelectedTicket}/>;
      buttonText = "Add Ticket";
    };

    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

TicketControl = connect()(TicketControl);

export default TicketControl;


// Note: 
  //The connect() function redefines our entire TicketControl component as a new TicketControl component with additional functionality included. The return value of the connect() function is the TicketControl component itself, but this time we will have powerful new tools at our disposal: the dispatch() and mapStateToProps() functions. 
  //Note that it's important that connect() is called right before we export TicketControl. That ensures that the component that's exported has all necessary React Redux functionality.
  //connect() is what is known as a higher-order component. This is a common term in React. A higher-order component is a function that takes an existing component, wraps it with additional functionality, and then returns it so it can be used elsewhere in an application. To learn more about HOCs, check out the React documentation.