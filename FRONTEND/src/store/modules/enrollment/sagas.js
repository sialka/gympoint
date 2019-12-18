import { takeLatest, call, all, put } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import history from '~/services/history';
import api from '~/services/api';

import { enrollmentRefresh } from './actions';

export function* createEnrollment({ payload }) {
  try {
    const { student_id, plan_id, start_date } = payload;

    const response = yield call(api.post, 'enrollments', {
      student_id,
      plan_id,
      start_date,
    });

    if (!response.data.id) {
      toast.error('Não foi possivel cadastrar a matricula');
      return;
    }

    toast.success('Matricula cadastrada com sucesso');

    history.push('/enrollments/create');
  } catch (err) {
    if (err.response.data.error) {
      toast.error(err.response.data.error);
    } else {
      toast.error('Falha, verifique os dados');
    }
  }
}

export function* deleteEnrollment({ payload }) {
  try {
    yield call(api.delete, `enrollments/${payload.id}`);

    toast.success('Matricula deletada com sucesso');

    yield put(enrollmentRefresh(payload.id));

    history.push('/enrollments');
  } catch (err) {
    if (err.response.data.error) {
      toast.error(err.response.data.error);
    } else {
      toast.error('Falha, verifique os dados');
    }
  }
}

export function* updateEnrollment({ payload }) {
  try {
    const { enrollment_id, plan_id, start_date } = payload;

    const response = yield call(api.put, `enrollments/${enrollment_id}`, {
      plan_id,
      start_date,
    });

    if (!response.data.id) {
      toast.error('Não foi possivel alterar a matricula');
      return;
    }

    toast.success('Matricula alterada com sucesso');

    history.push('/enrollments/update');
  } catch (err) {
    if (err.response.data.error) {
      toast.error(err.response.data.error);
    } else {
      toast.error('Falha, verifique os dados');
    }
  }
}

export default all([
  takeLatest('@enrollment/CREATE_IN_REQUEST', createEnrollment),
  takeLatest('@enrollment/DELETE_IN_REQUEST', deleteEnrollment),
  takeLatest('@enrollment/UPDATE_REQUEST', updateEnrollment),
]);
