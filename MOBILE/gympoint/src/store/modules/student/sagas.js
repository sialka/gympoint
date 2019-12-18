import { Alert } from 'react-native';
import { takeLatest, call, all, put } from 'redux-saga/effects';

import { signInSuccess } from '~/store/modules/student/actions';

import api from '~/services/api';

export function* signIn({ payload }) {
  // console.tron.log('Saga: ', payload);
  try {
    const { id } = payload;

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(id)) {
      Alert.alert('Atenção', 'Informe um ID válido');
      return;
    }

    const response = yield call(api.post, `students/${id}/checkins`);

    if (response.data.id) {
      yield put(signInSuccess(response.data.student_id));

      const list = yield call(api.get, `students/${id}/checkins`);

      yield put(signInSuccess(id));
    }
  } catch (err) {
    if (err.response.data.error) {
      Alert.alert('Atenção', err.response.data.error);
    } else {
      Alert.alert('Atenção', 'Verifique os dados e tente novamente');
    }
  }
}

export function* answerIn({ payload }) {
  console.tron.log('saga: ');
  try {
    const { id, question } = payload;

    console.tron.log('saga: ', id, question);

    if (question === '') {
      Alert.alert('Atenção', 'Não informou o pedido !');
      return;
    }

    const response = yield call(api.post, `students/${id}/help-orders`, {
      question,
    });

    if (response.data.id) {
      Alert.alert('Atenção', 'Pedido registrado com sucesso !');
    }
  } catch (err) {
    Alert.alert('Atenção', err.response.data.error);
  }
}

export default all([
  takeLatest('@student/SIGN_IN_REQUEST', signIn),
  takeLatest('@student/QUESTION_IN_REQUEST', answerIn),
]);
