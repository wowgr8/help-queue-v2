import * as actions from './../../actions';
// Note that we will be importing all of our action creators as actions. As expected, this test should fail because we haven't written any actions yet.


// You may be wondering why we aren't creating a ticket to be deleted. Well, we've already tested that the 'DELETE_TICKET' action properly deletes tickets. 
 // In this test, we just need to make sure that our action creator creates the right action - the action itself doesn't need to be executed.
describe('help queue actions', () => {
  it('deleteTicket should create DELETE_TICKET action', () => {
    expect(actions.deleteTicket(1)).toEqual({
      type: 'DELETE_TICKET',
      id: 1
    });
  });
});