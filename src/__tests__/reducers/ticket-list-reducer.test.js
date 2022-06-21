import ticketListReducer from '../../reducers/ticket-list-reducer';
import Moment from 'moment';


describe('ticketListReducer', () => {

  let action;

  const ticketData = {
    names: 'Ryan & Aimen',
    location: '4b',
    issue: 'Redux action is not working correctly.',
    timeOpen: 0,
    id: 1
  };

  const currentState = {
    1: {names: 'Ryan & Aimen',
    location: '4b',
    issue: 'Redux action is not working correctly.',
    id: 1 },
    2: {names: 'Jasmine and Justine',
    location: '2a',
    issue: 'Reducer has side effects.',
    id: 2 }
  };


  test('Should return default state if ther is no action type passed into the reducer', () => {
    expect(ticketListReducer({}, {type: null})).toEqual({});
  })
  
  // test('Should successfully add a ticket to the ticket list that includes Moment-formatted wait times', () => {
  //   const { names, location, issue, timeOpen, id } = ticketData;
  //   action = {
  //     type: 'ADD_TICKET',
  //     names: names,
  //     location: location,
  //     issue: issue,
  //     timeOpen: timeOpen,
  //     id: id,
  //     formattedWaitTime: new Moment().fromNow(true)
  //   };
  //   expect(ticketListReducer({}, action)).toEqual({
  //     [id] : {
  //       names: names,
  //       location: location,
  //       issue: issue,
  //       timeOpen: timeOpen,
  //       id: id,
  //       formattedWaitTime: 'a few seconds'
  //     }
  //   });
  // });

  
  test('Should successfully delete a ticket', () => {
    action = {
      type: 'DELETE_TICKET',
      id: 1
    };
    expect(ticketListReducer(currentState, action)).toEqual({
      2: {names: 'Jasmine and Justine',
        location: '2a',
        issue: 'Reducer has side effects.',
        id: 2 }
    });
  });

  test('Should add a formatted wait time to ticket entry', () => {
    const { names, location, issue, timeOpen, id } = ticketData;
    action = {
      type: 'UPDATE_TIME',
      formattedWaitTime: '4 minutes',
      id: id
    };
    expect(ticketListReducer({ [id] : ticketData }, action)).toEqual({
      [id] : {
        names: names,
        location: location,
        issue: issue,
        timeOpen: timeOpen,
        id: id,
        formattedWaitTime: '4 minutes'
      }
    });
  });
});
