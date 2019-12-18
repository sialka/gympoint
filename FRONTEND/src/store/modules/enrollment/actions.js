export function enrollmentCreateInRequest(student_id, plan_id, start_date) {
  return {
    type: '@enrollment/CREATE_IN_REQUEST',
    payload: { student_id, plan_id, start_date },
  };
}

export function enrollmentDeleteInRequest(id) {
  return {
    type: '@enrollment/DELETE_IN_REQUEST',
    payload: { id },
  };
}

export function enrollmentRefresh(mode) {
  return {
    type: '@enrollment/REFRESH',
    payload: { mode },
  };
}

export function enrollmentFormUpdate(enrollment_id, student_id, student_name, plan_id, start_date) {
  return {
    type: '@enrollment/UPDATE_FORM',
    payload: { enrollment_id, student_id, student_name, plan_id, start_date },
  };
}

export function enrollmentUpdateInRequest(enrollment_id, plan_id, start_date) {
  return {
    type: '@enrollment/UPDATE_REQUEST',
    payload: { enrollment_id, plan_id, start_date },
  };
}
