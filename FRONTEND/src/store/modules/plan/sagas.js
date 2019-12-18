import { takeLatest, call, put, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import history from '~/services/history';
import api from '~/services/api';

import { planRefresh } from './actions';

export function* createPlan({ payload }) {
  try {
    const { title, duration, price } = payload;

    const response = yield call(api.post, 'plans', {
      title,
      duration,
      price,
    });

    if (!response.data.id) {
      toast.error('Não foi possivel cadastrar o plano');
      return;
    }

    toast.success('Plano cadastrado com sucesso');

    history.push('/plans/create');
  } catch (err) {
    if (err.response.data.error) {
      toast.error(err.response.data.error);
    } else {
      toast.error('Falha, verifique os dados');
    }
  }
}

export function* updatePlan({ payload }) {
  try {
    const { id, title, duration, price } = payload;

    const response = yield call(api.put, `plans/${id}`, {
      title,
      duration,
      price,
    });

    if (!response.data.title) {
      toast.error('Não foi possivel atualizar o plano');
      return;
    }

    toast.success('Plano alterado com sucesso');

    history.push('/plans');
  } catch (err) {
    if (err.response.data.error) {
      toast.error(err.response.data.error);
    } else {
      toast.error('Falha, verifique os dados');
    }
  }
}

export function* deletePlan({ payload }) {
  try {
    yield call(api.delete, `plans/${payload.id}`);

    toast.success('Plano deletado com sucesso');

    yield put(planRefresh(payload.id));

    history.push('/plans');
  } catch (err) {
    if (err.response.data.error) {
      toast.error(err.response.data.error);
    } else {
      toast.error('Falha, verifique os dados');
    }
  }
}

export default all([
  takeLatest('@plan/CREATE_IN_REQUEST', createPlan),
  takeLatest('@plan/UPDATE', updatePlan),
  takeLatest('@plan/DELETE', deletePlan),
]);
