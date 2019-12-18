import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import history from '~/services/history';

import * as Yup from 'yup';

import { GoChevronLeft, GoCheck } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { planUpdate } from '~/store/modules/plan/actions';

import { Container, Content } from './styles';

const schema = Yup.object().shape({
  title: Yup.string().required('O titulo é obrigatório'),
  duration: Yup.number()
    .typeError('Apenas números')
    .integer('Insira um mês válido')
    .positive('Insira um mês válido')
    .required('A duração é obrigatoria'),
  price: Yup.number()
    .positive('Insira um valor válido')
    .typeError('Apenas números')
    .required('o preço é obrigatório'),
});

export default function CreatePlan() {
  const [calctime, setCalctime] = useState(0);
  const [calcprice, setCalcprice] = useState(0);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const plan = useSelector(state => state.plan);

  useEffect(() => {
    function calcula() {
      const vTime = parseFloat(document.getElementById('duration').value);
      // const vString = calcprice.toString().replace(',','.');
      const vPrice = parseFloat(document.getElementById('price').value);
      const vTotal = (vTime * vPrice).toFixed(2);
      if (isNaN(vTotal)) {
        setTotal(0);
      }else{
        setTotal(vTotal);
      }
    }

    if (plan.id === 0 ) {
      history.push('/plans');
    }else{
      calcula();
    }

  }, [calcprice, calctime, plan]);

  function handleSubmit(data) {
    const plan_data = {
      id: plan.id,
      ...data,
    }

    dispatch(planUpdate(plan_data));
  }

  return (
    <Container>
      <Content>
        <Form schema={schema} initialData={plan} onSubmit={handleSubmit}>
          <header>
            <h1>Edição de plano</h1>
            <div>
              <Link to="/plans">
                <div>
                  <GoChevronLeft color="white" size={14} />
                  <span>voltar</span>
                </div>
              </Link>
              <Button type="submit">
                <div>
                  <GoCheck color="white" size={14} />
                  <span>salvar</span>
                </div>
              </Button>
            </div>
          </header>
          <main>
            <div>
              <label>
                título do plano
                <Input name="title" placeholder="Digite o nome" />
              </label>
            </div>
            <div>
              <label>
                duração (em meses)
                <Input
                  type="number"
                  onChange={e => setCalctime(e.target.value)}
                  name="duration"
                  id="duration"
                  placeholder="0"
                />
              </label>
              <label>
                preço mensal
                <Input
                  name="price"
                  id="price"
                  onChange={e => setCalcprice(e.target.value)}
                  placeholder="0.00"
                />
              </label>
              <label>
                preço total
                <span className="total">{total}</span>
              </label>
            </div>
          </main>
        </Form>
      </Content>
    </Container>
  );
}
