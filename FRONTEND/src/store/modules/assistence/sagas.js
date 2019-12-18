import { takeLatest, call, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import history from '~/services/history';
import api from '~/services/api';

export function* answerIn({ payload }) {

  try {
    const { id, answer } = payload;

    const response = yield call(api.post, `students/help-orders/${id}/answer`, {
      answer,
    });

    if (!response.data.id) {
      toast.error('Não foi possivel responder ao aluno');
      return;
    }

    toast.success('Resposta enviada com sucesso');

    history.push('/assistences');
  } catch (err) {
    toast.error('Falha no envio da resposta');
  }

}
export default all([
  takeLatest('@assistence/ANSWER_IN_REQUEST', answerIn),
]);
