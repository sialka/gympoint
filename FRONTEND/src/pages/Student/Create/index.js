import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import * as Yup from 'yup';
import { GoChevronLeft, GoCheck } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { studentInRequest } from '~/store/modules/student/actions';

import { Container, Content } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  age: Yup.number()
    .integer()
    .positive()
    .typeError('Campo númerico')
    .required('A idade é obrigatória'),
  weight: Yup.number()
    .positive()
    .typeError('Campo númerico, não use virgula')
    .required('O peso é obrigatório'),
  height: Yup.number()
    .positive()
    .typeError('Campo númerico, não use virgula')
    .required('A altura é obrigatória'),
});

export default function CreateStudent() {
  const dispatch = useDispatch();

  function handleSubmit(data, { resetForm }) {
    const { name, email, age, weight, height } = data;

    dispatch(studentInRequest(name, email, age, weight, height));
    resetForm();
  }

  return (
    <Container>
      <Content>
        <Form schema={schema} onSubmit={handleSubmit}>
          <header>
            <h1>Cadastro de aluno</h1>
            <div>
              <Link to="/students">
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
                nome completo
                <Input name="name" placeholder="Digite o nome" />
              </label>
            </div>
            <div>
              <label>
                endereço de e-mail
                <Input name="email" placeholder="exemplo@email.bom" />
              </label>
            </div>
            <div>
              <label>
                idade
                <Input type="number" name="age" placeholder="0" />
              </label>
              <label>
                peso (em kg)
                <Input name="weight" placeholder="0" />
              </label>
              <label>
                altura
                <Input name="height" placeholder="0" />
              </label>
            </div>
          </main>
        </Form>
      </Content>
    </Container>
  );
}
