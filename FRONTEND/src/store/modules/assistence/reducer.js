import produce from 'immer';

const INITIAL_STATE = {
  id: 0,
  answer: null,
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@assistence/ANSWER_IN_REQUEST':
      return produce(state, draft => {
        draft.id = action.payload.id;
        draft.answer = action.payload.answer;
      });
    default:
      return state;
  }
}
