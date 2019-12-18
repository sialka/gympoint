import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { GoChevronLeft, GoCheck } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { planInRequest } from '~/store/modules/plan/actions';

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

  useEffect(() => {
    function calcula() {
      const vTime = parseFloat(calctime);
      const vString = calcprice.toString().replace(',','.');
      const vPrice = parseFloat(vString);
      const vTotal = (vTime * vPrice).toFixed(2);
      if (isNaN(vTotal)) {
        setTotal(0);
      }else{
        setTotal(vTotal);
      }
    }

    calcula();
  }, [calcprice, calctime]);

  function handleSubmit(data, { resetForm }) {
    const { title, duration, price } = data;

    dispatch(planInRequest(title, duration, price));
    resetForm();
  }

  return (
    <Container>
      <Content>
        <Form schema={schema} onSubmit={handleSubmit}>
          <header>
            <h1>Cadastro de plano</h1>
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
                  placeholder="0"
                />
              </label>
              <label>
                preço mensal
                <Input
                  name="price"
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
