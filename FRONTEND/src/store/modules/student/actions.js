export function studentInRequest(name, email, age, weight, height) {
  return {
    type: '@student/SIGN_IN_REQUEST',
    payload: { name, email, age, weight, height },
  };
}

export function signFailure() {
  return {
    type: '@student/SIGN_FAILURE',
  };
}

export function studentFormUpdate(student) {
  const { id, name, email, age, weight, height } = student;
  return {
    type: '@student/FORM_IN_REQUEST',
    payload: { id, name, email, age, weight, height },
  };
}

export function studentUpdate(name, age, email, weight, height) {
  return {
    type: '@student/REQUEST_UPDATE',
    payload: { name, age, email, weight, height },
  };
}

export function studentDeleteInRequest(id) {
  return {
    type: '@student/DELETE_IN_REQUEST',
    payload: { id },
  };
}

export function studentRefresh(id) {
  return {
    type: '@student/REFRESH',
    payload: { id },
  };
}

export function searchInStudy(search) {
  return {
    type: '@student/SEARCH_ST',
    payload: { search },
  };
}

export function searchInEnrollment(search) {
  return {
    type: '@student/SEARCH_EN',
    payload: { search },
  };
}
