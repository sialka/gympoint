export function assistenceInRequest(id, answer) {
  return {
    type: '@assistence/ANSWER_IN_REQUEST',
    payload: { id, answer },
  };
}
