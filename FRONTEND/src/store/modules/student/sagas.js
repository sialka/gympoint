import { takeLatest, call, put, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import history from '~/services/history';
import api from '~/services/api';

import { studentRefresh } from './actions';

export function* signIn({ payload }) {
  try {
    const { name, email, age, weight, height } = payload;

    const response = yield call(api.post, 'students', {
      name,
      email,
      age,
      weight,
      height,
    });

    if (!response.data.name) {
      toast.error('Não foi possivel cadastrar o aluno');
      return;
    }

    toast.success('Aluno cadastrado com sucesso');

    history.push('/students/create');
  } catch (err) {
    if (err.response.data.error) {
      toast.error(err.response.data.error);
    } else {
      toast.error('Falha, verifique os dados');
    }
  }
}

export function* update({ payload }) {
  try {
    const { name, email, age, weight, height } = payload;

    const response = yield call(api.put, 'students', {
      name,
      email,
      age,
      weight,
      height,
    });

    if (!response.data.name) {
      toast.error('Não foi possivel atualizar o cadastro');
      return;
    }

    toast.success('Aluno atualizado com sucesso');

    history.push('/students');
  } catch (err) {
    if (err.response.data.error) {
      toast.error(err.response.data.error);
    } else {
      toast.error('Falha, verifique os dados');
    }
  }
}

export function* kill({ payload }) {
  try {
    yield call(api.delete, `students/${payload.id}`);

    toast.success('Aluno deletado com sucesso');

    yield put(studentRefresh(payload.id));

    history.push('/students');
  } catch (err) {
    if (err.response.data.error) {
      toast.error(err.response.data.error);
    } else {
      toast.error('Falha, verifique os dados');
    }
  }
}
export default all([
  takeLatest('@student/SIGN_IN_REQUEST', signIn),
  takeLatest('@student/REQUEST_UPDATE', update),
  takeLatest('@student/DELETE_IN_REQUEST', kill),
]);
