export function studentInRequest(id) {
  return {
    type: '@student/SIGN_IN_REQUEST',
    payload: { id },
  };
}

export function signInSuccess(id) {
  // console.tron.log('action: id');
  return {
    type: '@student/SIGN_IN_SUCCESS',
    payload: { id },
  };
}

export function checkListInRequest(id) {
  // console.tron.log('action: id');
  return {
    type: '@student/CHEKLIST_IN',
    payload: { id },
  };
}

export function studentExit() {
  return {
    type: '@student/SIGN_EXIT',
  };
}

export function studentQuestion(id, question) {
  console.tron.log('action: studentAnswer', id, question);
  return {
    type: '@student/QUESTION_IN_REQUEST',
    payload: { id, question },
  };
}
