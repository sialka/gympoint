import produce from 'immer';

const INITIAL_STATE = {
  id: 0,
  student_id: 0,
  student_name: null,
  plan_id: 0,
  start_date: null,
};

export default function create(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@enrollment/CREATE_IN_REQUEST':
      return produce(state, draft => {
        draft.student_id = action.payload.student_id;
        draft.plan_id = action.payload.plan_id;
        draft.start_date = action.payload.start_date;
      });
    case '@enrollment/REFRESH':
      return produce(state, draft => {
        draft.id = action.payload.mode;
      });
    case '@enrollment/UPDATE_FORM':
        return produce(state, draft => {
          draft.id = action.payload.enrollment_id;
          draft.student_id = action.payload.student_id;
          draft.student_name = action.payload.student_name;
          draft.plan_id = action.payload.plan_id;
          draft.start_date = action.payload.start_date;
        });
    default:
      return state;
  }
}
