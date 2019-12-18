import produce from 'immer';

const INITIAL_STATE = {
  id: 0,
  name: null,
  email: null,
  age: null,
  weight: null,
  height: null,
  searchSt: null,
  searchEn: null,
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@student/SIGN_IN_REQUEST':
      return produce(state, draft => {
        draft.name = action.payload.name;
        draft.email = action.payload.email;
        draft.age = action.payload.age;
        draft.weight = action.payload.weight;
        draft.height = action.payload.height;
      });
    case '@student/FORM_IN_REQUEST':
      return produce(state, draft => {
        draft.id = action.payload.id;
        draft.name = action.payload.name;
        draft.email = action.payload.email;
        draft.age = action.payload.age;
        draft.weight = action.payload.weight;
        draft.height = action.payload.height;
      });
    case '@student/REFRESH':
      return produce(state, draft => {
        draft.id = action.payload.id;
      });
    case '@student/SEARCH_ST':
      return produce(state, draft => {
        draft.searchSt = action.payload.search;
      });
    case '@student/SEARCH_EN':
      return produce(state, draft => {
        draft.searchEn = action.payload.search;
      });
    default:
      return state;
  }
}
