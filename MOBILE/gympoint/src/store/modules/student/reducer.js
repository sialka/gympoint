import produce from 'immer';

const INITIAL_STATE = {
  id: null,
  list: false,
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@student/SIGN_IN_SUCCESS':
      // console.tron.log('reducer:');
      return produce(state, draft => {
        draft.id = action.payload.id;
      });
    case '@student/SIGN_EXIT':
      // console.tron.log('reducer:');
      return produce(state, draft => {
        draft.id = null;
      });
    case '@student/LIST_ANSWER':
      // console.tron.log('redicer: ', action);
      return produce(state, draft => {
        draft.list = action.payload.mode;
      });
    default:
      return state;
  }
}
