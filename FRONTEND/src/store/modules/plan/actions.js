export function planInRequest(title, duration, price) {
  return {
    type: '@plan/CREATE_IN_REQUEST',
    payload: { title, duration, price },
  };
}

export function signFailure() {
  return {
    type: '@plan/SIGN_FAILURE',
  };
}

export function planFormUpdate(plan) {
  const { id, title, duration, price } = plan;
  return {
    type: '@plan/FORM_IN_REQUEST',
    payload: { id, title, duration, price },
  };
}

export function planUpdate(plan) {
  const { id, title, duration, price } = plan;
  return {
    type: '@plan/UPDATE',
    payload: { id, title, duration, price },
  };
}

export function planDeleteInRequest(id) {
  return {
    type: '@plan/DELETE',
    payload: { id },
  };

}

export function planRefresh(id) {
  return {
    type: '@plan/REFRESH',
    payload: { id },
  };
}
