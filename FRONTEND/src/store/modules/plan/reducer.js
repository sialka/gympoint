import produce from 'immer';

const INITIAL_STATE = {
  id: 0,
  title: null,
  duration: null,
  price: null,
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@plan/CREATE_IN_REQUEST':
      return produce(state, draft => {
        draft.title = action.payload.title;
        draft.duration = action.payload.duration;
        draft.price = action.payload.price;
      });
    case '@plan/FORM_IN_REQUEST':
      return produce(state, draft => {
        draft.id = action.payload.id;
        draft.title = action.payload.title;
        draft.duration = action.payload.duration;
        draft.price = action.payload.price;
      });
    case '@plan/REFRESH':
      return produce(state, draft => {
        draft.id = action.payload.id;
      });
    default:
      return state;
  }
}
