import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as a from './../actions';
//withFirestore() is a wrapper method much like the React Redux connect() method. To use it, we need to wrap this method around the TicketControl component in the final line of code in TicketControl.js (export default line)
//withFirestore() adds Firestore to a component's props, allowing us to use it for any kind of requests, not just get(). We could use it to update or delete tickets, for instance. - WIP
import { withFirestore } from 'react-redux-firebase';


class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTicket: null,
      editing: false
    };
  }

  componentDidMount() {
    this.waitTimeUpdateTimer = setInterval(() =>
      this.updateTicketElapsedWaitTime(),
    60000 // AKA every minute
    );
  }

  componentDidUpdate() {
    console.log("component updated!");
  }

  componentWillUnmount(){
    console.log("component unmounted!");
    clearInterval(this.waitTimeUpdateTimer);
  }

  updateTicketElapsedWaitTime = () => {
    const { dispatch } = this.props;
    Object.values(this.props.mainTicketList).forEach(ticket => {
      const newFormattedWaitTime = ticket.timeOpen.fromNow(true);
      const action = a.updateTime(ticket.id, newFormattedWaitTime);
      dispatch(action);
    });
  }

  handleDeletingTicket = (id) => {
    const { dispatch } = this.props;          
    const action = a.deleteTicket(id);
    dispatch(action);                          
    this.setState({ selectedTicket: null });
  }

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing: true});
  }

  handleEditingTicketInList = () => {         
    this.setState({
        editing: false,
        selectedTicket: null
      });
  }

  //Refactored the method below since we no longer use Redux to access ticket info from mainTicketList.

  handleChangingSelectedTicket = (id) => {
    this.props.firestore.get({collection: "tickets", doc: id}).then((ticket) => {  // We can use Firestore's get() method to manually retrieve a collection or a subset of a collection. In this case, we want a ticket with a specific id so we do the following
      const firestoreTicket = {                     //Note that we pass id into a property called doc. Which returns a pending promise. As we know from Intermediate JavaScript, we can chain then() to a promise. But what exactly does our promise return? It doesn't return a ticket. It returns a DocumentSnapshot. A DocumentSnapshot is a Firestore object that contains read-only data of a specified document.
        names: ticket.get("names"),                 //The id of the document is readily available but we have to use a get() method to grab each specific property.
        location: ticket.get("location"),           //Note that this is a different get() method than the one we use to actually retrieve the document from Firestore.
        issue: ticket.get("issue"),                 // That's why we have to do the following .get() to grab a property such as location, issues, names.
        id: ticket.id
      }
      this.setState({selectedTicket: firestoreTicket});
    })
  }

  handleAddingNewTicketToList = () => {
    const { dispatch } = this.props;                       
    // const action = a.addTicket(newTicket);
    // dispatch(action);    
    const action = a.toggleForm();            
    dispatch(action);
  }

  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        //formVisibleOnPage: false,
        selectedTicket: null,
        editing: false
      });
    } else {
      const { dispatch } = this.props;
      const action = a.toggleForm();
      dispatch(action);
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

    } else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList}/>;
      buttonText = "Return to Ticket List";

    } else {                                       
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

TicketControl.propTypes = {
  mainTicketList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    // mainTicketList: state.mainTicketList,  - no longer handled by redux store, but from firestore instead.
    formVisibleOnPage: state.formVisibleOnPage
  }
}

TicketControl = connect(mapStateToProps)(TicketControl);

//Just as we do with the connect() method from React Redux, we're using a higher order component to give our component the functionality it needs (the ability to use Firestore).
//This makes Firestore available to our application via this.props.firestore.
export default withFirestore(TicketControl);


