import * as actions from './../../actions';
// Note that we will be importing all of our action creators as actions. As expected, this test should fail because we haven't written any actions yet.
// import * as c from './../actions/ActionTypes';


// You may be wondering why we aren't creating a ticket to be deleted. Well, we've already tested that the 'DELETE_TICKET' action properly deletes tickets. 
 // In this test, we just need to make sure that our action creator creates the right action - the action itself doesn't need to be executed.
describe('help queue actions', () => {
  it('deleteTicket should create DELETE_TICKET action', () => {
    expect(actions.deleteTicket(1)).toEqual({
      type: 'DELETE_TICKET',
      id: 1
    });
  });


  // Next, we'll do a test for our 'TOGGLE_FORM' action creator:
  it('toggleForm should create TOGGLE_FORM action', () => {
    expect(actions.toggleForm()).toEqual({
      type: 'TOGGLE_FORM'
    });
  });

  //  Finally, let's add the test for our 'ADD_TICKET' action:
  it('addTicket should create ADD_TICKET action', () => {
    expect(actions.addTicket({names: 'Jo and Jasmine', location: '3E', issue: 'Redux not working!', timeOpen: 0, formattedWaitTime: "A few seconds", id: 1})).toEqual({
      type: 'ADD_TICKET',
      names: 'Jo and Jasmine',
      location: '3E',
      issue: 'Redux not working!',
      timeOpen: 0,
      formattedWaitTime: "A few seconds",
      id: 1
    });
  });

  //The updateTime() action creator has two parameters. The first is a ticket's id while the second is the formatted wait time that should be passed into that ticket. This should be equivalent to the UPDATE_TIME action type, which takes in properties for an id and a formattedWaitTime.
  it('updateTime should create UPDATE_TIME action', () => {
    expect(actions.updateTime(1, "A few seconds")).toEqual({
      type: 'UPDATE_TIME',
      id: 1,
      formattedWaitTime: "A few seconds"
    });
  });


});


// It may not seem like much reduction in code but it will be easier to call toggleForm() in our application instead of { type: 'TOGGLE_FORM' }.