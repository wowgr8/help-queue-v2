import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';
import { connect } from 'react-redux';
import PropTypes from "prop-types";



class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false,   
      selectedTicket: null,
      editing: false
    };
  }

  handleDeletingTicket = (id) => {
    const { dispatch } = this.props;          
    const action = {                             
      type: 'DELETE_TICKET',                  
      id: id
    }
    dispatch(action);                          
    this.setState({ selectedTicket: null });
  }

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing: true});
  }

  handleEditingTicketInList = (ticketToEdit) => {     
    
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

  // mainTicketList is no longer part of this.state - it's part of the Redux store now and we need to pass it into the component via this.props. 
  // Also, mainTicketList is an object now, not an array. No need to use filter anymore - we can just use bracket notation instead. Here's the updated method:
  // Note: we only had to change one line. 
    // This is the power of mapStateToProps: we don't have to do any fancy additional code to get a specific state slice from the store. 
    // We can just use this.props - as long as we've defined the state slice we want to map in our mapStateToProps function literal.
  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.props.mainTicketList[id];
    this.setState({selectedTicket: selectedTicket});
  }

  handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;                       
    const { id, names, location, issue } = newTicket;      
    const action = {                                       
      type: 'ADD_TICKET',
      id: id,
      names: names,
      location: location,
      issue: issue,
    }
    dispatch(action);                                      
    this.setState({formVisibleOnPage: false});              
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

    } else {                                        // We just needed to change a single word. this.state is changed to this.props.
                                                    // Note: The difference between = this.state (which refers to a class component's state) and this.props (which refers to the props being passed into a component from a parent component or the Redux store).
      currentlyVisibleState = <TicketList ticketList={this.props.mainTicketList} onTicketSelection={this.handleChangingSelectedTicket}/>;
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

// We are mapping state from the Redux store to our component's props. That means we need to add prop types to TicketControl
TicketControl.propTypes = {
  mainTicketList: PropTypes.object
};

// The mapStateToProps function takes a state slice from the store and then maps it to a prop in the component.
const mapStateToProps = state => {
  return {
    // Key-value pairs of state to be mapped from Redux to React component go here.
    // The key-value pairs determine the state slices that should be mapped to the component's props. In our case, we want mainTicketList from the store to be mapped to TicketControl's props.
    mainTicketList: state
  }
}

// Note: we are now passing mapStateToProps into the connect() function.
// Then we need to pass our newly-defined mapStateToProps function into the connect() function:
TicketControl = connect(mapStateToProps)(TicketControl);
// This ensures the TicketControl component has the mapStateToProps functionality when connect() redefines the component.

export default TicketControl;


